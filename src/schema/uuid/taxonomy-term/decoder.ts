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
import * as t from 'io-ts'

import { InstanceDecoder } from '~/schema/instance/decoder'
import { AbstractUuidPayloadDecoder } from '~/schema/uuid/abstract-uuid/decoder'
import { DiscriminatorType } from '~/schema/uuid/abstract-uuid/types'
import { TaxonomyTermPayload } from '~/schema/uuid/taxonomy-term/types'
import { TaxonomyTermType } from '~/types'

export const TaxonomyTermTypeDecoder: t.Type<TaxonomyTermType> = t.union([
  t.literal<TaxonomyTermType>(TaxonomyTermType.Blog),
  t.literal<TaxonomyTermType>(TaxonomyTermType.Curriculum),
  t.literal<TaxonomyTermType>(TaxonomyTermType.CurriculumTopic),
  t.literal<TaxonomyTermType>(TaxonomyTermType.CurriculumTopicFolder),
  t.literal<TaxonomyTermType>(TaxonomyTermType.Forum),
  t.literal<TaxonomyTermType>(TaxonomyTermType.ForumCategory),
  t.literal<TaxonomyTermType>(TaxonomyTermType.Root),
  t.literal<TaxonomyTermType>(TaxonomyTermType.Subject),
  t.literal<TaxonomyTermType>(TaxonomyTermType.Topic),
  t.literal<TaxonomyTermType>(TaxonomyTermType.TopicFolder),
])

export const TaxonomyTermPayloadDecoder: t.Type<TaxonomyTermPayload> = t.exact(
  t.intersection([
    AbstractUuidPayloadDecoder,
    t.type({
      __typename: t.literal(DiscriminatorType.TaxonomyTerm),
      type: TaxonomyTermTypeDecoder,
      instance: InstanceDecoder,
      name: t.string,
      weight: t.number,
      childrenIds: t.array(t.number),
      parentId: t.union([t.number, t.null]),
    }),
    t.partial({
      description: t.union([t.string, t.null]),
    }),
  ])
)
