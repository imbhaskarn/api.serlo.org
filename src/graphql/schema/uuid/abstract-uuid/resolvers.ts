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
import { resolveAbstractUuid, UuidPayload } from '..'
import { UuidResolvers } from './types'

export const resolvers: UuidResolvers = {
  AbstractUuid: {
    __resolveType(uuid) {
      return uuid.__typename
    },
  },
  Query: {
    async uuid(_parent, payload, { dataSources }) {
      const id = payload.alias
        ? (await dataSources.serlo.getAlias(payload.alias)).id
        : (payload.id as number)
      const data = await dataSources.serlo.getUuid<UuidPayload>({ id })
      return resolveAbstractUuid(data)
    },
  },
}