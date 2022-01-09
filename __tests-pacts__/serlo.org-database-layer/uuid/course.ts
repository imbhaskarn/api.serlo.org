/**
 * This file is part of Serlo.org API
 *
 * Copyright (c) 2020-2022 Serlo Education e.V.
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
 * @copyright Copyright (c) 2020-2022 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/api.serlo.org for the canonical source repository
 */
import { Matchers } from '@pact-foundation/pact'
import { gql } from 'apollo-server'
import R from 'ramda'

import { course, courseRevision } from '../../../__fixtures__'
import {
  addUuidInteraction,
  assertSuccessfulGraphQLQuery,
} from '../../__utils__'
import { Model } from '~/internals/graphql'

test('Course', async () => {
  await addUuidInteraction<Model<'Course'>>({
    __typename: course.__typename,
    id: course.id,
    trashed: Matchers.boolean(course.trashed),
    instance: Matchers.string(course.instance),
    alias: Matchers.string(course.alias),
    date: Matchers.iso8601DateTime(course.date),
    currentRevisionId: course.currentRevisionId
      ? Matchers.integer(course.currentRevisionId)
      : null,
    revisionIds: Matchers.eachLike(course.revisionIds[0]),
    licenseId: Matchers.integer(course.licenseId),
    taxonomyTermIds:
      course.taxonomyTermIds.length > 0
        ? Matchers.eachLike(Matchers.like(course.taxonomyTermIds[0]))
        : [],
    pageIds:
      course.pageIds.length > 0
        ? Matchers.eachLike(Matchers.like(course.pageIds[0]))
        : [],
    canonicalSubjectId: course.canonicalSubjectId
      ? Matchers.integer(course.canonicalSubjectId)
      : null,
  })
  await assertSuccessfulGraphQLQuery({
    query: gql`
        {
          uuid(id: ${course.id}) {
            __typename
            ... on Course {
              id
              trashed
              instance
              date
            }
          }
        }
      `,
    data: {
      uuid: R.pick(['__typename', 'id', 'trashed', 'instance', 'date'], course),
    },
  })
})

test('CourseRevision', async () => {
  await addUuidInteraction<Model<'CourseRevision'>>({
    __typename: courseRevision.__typename,
    id: courseRevision.id,
    trashed: Matchers.boolean(courseRevision.trashed),
    alias: Matchers.string(courseRevision.alias),
    date: Matchers.iso8601DateTime(courseRevision.date),
    authorId: Matchers.integer(courseRevision.authorId),
    repositoryId: Matchers.integer(courseRevision.repositoryId),
    title: Matchers.string(courseRevision.title),
    content: Matchers.string(courseRevision.content),
    changes: Matchers.string(courseRevision.changes),
    metaDescription: Matchers.string(courseRevision.metaDescription),
  })
  await assertSuccessfulGraphQLQuery({
    query: gql`
        {
          uuid(id: ${course.currentRevisionId}) {
            __typename
            ... on CourseRevision {
              id
              trashed
              date
              title
              content
              changes
              metaDescription
            }
          }
        }
      `,
    data: {
      uuid: R.pick(
        [
          '__typename',
          'id',
          'trashed',
          'date',
          'title',
          'content',
          'changes',
          'metaDescription',
        ],
        courseRevision
      ),
    },
  })
})
