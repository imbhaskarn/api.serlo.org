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
import { A } from 'ts-toolbelt'

import {
  AppletDecoder,
  AppletRevisionDecoder,
  ArticleDecoder,
  ArticleRevisionDecoder,
  CommentDecoder,
  CourseDecoder,
  CoursePageDecoder,
  CoursePageRevisionDecoder,
  CourseRevisionDecoder,
  EventDecoder,
  EventRevisionDecoder,
  ExerciseDecoder,
  ExerciseGroupDecoder,
  ExerciseGroupRevisionDecoder,
  ExerciseRevisionDecoder,
  GroupedExerciseDecoder,
  GroupedExerciseRevisionDecoder,
  PageDecoder,
  PageRevisionDecoder,
  SolutionDecoder,
  SolutionRevisionDecoder,
  TaxonomyTermDecoder,
  UserDecoder,
  VideoDecoder,
  VideoRevisionDecoder,
} from './decoder'
import { createSerloModel } from './serlo'
import { Connection } from '~/schema/connection/types'

export interface Models {
  Applet: t.TypeOf<typeof AppletDecoder>
  AppletRevision: t.TypeOf<typeof AppletRevisionDecoder>
  Article: t.TypeOf<typeof ArticleDecoder>
  ArticleRevision: t.TypeOf<typeof ArticleRevisionDecoder>
  Comment: t.TypeOf<typeof CommentDecoder>
  CoursePage: t.TypeOf<typeof CoursePageDecoder>
  CoursePageRevision: t.TypeOf<typeof CoursePageRevisionDecoder>
  Course: t.TypeOf<typeof CourseDecoder>
  CourseRevision: t.TypeOf<typeof CourseRevisionDecoder>
  Event: t.TypeOf<typeof EventDecoder>
  EventRevision: t.TypeOf<typeof EventRevisionDecoder>
  ExerciseGroup: t.TypeOf<typeof ExerciseGroupDecoder>
  ExerciseGroupRevision: t.TypeOf<typeof ExerciseGroupRevisionDecoder>
  Exercise: t.TypeOf<typeof ExerciseDecoder>
  ExerciseRevision: t.TypeOf<typeof ExerciseRevisionDecoder>
  GroupedExercise: t.TypeOf<typeof GroupedExerciseDecoder>
  GroupedExerciseRevision: t.TypeOf<typeof GroupedExerciseRevisionDecoder>
  Mutation: Record<string, never>
  Navigation: Payload<'getNavigation'>
  License: Payload<'getLicense'>
  Page: t.TypeOf<typeof PageDecoder>
  PageRevision: t.TypeOf<typeof PageRevisionDecoder>
  Query: Record<string, never>
  Solution: t.TypeOf<typeof SolutionDecoder>
  SolutionRevision: t.TypeOf<typeof SolutionRevisionDecoder>
  TaxonomyTerm: t.TypeOf<typeof TaxonomyTermDecoder>
  Thread: {
    __typename: 'Thread'
    commentPayloads: Models['Comment'][]
  }
  User: t.TypeOf<typeof UserDecoder>
  Video: t.TypeOf<typeof VideoDecoder>
  VideoRevision: t.TypeOf<typeof VideoRevisionDecoder>
}

// TODO: Is there a better way to handle primitive types?
export type ModelOf<T> = T extends boolean | string | number | null
  ? T
  : Typename<T> extends keyof Models
  ? Models[Typename<T>]
  : T extends { nodes: Array<infer U>; totalCount: number }
  ? Connection<ModelOf<U>>
  : T extends (infer U)[]
  ? ModelOf<U>[]
  : T extends object
  ? { [P in keyof T]: ModelOf<T[P]> }
  : never

export type Typename<T> = T extends { __typename?: infer U }
  ? U extends string
    ? U
    : never
  : never

export type Payload<T extends keyof SerloModel> = NonNullable<
  A.PromiseOf<ReturnType<SerloModel[T]>>
>

type SerloModel = ReturnType<typeof createSerloModel>
