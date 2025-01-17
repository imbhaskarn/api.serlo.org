import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled'
import { Express, json } from 'express'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import createPlayground_ from 'graphql-playground-middleware-express'
import * as t from 'io-ts'
import jwt from 'jsonwebtoken'
import * as R from 'ramda'

import {
  AuthServices,
  handleAuthentication,
  IdentityDecoder,
  Service,
} from '~/internals/authentication'
import { Cache } from '~/internals/cache'
import { ModelDataSource } from '~/internals/data-source'
import { Context } from '~/internals/graphql'
import { createSentryPlugin } from '~/internals/sentry'
import { SwrQueue } from '~/internals/swr-queue'
import { schema } from '~/schema'
import { useDefaultImport } from '~/utils'

const SessionDecoder = t.type({
  identity: IdentityDecoder,
})

export async function applyGraphQLMiddleware({
  app,
  cache,
  swrQueue,
  authServices,
}: {
  app: Express
  cache: Cache
  swrQueue: SwrQueue
  authServices: AuthServices
}) {
  const graphQLPath = '/graphql'
  const environment = { cache, swrQueue, authServices }
  const server = new ApolloServer<Context>(getGraphQLOptions())
  const createPlayground = await useDefaultImport(createPlayground_)
  await server.start()

  app.use(json({ limit: '2mb' }))
  app.use(
    graphQLPath,
    expressMiddleware(server, {
      async context({ req }): Promise<Context> {
        const dataSources = {
          model: new ModelDataSource(environment),
        }
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
          return Promise.resolve({
            dataSources,
            service: Service.SerloCloudflareWorker,
            userId: null,
          })
        }
        const partialContext = await handleAuthentication(
          authorizationHeader,
          async () => {
            try {
              const publicKratos = environment.authServices.kratos.public
              const session = (
                await publicKratos.toSession({ cookie: req.header('cookie') })
              ).data

              if (SessionDecoder.is(session)) {
                // TODO: When the time comes change it to session.identity.id
                return session.identity.metadata_public.legacy_id
              } else {
                return null
              }
            } catch {
              // the user is probably unauthenticated
              return null
            }
          },
        )
        return { ...partialContext, dataSources }
      },
    }),
  )
  app.get('/___graphql', (...args) => {
    const headers =
      process.env.NODE_ENV === 'production'
        ? {}
        : { headers: { Authorization: `Serlo Service=${getToken()}` } }
    return createPlayground({ endpoint: graphQLPath, ...headers })(...args)
  })

  return graphQLPath
}

export function getGraphQLOptions() {
  return {
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers,
    // Needed for playground
    introspection: true,
    plugins: [
      // We add the playground via express middleware in src/index.ts
      ApolloServerPluginLandingPageDisabled(),
      createSentryPlugin(),
    ],
    formatError(error: GraphQLFormattedError) {
      return R.path(['response', 'status'], error.extensions) === 400
        ? new GraphQLError(error.message, {
            extensions: { ...error.extensions, code: 'BAD_REQUEST' },
          })
        : error
    },
  }
}

function getToken() {
  return jwt.sign({}, process.env.SERVER_SERLO_CLOUDFLARE_WORKER_SECRET, {
    expiresIn: '2h',
    audience: 'api.serlo.org',
    issuer: Service.SerloCloudflareWorker,
  })
}
