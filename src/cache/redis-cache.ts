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
import redis from 'redis'
import * as util from 'util'

import { Cache } from '../graphql/environment'

export function createRedisCache({ host }: { host: string }): Cache {
  const client = redis.createClient({
    host,
    port: 6379,
    // eslint-disable-next-line @typescript-eslint/camelcase
    return_buffers: true,
  })
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const get = (util.promisify(client.get).bind(client) as unknown) as (
    key: string
  ) => Promise<Buffer | null>
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const set = (util.promisify(client.set).bind(client) as unknown) as (
    key: string,
    value: Buffer
  ) => Promise<void>

  return {
    async get(key) {
      return await get(key)
    },
    async set(key, value) {
      await set(key, value)
    },
  }
}