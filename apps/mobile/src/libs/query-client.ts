/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-console */
import { QueryClient, QueryClientConfig } from '@tanstack/react-query'

const queryConfig: QueryClientConfig | undefined =
  process.env.NODE_ENV !== 'test'
    ? undefined
    : {
        defaultOptions: { queries: { retry: false, cacheTime: 0 } },
        logger: {
          log: console.log,
          warn: console.warn,
          error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
        },
      }

const queryClient = new QueryClient(queryConfig)

export { queryClient }
