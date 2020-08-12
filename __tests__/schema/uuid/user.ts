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
import { gql } from 'apollo-server'
import { rest } from 'msw'

import {
  article,
  createUserActiveDonorQuery,
  user,
  user2,
} from '../../../__fixtures__'
import { Service } from '../../../src/graphql/schema/types'
import { UuidPayload } from '../../../src/graphql/schema/uuid/abstract-uuid'
import {
  assertSuccessfulGraphQLQuery,
  Client,
  createTestClient,
  createUuidHandler,
} from '../../__utils__'

let client: Client

beforeEach(() => {
  client = createTestClient({
    service: Service.SerloCloudflareWorker,
    user: null,
  }).client
  global.server.use(createUuidHandler(user))
})

describe('User', () => {
  test('by id', async () => {
    await assertSuccessfulGraphQLQuery({
      query: gql`
        query article($id: Int!) {
          uuid(id: $id) {
            __typename
            ... on User {
              id
              trashed
              username
              date
              lastLogin
              description
            }
          }
        }
      `,
      variables: user,
      data: {
        uuid: user,
      },
      client,
    })
  })

  test('by id (w/ activeDonor when user is an active donor)', async () => {
    global.server.use(createActiveDonorsHandler([user]))
    await assertSuccessfulGraphQLQuery({
      ...createUserActiveDonorQuery(user),
      data: {
        uuid: { activeDonor: true },
      },
      client,
    })
  })

  test('by id (w/ activeDonor when user is not an active donor', async () => {
    global.server.use(createActiveDonorsHandler([]))
    await assertSuccessfulGraphQLQuery({
      ...createUserActiveDonorQuery(user),
      data: {
        uuid: { activeDonor: false },
      },
      client,
    })
  })
})

describe('activeDonors', () => {
  function createActiveDonorsQuery() {
    return {
      query: gql`
        {
          activeDonors {
            nodes{
              __typename
              id
              trashed
              username
              date
              lastLogin
              description
            }
            totalCount
          }
        }
      `,
    }
  }

  test('activeDonors', async () => {
    global.server.use(
      createUuidHandler(user2),
      createActiveDonorsHandler([user, user2])
    )
    await assertSuccessfulGraphQLQuery({
      ...createActiveDonorsQuery(),
      data: {
        activeDonors: {nodes: [user, user2], totalCount: 2},
      },
      client,
    })
  })

  test('activeDonors (only returns users)', async () => {
    global.server.use(
      createUuidHandler(article),
      createActiveDonorsHandler([user, article])
    )
    await assertSuccessfulGraphQLQuery({
      ...createActiveDonorsQuery(),
      data: {
        activeDonors: {nodes:[user], totalCount: 1},
      },
      client,
    })
  })

  describe('parser', () => {
    function createActiveDonorsQueryExpectingIds(ids: number[]) {
      return {
        query: gql`
          {
            activeDonors {
              nodes{
                id
              }
            }
          }
        `,
        data: {
          activeDonors: {nodes:ids.map((id) => {
            return { id }
          })},
        },
      }
    }

    function createUsersHandler(ids: number[]) {
      return ids.map((id) => {
        return createUuidHandler({ ...user, id })
      })
    }

    test('extract user ids from first column with omitting the header', async () => {
      global.server.use(
        ...createUsersHandler([1, 2, 3]),
        createActiveDonorsSpreadsheetHandler([['Header', '1', '2', '3']])
      )
      await assertSuccessfulGraphQLQuery({
        ...createActiveDonorsQueryExpectingIds([1, 2, 3]),
        client,
      })
    })

    test('removes entries which are no valid uuids', async () => {
      global.server.use(
        ...createUsersHandler([23]),
        createActiveDonorsSpreadsheetHandler([
          ['Header', '23', 'foo', '-1', '', '1.5'],
        ])
      )
      await assertSuccessfulGraphQLQuery({
        ...createActiveDonorsQueryExpectingIds([23]),
        client,
      })
    })

    test('cell entries are trimmed of leading and trailing whitespaces', async () => {
      global.server.use(
        ...createUsersHandler([10, 20]),
        createActiveDonorsSpreadsheetHandler([['Header', ' 10 ', '  20']])
      )
      await assertSuccessfulGraphQLQuery({
        ...createActiveDonorsQueryExpectingIds([10, 20]),
        client,
      })
    })

    test('returns empty list when spreadsheet is empty', async () => {
      global.server.use(createActiveDonorsSpreadsheetHandler([[]]))
      await assertSuccessfulGraphQLQuery({
        ...createActiveDonorsQueryExpectingIds([]),
        client,
      })
    })

    test('returns empty list when an error occured while accessing the spreadsheet', async () => {
      global.server.use(createActiveDonorsSpreadsheetResponseHandler({}))
      await assertSuccessfulGraphQLQuery({
        ...createActiveDonorsQueryExpectingIds([]),
        client,
      })
    })
  })
})

function createActiveDonorsHandler(users: UuidPayload[]) {
  return createActiveDonorsSpreadsheetHandler([
    ['Header', ...users.map((user) => user.id.toString())],
  ])
}

function createActiveDonorsSpreadsheetHandler(values: string[][]) {
  const body = {
    range: 'Tabellenblatt1!A:A',
    majorDimension: 'COLUMNS',
    values,
  }
  return createActiveDonorsSpreadsheetResponseHandler(body)
}

function createActiveDonorsSpreadsheetResponseHandler(
  body: Record<string, unknown>
) {
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/` +
    `${process.env.ACTIVE_DONORS_SPREADSHEET_ID}/values/Tabellenblatt1!A:A` +
    `?majorDimension=COLUMNS&key=${process.env.GOOGLE_API_KEY}`
  return rest.get(url, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(body))
  })
}
