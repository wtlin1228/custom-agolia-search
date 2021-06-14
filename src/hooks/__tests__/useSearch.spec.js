import { renderHook } from '@testing-library/react-hooks'
import { rest } from 'msw'
import { algoliasearchEndpoints } from '../../utils/search'
import server from '../../tests/mswServer'
import createReactQueryWrapper from '../../tests/createReactQueryWrapper'
import { generateRandomPost } from '../../tests/factories'
import useSearch from '../useSearch'

test('should get search result', async () => {
  server.use(
    ...algoliasearchEndpoints.map((endpoint) =>
      rest.post(endpoint, (_req, res, ctx) => {
        return res(
          ctx.json({
            hits: Array.from({ length: 10 }, generateRandomPost),
          })
        )
      })
    )
  )

  const { result, waitFor } = renderHook(() => useSearch('some keyword'), {
    wrapper: createReactQueryWrapper(),
  })

  await waitFor(() => result.current.isSuccess)

  expect(result.current.data.hits.length).toEqual(10)
})

test('should get error when algolia api failed', async () => {
  server.use(
    ...algoliasearchEndpoints.map((endpoint) =>
      rest.post(endpoint, (_req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
  )

  const { result, waitFor } = renderHook(() => useSearch('some keyword'), {
    wrapper: createReactQueryWrapper(),
  })

  await waitFor(() => result.current.isError)

  expect(result.current.error).toBeDefined()
})
