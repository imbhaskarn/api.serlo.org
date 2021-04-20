/**
 * This file is part of Serlo.org API
 *
 * Copyright (c) 2020-2021 Serlo Education e.V.
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
 * @copyright Copyright (c) 2020-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/api.serlo.org for the canonical source repository
 */
import { createNotificationEventResolvers } from '../utils'
import { TypeResolvers } from '~/internals/graphql'
import { RepositoryDecoder, RevisionDecoder } from '~/model/decoder'
import { CheckoutRevisionNotificationEvent } from '~/types'

export const resolvers: TypeResolvers<CheckoutRevisionNotificationEvent> = {
  CheckoutRevisionNotificationEvent: {
    ...createNotificationEventResolvers(),
    async repository(notificationEvent, _args, { dataSources }) {
      const repository = await dataSources.model.serlo.getUuidWithCustomDecoder(
        {
          id: notificationEvent.repositoryId,
          decoder: RepositoryDecoder,
        }
      )

      if (repository === null) throw new Error('repository cannot be null')

      return repository
    },
    async revision(notificationEvent, _args, { dataSources }) {
      const revision = await dataSources.model.serlo.getUuidWithCustomDecoder({
        id: notificationEvent.revisionId,
        decoder: RevisionDecoder,
      })

      if (revision === null) throw new Error('revision cannot be null')

      return revision
    },
  },
}