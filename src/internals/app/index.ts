/**
 * This file is part of Serlo.org API
 *
 * Copyright (c) 2020 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2020 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/api.serlo.org for the canonical source repository
 */
import { ApolloServer } from 'apollo-server-express'
import dotenv from 'dotenv'
import createApp, { Express } from 'express'
import createPlayground from 'graphql-playground-middleware-express'
import jwt from 'jsonwebtoken'

import { Service } from '../auth'
import { Cache, createCache } from '../cache'
import { initializeSentry } from '../sentry'
import { createSwrQueue, SwrQueue } from '../swr-queue'
import { createTimer, Timer } from '../timer'
import { getGraphQLOptions } from './get-graphql-options'

export * from './get-graphql-options'

export function start() {
  dotenv.config()
  initializeSentry()
  const timer = createTimer()
  const cache = initializeCache({ timer })
  const swrQueue = initializeSwrQueue({ cache, timer })
  initializeGraphQLServer({ cache, swrQueue })
}

function initializeCache({ timer }: { timer: Timer }): Cache {
  return createCache({ timer })
}

function initializeSwrQueue({
  cache,
  timer,
}: {
  cache: Cache
  timer: Timer
}): SwrQueue {
  return createSwrQueue({
    cache,
    timer,
  })
}

function initializeGraphQLServer({
  cache,
  swrQueue,
}: {
  cache: Cache
  swrQueue: SwrQueue
}) {
  const app = createApp()
  const graphqlPath = applyGraphQLMiddleware({ app, cache, swrQueue })

  app.listen({ port: 3000 }, () => {
    console.log('🚀 Server ready')
    console.log('Playground:       http://localhost:3000/___graphql')
    console.log(`GraphQL endpoint: http://localhost:3000${graphqlPath}`)
  })
}

function applyGraphQLMiddleware({
  app,
  cache,
  swrQueue,
}: {
  app: Express
  cache: Cache
  swrQueue: SwrQueue
}) {
  const environment = {
    cache,
    swrQueue,
  }
  const server = new ApolloServer(getGraphQLOptions(environment))

  app.use(server.getMiddleware({ path: '/graphql' }))
  app.get('/___graphql', (...args) => {
    return createPlayground({
      endpoint: '/graphql',
      ...(process.env.NODE_ENV === 'production'
        ? {}
        : {
            headers: {
              Authorization: `Serlo Service=${jwt.sign(
                {},
                process.env.SERLO_CLOUDFLARE_WORKER_SECRET,
                {
                  expiresIn: '2h',
                  audience: 'api.serlo.org',
                  issuer: Service.SerloCloudflareWorker,
                }
              )}`,
            },
          }),
    })(...args)
  })

  return server.graphqlPath
}