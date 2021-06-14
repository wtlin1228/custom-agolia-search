import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { algoliasearchEndpoints } from '../../utils/search'
import server from '../../tests/mswServer'
import { render, screen, waitFor } from '../../tests/enhancedRender'
import { generateRandomPost } from '../../tests/factories'
import Search, { SearchResult } from '../Search'

test('SearchResult should be rendered correctly with isError = true', () => {
  // Arrange
  render(<SearchResult isLoading={false} isError={true} />)

  // Act

  // Assert
  expect(
    screen.queryByText('Something went wrong for the search API Q__Q')
  ).toBeInTheDocument()
})

test('SearchResult should be rendered correctly with isLoading = true', () => {
  // Arrange

  render(<SearchResult isLoading={true} isError={false} />)

  // Act

  // Assert
  expect(screen.queryByText('Loading...')).toBeInTheDocument()
})

test('SearchResult should be rendered correctly with search result', () => {
  // Arrange
  const posts = Array.from({ length: 10 }, generateRandomPost)

  render(
    <SearchResult data={{ hits: posts }} isLoading={false} isError={false} />
  )

  // Act

  // Assert
  posts.forEach((post) => {
    expect(screen.queryByText(post.title)).toBeInTheDocument()
    expect(screen.queryByText(post.authorName)).toBeInTheDocument()
    post.categories.forEach((category) =>
      expect(screen.queryByText(category)).toBeInTheDocument()
    )
  })
})

test('Search should be rendered correctly when request is ok', async () => {
  // Arrange
  const posts = Array.from({ length: 10 }, generateRandomPost)

  server.use(
    ...algoliasearchEndpoints.map((endpoint) =>
      rest.post(endpoint, (_req, res, ctx) => {
        return res(
          ctx.json({
            hits: posts,
          })
        )
      })
    )
  )

  render(
    <MemoryRouter initialEntries={['/search']}>
      <Search data={{ hits: posts }} />
    </MemoryRouter>
  )

  // Act
  userEvent.type(screen.getByTestId('search-input'), 'some keyword')

  // Assert
  await waitFor(() =>
    expect(screen.queryByText('Loading...')).toBeInTheDocument()
  )
  await waitFor(() =>
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  )

  posts.forEach((post) => {
    expect(screen.queryByText(post.title)).toBeInTheDocument()
    expect(screen.queryByText(post.authorName)).toBeInTheDocument()
    post.categories.forEach((category) =>
      expect(screen.queryByText(category)).toBeInTheDocument()
    )
  })
})
