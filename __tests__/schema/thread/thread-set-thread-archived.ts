/**
 * This file is part of Serlo.org API
 *
 * Copyright (c) 2021 Serlo Education e.V.
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
 * @copyright Copyright (c) 2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/api.serlo.org for the canonical source repository
 */
import { gql } from 'apollo-server'
import { rest } from 'msw'

import { comment } from '../../../__fixtures__'
import {
  assertFailingGraphQLMutation,
  createTestClient,
  getDatabaseLayerUrl,
} from '../../__utils__'
import { encodeThreadId } from '~/schema/thread'

describe('archive-comment', () => {
  beforeEach(() => mockThreadSetArchiveEndpoint())

  const mutation = gql`
    mutation setThreadArchived($input: ThreadSetThreadArchivedInput!) {
      thread {
        setThreadArchived(input: $input) {
          success
        }
      }
    }
  `

  test('unauthenticated user gets error', async () => {
    const client = createTestClient({ userId: null })
    await assertFailingGraphQLMutation({
      mutation,
      variables: { input: { id: encodeThreadId(comment.id), archived: true } },
      client,
      expectedError: 'UNAUTHENTICATED',
    })
  })
})

function mockThreadSetArchiveEndpoint() {
  global.server.use(
    rest.post<{
      ids: number[]
      userId: number
      archived: boolean
    }>(
      getDatabaseLayerUrl({ path: '/thread/set-archive' }),
      (req, res, ctx) => {
        const { ids, archived } = req.body

        if (!ids.indexOf(comment.id)) return res(ctx.status(404))

        return res(ctx.json({ ...comment, archived: archived }))
      }
    )
  )
}
