import { ForbiddenError } from 'apollo-server'
import * as R from 'ramda'

import { resolveConnection } from '../connection'
import { UuidPayload } from '../uuid'
import { CommentPayload } from '../uuid/comment/types'
import { ThreadResolvers } from './types'

export const resolvers: ThreadResolvers = {
  Thread: {
    createdAt(thread, _args) {
      return thread.commentPayloads
        .map((comment) => comment.date)
        .reduce(R.min)
        .toString()
    },
    updatedAt(thread, _args) {
      return thread.commentPayloads
        .map((comment) => comment.date)
        .reduce(R.max)
        .toString()
    },
    title(thread, _args) {
      return thread.commentPayloads[0].title
    },
    archived(thread, _args) {
      return thread.commentPayloads[0].archived
    },
    trashed(thread, _args) {
      return thread.commentPayloads[0].trashed
    },
    async object(thread, _args, { dataSources }) {
      const objectIds = await dataSources.serlo.getUuid<UuidPayload>({
        id: thread.commentPayloads[0].id,
      })
      if (objectIds === null) {
        throw new ForbiddenError('There are no comments yet')
      }
      return objectIds
    },
    comments(thread, cursorPayload) {
      return resolveConnection<CommentPayload>({
        nodes: thread.commentPayloads,
        payload: cursorPayload,
        createCursor(node) {
          return node.id.toString()
        },
      })
    },
  },
}
