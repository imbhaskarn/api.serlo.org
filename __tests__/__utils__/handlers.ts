/**
 * This file is part of Serlo.org API
 *
 * Copyright (c) 2021 Serlo Education e.V.
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
 * @copyright Copyright (c) 2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/api.serlo.org for the canonical source repository
 */
import { rest } from 'msw'

import { LicensePayload } from '~/schema/license'
import { NotificationEventPayload } from '~/schema/notification'
import { AliasPayload, NavigationPayload, UuidPayload } from '~/schema/uuid'
import { Instance } from '~/types'

export function createAliasHandler(alias: AliasPayload) {
  return createJsonHandlerForDatabaseLayer({
    path: `/alias/${alias.instance}${alias.path}`,
    body: alias,
  })
}

export function createLicenseHandler(license: LicensePayload) {
  return createJsonHandlerForDatabaseLayer({
    path: `/license/${license.id}`,
    body: license,
  })
}

export function createNavigationHandler(navigation: NavigationPayload) {
  return createJsonHandlerForLegacySerlo({
    instance: navigation.instance,
    path: '/api/navigation',
    body: navigation,
  })
}

export function createNotificationEventHandler(
  notificationEvent: NotificationEventPayload
) {
  return createJsonHandlerForLegacySerlo({
    path: `/api/event/${notificationEvent.id}`,
    body: notificationEvent,
  })
}

export function createUuidHandler(uuid: UuidPayload, once?: boolean) {
  return createJsonHandlerForDatabaseLayer(
    {
      path: `/uuid/${uuid.id}`,
      body: uuid,
    },
    once
  )
}

export function createJsonHandlerForLegacySerlo(
  {
    instance = Instance.De,
    path,
    body,
  }: {
    instance?: Instance
    path: string
    body: unknown
  },
  once?: boolean
) {
  return rest.get(
    `http://${instance}.${process.env.SERLO_ORG_HOST}${path}`,
    (_req, res, ctx) => {
      return (once ? res.once : res)(
        ctx.status(200),
        ctx.json(body as Record<string, unknown>)
      )
    }
  )
}

export function createJsonHandlerForDatabaseLayer(
  {
    path,
    body,
  }: {
    path: string
    body: unknown
  },
  once?: boolean
) {
  return rest.get(
    `http://${process.env.SERLO_ORG_DATABASE_LAYER_HOST}${path}`,
    (_req, res, ctx) => {
      return (once ? res.once : res)(
        ctx.status(200),
        ctx.json(body as Record<string, unknown>)
      )
    }
  )
}

export function createSpreadsheetHandler({
  spreadsheetId,
  range,
  majorDimension,
  apiKey,
  status = 200,
  body = {},
}: {
  spreadsheetId: string
  range: string
  majorDimension: string
  apiKey: string
  status?: number
  body?: Record<string, unknown>
}) {
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}` +
    `/values/${range}?majorDimension=${majorDimension}&key=${apiKey}`
  return rest.get(url, (_req, res, ctx) =>
    res.once(ctx.status(status), ctx.json(body))
  )
}
