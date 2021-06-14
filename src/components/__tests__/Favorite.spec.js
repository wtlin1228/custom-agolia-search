import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '../../tests/enhancedRender'
import { generateRandomPost } from '../../tests/factories'
import Favorite, { CardContainer } from '../Favorite'
import { favoritePostsNamespace } from '../../slices/favoritePosts'

test('Favorite should be rendered correctly with the provided props', () => {
  // Arrange
  const mockPosts = Array.from({ length: 10 }, generateRandomPost)

  const ids = mockPosts.map(({ id }) => id)
  const posts = {}
  mockPosts.forEach((post) => {
    posts[post.id] = post
  })

  const options = {
    initialState: {
      [favoritePostsNamespace]: {
        ids,
        posts,
      },
    },
  }

  render(
    <MemoryRouter initialEntries={['/favorite']}>
      <Favorite />
    </MemoryRouter>,
    options
  )

  // Act

  // Assert
  mockPosts.forEach((post) => {
    expect(screen.queryByText(post.title)).toBeInTheDocument()
    expect(screen.queryByText(post.authorName)).toBeInTheDocument()
    post.categories.forEach((category) =>
      expect(screen.queryByText(category)).toBeInTheDocument()
    )
  })
})

test('CardContainer should be rendered correctly with the provided props', () => {
  // Arrange
  const mockPosts = Array.from({ length: 10 }, generateRandomPost)

  const ids = mockPosts.map(({ id }) => id)
  const posts = {}
  mockPosts.forEach((post) => {
    posts[post.id] = post
  })

  const options = {
    initialState: {
      [favoritePostsNamespace]: {
        ids,
        posts,
      },
    },
  }

  render(
    <MemoryRouter initialEntries={['/favorite']}>
      <CardContainer postId={mockPosts[5].id} />
    </MemoryRouter>,
    options
  )

  // Act

  // Assert

  expect(screen.queryByText(mockPosts[5].title)).toBeInTheDocument()
  expect(screen.queryByText(mockPosts[5].authorName)).toBeInTheDocument()
  mockPosts[5].categories.forEach((category) =>
    expect(screen.queryByText(category)).toBeInTheDocument()
  )
})
