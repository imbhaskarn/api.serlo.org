import { option as O } from 'fp-ts'
import * as t from 'io-ts'
import { http, HttpResponse } from 'msw'

import { createTestEnvironment } from '../../__utils__'
import { createQuery, Query } from '~/internals/data-source-helper/query'

describe('How to create a query in a data source: Fetching the content of an article', () => {
  // # Prerequisites

  // Let us assume we want to fetch the content of an article. The following
  // object simulates a database whereby the article's
  // contents are indexed by the article's id.
  let contentDatabase: Record<number, string | undefined>

  // This object simulates our dataSources object. It contains the data source
  // `database` which has the only function `getContent`.
  let dataSources: {
    database: {
      // `Query<P, R>` is the type a query in the data source has. `P`
      // defines the arguments to the query and `R` the result of the
      // operation. So `getContent()` receives a dictionary with the article's
      // id. It returns a dictionary with the article's id and content or `null`
      // when the article does not exist.
      getContent: Query<{ id: number }, { id: number; content: string } | null>
    }
  }

  beforeEach(async () => {
    // Some initial values for the database
    contentDatabase = {
      [42]: 'Hello world!',
      [100]: 'This is another article.',
    }

    // REST API in front of the database which exposes a GET endpoint
    // /article/:id with which the content of an article can be fetched.
    global.server.use(
      http.get('http://database-api.serlo.org/article/:id', ({ params }) => {
        const typedParams = params as { id: string }
        const id = parseInt(typedParams.id)

        // given id is not a number -> return with "400 Bad Request"
        if (Number.isNaN(id))
          return new HttpResponse(null, {
            status: 400,
          })

        const content = contentDatabase[id]

        if (content !== undefined) {
          // article with given id is in database
          return HttpResponse.json({ id, content })
        } else {
          // No article found -> return "404 Not Found"
          return new HttpResponse(null, {
            status: 404,
          })
        }
      }),
    )

    // We assume that the cache is empty in each of the following test cases
    await global.cache.remove({ key: 'article/42' })

    dataSources = {
      database: {
        // # The actual code to create the query

        // Here we create the query with the helper function
        // `createQuery()`
        getContent: createQuery(
          {
            // Here we add an io-ts decoder for the returned value. It is used
            // during runtime to check the returned value. So we can notice when
            // the called API does something weired.
            decoder: t.union([
              t.strict({ id: t.number, content: t.string }),
              t.null,
            ]),

            // Function which does the actual fetching. Since we will need to wait
            // until the fetch completes we use "async" + "await" here.
            async getCurrentValue({ id }: { id: number }) {
              const url = `http://database-api.serlo.org/article/${id}`
              const res = await fetch(url)

              return res.status === 404 ? null : ((await res.json()) as unknown)
            },

            // We want to enable SWR for this endpoint
            enableSwr: true,

            // After one hour, a cached value shall be considered to be stale
            staleAfter: { hours: 1 },

            // After one day, no cached value shall be used
            maxAge: { days: 1 },

            getKey({ id }) {
              return `article/${id}`
            },

            getPayload(key) {
              if (!key.startsWith('article/')) return O.none

              const id = parseInt(key.substring('article/'.length))

              return Number.isNaN(id) ? O.none : O.some({ id })
            },

            // Add an example payload which is used in tests
            examplePayload: { id: 1 },

            // Add a name for sentry logs
            type: 'ExampleQuery',
          },
          // In the actual code you will pass the `environment` variable here
          createTestEnvironment(),
        ),
      },
    }
  })

  // # How the created query can be used

  test('calling the query function will execute a query in the data source', async () => {
    const result = await dataSources.database.getContent({ id: 42 })

    expect(result).toEqual({ id: 42, content: 'Hello world!' })
  })

  test('the result of the query function is cached', async () => {
    // First call which fills the cache
    await dataSources.database.getContent({ id: 42 })

    // An assumed change in the original database
    contentDatabase[42] = 'New content'

    // The cached value of the first execution is returned
    const result = await dataSources.database.getContent({ id: 42 })

    expect(result).toEqual({ id: 42, content: 'Hello world!' })
  })

  test('cached value is ignored when it is older than `maxAge`', async () => {
    await dataSources.database.getContent({ id: 42 })
    contentDatabase[42] = 'New content'
    await global.timer.waitFor({ days: 2 })

    const result = await dataSources.database.getContent({ id: 42 })

    expect(result).toEqual({ id: 42, content: 'New content' })
  })
})
