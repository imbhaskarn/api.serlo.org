import dotenv from 'dotenv'
import createApp from 'express'
import path from 'path'

import { createCache } from './cache'
import { initializeSentry } from './sentry'
import { createSwrQueueWorker } from './swr-queue'
import { createTimer } from './timer'

export async function start() {
  dotenv.config({
    path: path.join(__dirname, '..', '..', '..', '.env'),
  })
  initializeSentry({ context: 'swr-queue-worker' })
  const timer = createTimer()
  const cache = createCache({ timer })
  const swrQueueWorker = createSwrQueueWorker({
    cache,
    timer,
    concurrency: parseInt(process.env.SWR_QUEUE_WORKER_CONCURRENCY, 10),
  })
  await swrQueueWorker.ready()

  const app = createApp()
  app.get('/.well-known/health', (_req, res) => {
    swrQueueWorker
      .healthy()
      .then(() => {
        res.sendStatus(200)
      })
      .catch(() => {
        res.sendStatus(503)
      })
  })
  app.listen({ port: 3000 }, () => {
    // eslint-disable-next-line no-console
    console.log('🚀 SWR Queue Worker ready')
  })

  await initCheckStalledJobsRegularly(swrQueueWorker)
}

async function initCheckStalledJobsRegularly(
  swrQueueWorker: ReturnType<typeof createSwrQueueWorker>,
) {
  const delayFromEnv = parseInt(process.env.CHECK_STALLED_JOBS_DELAY)
  const delay = Number.isNaN(delayFromEnv) ? 60 * 60 * 1000 : delayFromEnv

  await swrQueueWorker.checkStalledJobs(delay)
}
