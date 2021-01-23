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

import { article } from '../../../__fixtures__'
import { assertFailingGraphQLMutation, createTestClient } from '../../__utils__'

test('unauthenticated user gets error', async () => {
  await assertFailingGraphQLMutation({
    mutation: gql`
      mutation($input: ThreadCreateThreadInput!) {
        thread {
          createThread(input: $input) {
            success
          }
        }
      }
    `,
    variables: {
      input: { content: 'Hello', title: 'Hello', objectId: article.id },
    },
    client: createTestClient({ userId: null }),
    expectedError: 'UNAUTHENTICATED',
  })
})
