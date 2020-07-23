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
import { RESTDataSource } from 'apollo-datasource-rest'
import { InMemoryLRUCache } from 'apollo-server-caching'
import { either } from 'fp-ts'

import { ErrorEvent } from '../../src/error-event'

export * from './assertions'
export * from './handlers'
export * from './test-client'

export function expectToBeLeftEventWith<A>(
  value: either.Either<ErrorEvent, A>,
  expectedEvent: ErrorEvent
) {
  expect(either.isLeft(value)).toBe(true)

  if (either.isLeft(value))
    expect(value.left).toEqual(expect.objectContaining(expectedEvent))
}

export function initializeDataSource(dataSource: RESTDataSource) {
  dataSource.initialize({ context: {}, cache: new InMemoryLRUCache() })
}
