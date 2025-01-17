import * as auth from '@serlo/authorization'

import {
  decodeThreadId,
  decodeThreadIds,
  encodeThreadId,
  resolveThreads,
} from './utils'
import { ForbiddenError, UserInputError } from '~/errors'
import {
  assertUserIsAuthenticated,
  assertUserIsAuthorized,
  createNamespace,
  InterfaceResolvers,
  Mutations,
  TypeResolvers,
  Model,
  Context,
  Queries,
} from '~/internals/graphql'
import {
  CommentDecoder,
  DiscriminatorType,
  UserDecoder,
  UuidDecoder,
} from '~/model/decoder'
import { fetchScopeOfUuid } from '~/schema/authorization/utils'
import { resolveConnection } from '~/schema/connection/utils'
import { decodeSubjectId } from '~/schema/subject/utils'
import { createUuidResolvers } from '~/schema/uuid/abstract-uuid/utils'
import { Comment, CommentStatus, Thread } from '~/types'

export const resolvers: InterfaceResolvers<'ThreadAware'> &
  Mutations<'thread'> &
  TypeResolvers<Thread> &
  TypeResolvers<Comment> &
  Queries<'thread'> = {
  ThreadAware: {
    __resolveType(parent) {
      return parent.__typename
    },
  },
  Query: {
    thread: createNamespace(),
  },
  ThreadQuery: {
    async allThreads(_parent, input, { dataSources }) {
      const subjectId = input.subjectId
        ? decodeSubjectId(input.subjectId)
        : undefined
      const limit = 50
      const { first = 10, instance } = input
      // TODO: Better solution
      const after = input.after
        ? Buffer.from(input.after, 'base64').toString()
        : undefined

      if (first && first > limit)
        throw new UserInputError(`"first" cannot be larger than ${limit}`)

      const { firstCommentIds } = await dataSources.model.serlo.getAllThreads({
        first: first + 1,
        after,
        instance,
        subjectId,
        ...(input.status ? { status: input.status } : {}),
      })

      const threads = await resolveThreads({ firstCommentIds, dataSources })

      // TODO: The types do not match
      // TODO: Support for resolving small changes
      return resolveConnection({
        nodes: threads,
        payload: { ...input, first, after },
        createCursor: (node) => {
          const comments = node.commentPayloads
          const latestComment = comments[comments.length - 1]

          return latestComment.date
        },
      })
    },
  },
  Thread: {
    id(thread) {
      return encodeThreadId(thread.commentPayloads[0].id)
    },
    createdAt(thread) {
      return thread.commentPayloads[0].date
    },
    title(thread) {
      return thread.commentPayloads[0].title
    },
    archived(thread) {
      return thread.commentPayloads[0].archived
    },
    trashed(thread) {
      return thread.commentPayloads[0].trashed
    },
    status(thread) {
      return convertToApiCommentStatus(thread.commentPayloads[0].status)
    },
    async object(thread, _args, { dataSources }) {
      return await dataSources.model.serlo.getUuidWithCustomDecoder({
        id: thread.commentPayloads[0].parentId,
        decoder: UuidDecoder,
      })
    },
    comments(thread, cursorPayload) {
      return resolveConnection({
        nodes: thread.commentPayloads.sort((a, b) => a.id - b.id),
        payload: cursorPayload,
        createCursor(node) {
          return node.id.toString()
        },
      })
    },
  },
  Comment: {
    ...createUuidResolvers(),
    createdAt(comment) {
      return comment.date
    },
    async author(comment, _args, { dataSources }) {
      return await dataSources.model.serlo.getUuidWithCustomDecoder({
        id: comment.authorId,
        decoder: UserDecoder,
      })
    },
    async legacyObject(comment, _args, { dataSources }) {
      return resolveObject(comment, dataSources)
    },
  },
  Mutation: {
    thread: createNamespace(),
  },
  ThreadMutation: {
    async createThread(_parent, payload, { dataSources, userId }) {
      const { objectId } = payload.input
      const scope = await fetchScopeOfUuid({ id: objectId, dataSources })

      assertUserIsAuthenticated(userId)
      await assertUserIsAuthorized({
        userId,
        guard: auth.Thread.createThread(scope),
        message: 'You are not allowed to create a thread on this object.',
        dataSources,
      })

      const commentPayload = await dataSources.model.serlo.createThread({
        ...payload.input,
        userId,
      })
      const success = commentPayload !== null
      return {
        record:
          commentPayload !== null
            ? { __typename: 'Thread', commentPayloads: [commentPayload] }
            : null,
        success,
        query: {},
      }
    },
    async createComment(_parent, { input }, { dataSources, userId }) {
      const threadId = decodeThreadId(input.threadId)
      const scope = await fetchScopeOfUuid({ id: threadId, dataSources })

      assertUserIsAuthenticated(userId)
      await assertUserIsAuthorized({
        userId,
        guard: auth.Thread.createComment(scope),
        message: 'You are not allowed to comment on this thread.',
        dataSources,
      })

      const commentPayload = await dataSources.model.serlo.createComment({
        ...input,
        threadId,
        userId,
      })

      return {
        record: commentPayload,
        success: commentPayload !== null,
        query: {},
      }
    },
    async editComment(_parent, { input }, { dataSources, userId }) {
      const commentId = input.commentId
      const scope = await fetchScopeOfUuid({ id: commentId, dataSources })

      assertUserIsAuthenticated(userId)
      await assertUserIsAuthorized({
        userId,
        guard: auth.Thread.createThread(scope),
        message: 'You are not allowed to edit this thread or comment.',
        dataSources,
      })

      await dataSources.model.serlo.editComment({
        ...input,
        commentId,
        userId,
      })

      return {
        success: true,
        query: {},
      }
    },
    async setThreadStatus(_parent, payload, context) {
      const { dataSources, userId } = context

      assertUserIsAuthenticated(userId)

      const { id, status } = payload.input
      const ids = decodeThreadIds(id)

      const threads = await resolveThreads({
        firstCommentIds: ids,
        dataSources,
      })

      await assertUserIsAuthorizedOrTookPartInDiscussion({ context, threads })

      await dataSources.model.serlo.setThreadStatus({ ids, status })

      return { success: true, query: {} }
    },
    async setThreadArchived(_parent, payload, { dataSources, userId }) {
      const { id, archived } = payload.input
      const ids = decodeThreadIds(id)

      const scopes = await Promise.all(
        ids.map((id) => fetchScopeOfUuid({ id, dataSources })),
      )

      assertUserIsAuthenticated(userId)
      await assertUserIsAuthorized({
        userId,
        guards: scopes.map((scope) => auth.Thread.setThreadArchived(scope)),
        message: 'You are not allowed to archive the provided thread(s).',
        dataSources,
      })

      await dataSources.model.serlo.archiveThread({
        ids,
        archived,
        userId,
      })
      return { success: true, query: {} }
    },
    async setThreadState(_parent, payload, { dataSources, userId }) {
      const { trashed } = payload.input
      const ids = decodeThreadIds(payload.input.id)

      const scopes = await Promise.all(
        ids.map((id) => fetchScopeOfUuid({ id, dataSources })),
      )

      assertUserIsAuthenticated(userId)

      await assertUserIsAuthorized({
        userId,
        guards: scopes.map((scope) => auth.Thread.setThreadState(scope)),
        message:
          'You are not allowed to set the state of the provided thread(s).',
        dataSources,
      })

      await dataSources.model.serlo.setUuidState({ ids, userId, trashed })

      return { success: true, query: {} }
    },
    async setCommentState(_parent, payload, { dataSources, userId }) {
      const { id: ids, trashed } = payload.input

      const scopes = await Promise.all(
        ids.map((id) => fetchScopeOfUuid({ id, dataSources })),
      )

      assertUserIsAuthenticated(userId)

      const comments = await Promise.all(
        ids.map((id) =>
          dataSources.model.serlo.getUuidWithCustomDecoder({
            id,
            decoder: CommentDecoder,
          }),
        ),
      )

      const currentUserHasCreatedAllComments = comments.every(
        (comment) => comment.authorId === userId,
      )

      if (!currentUserHasCreatedAllComments) {
        await assertUserIsAuthorized({
          userId,
          guards: scopes.map((scope) => auth.Thread.setCommentState(scope)),
          message:
            'You are not allowed to set the state of the provided comments(s).',
          dataSources,
        })
      }

      await dataSources.model.serlo.setUuidState({ ids, trashed, userId })

      return { success: true, query: {} }
    },
  },
}

async function resolveObject(
  comment: Model<'Comment'>,
  dataSources: Context['dataSources'],
): Promise<Model<'AbstractUuid'>> {
  const obj = await dataSources.model.serlo.getUuidWithCustomDecoder({
    id: comment.parentId,
    decoder: UuidDecoder,
  })

  return obj.__typename === DiscriminatorType.Comment
    ? resolveObject(obj, dataSources)
    : obj
}

function convertToApiCommentStatus(
  rawStatus: Model<'Comment'>['status'],
): CommentStatus {
  switch (rawStatus) {
    case 'noStatus':
      return CommentStatus.NoStatus
    case 'open':
      return CommentStatus.Open
    case 'done':
      return CommentStatus.Done
  }
}

async function assertUserIsAuthorizedOrTookPartInDiscussion({
  context,
  threads,
}: {
  context: Context
  threads: Model<'Thread'>[]
}) {
  const { dataSources, userId } = context

  const scopes = await Promise.all(
    threads.map((thread) =>
      fetchScopeOfUuid({
        id: thread.commentPayloads[0].parentId,
        dataSources,
      }),
    ),
  )

  const message =
    'You are not allowed to set the status of the provided thread(s).'

  try {
    await assertUserIsAuthorized({
      userId,
      guards: scopes.map((scope) => auth.Thread.setThreadStatus(scope)),
      message,
      dataSources,
    })
  } catch {
    for (const thread of threads) {
      if (
        !thread.commentPayloads.some((comment) => comment.authorId === userId)
      ) {
        throw new ForbiddenError(message)
      }
    }
  }
}
