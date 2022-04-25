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
import { gql } from 'apollo-server'
import R from 'ramda'

import {
  applet,
  article,
  course,
  coursePage,
  event,
  exercise,
  exerciseGroup,
  groupedExercise,
  solution,
  taxonomyTermSubject,
  taxonomyTermRoot,
  user,
  video,
  appletRevision,
  articleRevision,
  courseRevision,
  coursePageRevision,
  eventRevision,
  exerciseRevision,
  exerciseGroupRevision,
  groupedExerciseRevision,
  solutionRevision,
  videoRevision,
} from '../../../__fixtures__'
import {
  given,
  Client,
  nextUuid,
  ALL_POSSIBLE_FIELDS,
  appletFields,
  articleFields,
  courseFields,
  coursePageFields,
  EntityFields,
  eventFields,
  exerciseGroupFields,
  getTypenameAndId,
  genericFields,
  videoFields,
} from '../../__utils__'
import { Model } from '~/internals/graphql'
import { DatabaseLayer } from '~/model'
import { castToUuid, EntityType } from '~/model/decoder'
import {
  AbstractEntitySetInput,
  fromEntityTypeToEntityRevisionType,
} from '~/schema/uuid/abstract-entity/utils'

class EntitySetWrapper {
  public mutationName: string
  public fields: Partial<EntityFields>

  constructor(
    public entityType: EntityType,
    private fieldsFromApi: (keyof EntityFields)[]
  ) {
    this.entityType = entityType
    this.mutationName = `set${this.entityType}`
    this.fields = R.pick(fieldsFromApi, ALL_POSSIBLE_FIELDS)
  }

  get entity() {
    switch (this.entityType) {
      case EntityType.Applet:
        return applet
      case EntityType.Article:
        return article
      case EntityType.Course:
        return course
      case EntityType.CoursePage:
        return coursePage
      case EntityType.Event:
        return event
      case EntityType.Exercise:
        return exercise
      case EntityType.ExerciseGroup:
        return exerciseGroup
      case EntityType.GroupedExercise:
        return groupedExercise
      case EntityType.Solution:
        return solution
      case EntityType.Video:
        return video
    }
  }

  get inputName() {
    if (
      [
        EntityType.Exercise,
        EntityType.GroupedExercise,
        EntityType.Solution,
      ].includes(this.entityType)
    ) {
      return 'SetGenericEntityInput'
    }
    return `Set${this.entityType}Input`
  }

  get parent(): Model<'AbstractEntity' | 'TaxonomyTerm'> {
    switch (this.entityType) {
      case EntityType.CoursePage:
        return course
      case EntityType.GroupedExercise:
        return exerciseGroup
      case EntityType.Solution:
        return exercise
      default:
        return taxonomyTermSubject
    }
  }

  get fieldsToDBLayer() {
    if (this.entityType === EntityType.ExerciseGroup) {
      return {
        cohesive: this.fields.cohesive!.toString(),
        content: this.fields.content!,
      }
    } else if (this.entityType === EntityType.Course) {
      return {
        description: this.fields.content!,
        title: this.fields.title!,
        metaDescription: this.fields.metaDescription!,
      }
    } else if (this.entityType === EntityType.Video) {
      return {
        content: this.fields.url!,
        description: this.fields.content!,
        title: this.fields.title!,
      }
    }
    const fieldsWithoutCohesive: Omit<typeof this.fields, 'cohesive'> =
      this.fields

    return fieldsWithoutCohesive
  }

  get revision() {
    switch (this.entityType) {
      case EntityType.Applet:
        return appletRevision
      case EntityType.Article:
        return articleRevision
      case EntityType.Course:
        return courseRevision
      case EntityType.CoursePage:
        return coursePageRevision
      case EntityType.Event:
        return eventRevision
      case EntityType.Exercise:
        return exerciseRevision
      case EntityType.ExerciseGroup:
        return exerciseGroupRevision
      case EntityType.GroupedExercise:
        return groupedExerciseRevision
      case EntityType.Solution:
        return solutionRevision
      case EntityType.Video:
        return videoRevision
    }
  }
}

const entitySetTypes = [
  new EntitySetWrapper(EntityType.Applet, appletFields),
  new EntitySetWrapper(EntityType.Article, articleFields),
  new EntitySetWrapper(EntityType.Course, courseFields),
  new EntitySetWrapper(EntityType.CoursePage, coursePageFields),
  new EntitySetWrapper(EntityType.Event, eventFields),
  new EntitySetWrapper(EntityType.Exercise, genericFields),
  new EntitySetWrapper(EntityType.ExerciseGroup, exerciseGroupFields),
  new EntitySetWrapper(EntityType.GroupedExercise, genericFields),
  new EntitySetWrapper(EntityType.Solution, genericFields),
  new EntitySetWrapper(EntityType.Video, videoFields),
]

type InputFromApi = Omit<AbstractEntitySetInput, 'cohesive'> & {
  cohesive?: boolean
}

entitySetTypes.forEach((entitySetType) => {
  describe(entitySetType.mutationName, () => {
    const input: InputFromApi = {
      changes: 'changes',
      needsReview: true,
      subscribeThis: false,
      subscribeThisByEmail: false,
      ...entitySetType.fields,
    }

    const mutationWithParentId = new Client({ userId: user.id })
      .prepareQuery({
        query: gql`
          mutation set($input: ${entitySetType.inputName}!) {
            entity {
              ${entitySetType.mutationName}(input: $input) {
                success
                record {
                  id
                }
              }
            }
          }
        `,
      })
      .withVariables({ input: { ...input, parentId: entitySetType.parent.id } })

    const inputWithEntityId = { ...input, entityId: entitySetType.entity.id }

    const mutationWithEntityId = new Client({ userId: user.id })
      .prepareQuery({
        query: gql`
          mutation set($input: ${entitySetType.inputName}!) {
            entity {
              ${entitySetType.mutationName}(input: $input) {
                success
                record {
                  id
                }
              }
            }
          }
        `,
      })
      .withVariables({ input: inputWithEntityId })

    const { changes, needsReview, subscribeThis, subscribeThisByEmail } = input

    let entityCreatePayload: DatabaseLayer.Payload<'EntityCreateMutation'> = {
      input: {
        changes,
        instance: entitySetType.parent.instance,
        needsReview,
        licenseId: 1,
        subscribeThis,
        subscribeThisByEmail,
        fields: entitySetType.fieldsToDBLayer,
      },
      userId: user.id,
      entityType: entitySetType.entityType,
    }

    if (entitySetType.parent.__typename == 'TaxonomyTerm') {
      entityCreatePayload = {
        ...entityCreatePayload,
        input: {
          ...entityCreatePayload.input,
          taxonomyTermId: entitySetType.parent.id,
        },
      }
    } else {
      entityCreatePayload = {
        ...entityCreatePayload,
        input: {
          ...entityCreatePayload.input,
          parentId: entitySetType.parent.id,
        },
      }
    }

    const { entityId } = inputWithEntityId

    const entityAddRevisionPayload: DatabaseLayer.Payload<'EntityAddRevisionMutation'> =
      {
        input: {
          changes,
          entityId,
          needsReview,
          subscribeThis,
          subscribeThisByEmail,
          fields: entitySetType.fieldsToDBLayer,
        },
        userId: user.id,
        revisionType: fromEntityTypeToEntityRevisionType(
          entitySetType.entityType
        ),
      }

    beforeEach(() => {
      given('UuidQuery').for(
        entitySetType.parent,
        taxonomyTermSubject,
        taxonomyTermRoot,
        user
      )
    })

    test('creates an entity when parentId is provided', async () => {
      given('EntityCreateMutation')
        .withPayload(entityCreatePayload)
        .returns(entitySetType.entity)

      await mutationWithParentId.shouldReturnData({
        entity: {
          [entitySetType.mutationName]: {
            success: true,
            record: { id: entitySetType.entity.id },
          },
        },
      })
    })

    test('adds new entity revision when entityId is provided', async () => {
      given('UuidQuery').for(entitySetType.entity)

      given('EntityAddRevisionMutation')
        .withPayload(entityAddRevisionPayload)
        .returns({ success: true, revisionId: 123 })

      await mutationWithEntityId.shouldReturnData({
        entity: {
          [entitySetType.mutationName]: {
            success: true,
          },
        },
      })
    })

    test('fails when user is not authenticated', async () => {
      await mutationWithEntityId
        .forUnauthenticatedUser()
        .shouldFailWithError('UNAUTHENTICATED')
    })

    test('fails when user does not have role "login"', async () => {
      given('UuidQuery').for(entitySetType.entity)

      const guestUser = { ...user, id: nextUuid(user.id), roles: ['guest'] }

      given('UuidQuery').for(guestUser)

      await mutationWithEntityId
        .forClient(new Client({ userId: guestUser.id }))
        .shouldFailWithError('FORBIDDEN')
    })

    test('fails when a field is empty', async () => {
      await mutationWithEntityId
        .withVariables({
          input: {
            ...input,
            changes: '',
          },
        })
        .shouldFailWithError('BAD_USER_INPUT')

      await mutationWithParentId
        .withVariables({
          input: {
            ...input,
            changes: '',
          },
        })
        .shouldFailWithError('BAD_USER_INPUT')
    })

    test('fails when database layer returns a 400er response', async () => {
      given('EntityCreateMutation').returnsBadRequest()
      given('EntityAddRevisionMutation').returnsBadRequest()

      await mutationWithParentId.shouldFailWithError('BAD_USER_INPUT')

      given('UuidQuery').for(entitySetType.entity)
      await mutationWithEntityId.shouldFailWithError('BAD_USER_INPUT')
    })

    test('fails when database layer has an internal error', async () => {
      given('EntityCreateMutation').hasInternalServerError()
      given('EntityAddRevisionMutation').hasInternalServerError()

      await mutationWithParentId.shouldFailWithError('INTERNAL_SERVER_ERROR')

      given('UuidQuery').for(entitySetType.entity)
      await mutationWithEntityId.shouldFailWithError('INTERNAL_SERVER_ERROR')
    })

    test('fails when parent does not exists', async () => {
      given('UuidQuery')
        .withPayload({ id: entitySetType.parent.id })
        .returnsNotFound()

      await mutationWithParentId.shouldFailWithError('BAD_USER_INPUT')
    })

    describe(`Cache after ${entitySetType.mutationName} call`, () => {
      const newRevision = {
        ...entitySetType.revision,
        id: castToUuid(123),
      }

      const anotherEntity = {
        ...entitySetType.entity,
        id: castToUuid(456),
      }

      beforeEach(() => {
        given('UuidQuery').for(
          entitySetType.entity,
          entitySetType.revision,
          anotherEntity,
          taxonomyTermSubject,
          taxonomyTermRoot,
          user
        )

        given('EntityAddRevisionMutation')
          .withPayload(entityAddRevisionPayload)
          .returns({ success: true, revisionId: newRevision.id })

        given('EntityAddRevisionMutation')
          .withPayload({
            ...entityAddRevisionPayload,
            input: { ...entityAddRevisionPayload.input, needsReview: false },
          })
          .isDefinedBy((req, res, ctx) => {
            given('UuidQuery').for(
              { ...entitySetType.entity, currentRevisionId: newRevision.id },
              newRevision
            )

            return res(ctx.json({ success: true, revisionId: newRevision.id }))
          })

        given('SubscriptionsQuery')
          .withPayload({ userId: user.id })
          .returns({
            subscriptions: [{ objectId: anotherEntity.id, sendEmail: true }],
          })
      })

      test('updates the checked out revision when needsReview=false', async () => {
        const uuidQuery = new Client({ userId: user.id })
          .prepareQuery({
            query: gql`
              query ($id: Int!) {
                uuid(id: $id) {
                  id
                  __typename
                  ... on ${entitySetType.entityType} {
                    currentRevision {
                      id
                    }
                  }
                }
              }
            `,
          })
          .withVariables({ id: entitySetType.entity.id })

        await uuidQuery.shouldReturnData({
          uuid: {
            id: entitySetType.entity.id,
            __typename: entitySetType.entity.__typename,
            currentRevision: { id: entitySetType.entity.currentRevisionId },
          },
        })

        await mutationWithEntityId.execute()

        await uuidQuery.shouldReturnData({
          uuid: {
            currentRevision: { id: entitySetType.entity.currentRevisionId },
          },
        })

        await mutationWithEntityId
          .withVariables({
            input: { ...inputWithEntityId, needsReview: false },
          })
          .execute()

        await uuidQuery.shouldReturnData({
          uuid: { currentRevision: { id: newRevision.id } },
        })
      })


    })
  })
})
