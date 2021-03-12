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
import { A } from 'ts-toolbelt'

import { createSerloModel } from '~/model'
import { Models } from '~/model/types'
import { Connection } from '~/schema/connection/types'

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
