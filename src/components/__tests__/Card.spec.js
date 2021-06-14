import userEvent from '@testing-library/user-event'
import { render, screen } from '../../tests/enhancedRender'
import { generateRandomPost } from '../../tests/factories'
import Card from '../Card'

test('should be rendered correctly with the provided props', () => {
  // Arrange
  const post = generateRandomPost()
  render(
    <Card
      id={post.id}
      title={post.title}
      authorName={post.authorName}
      categories={post.categories}
      isSaved={false}
      handlePostSave={() => {}}
      handlePostUnSave={() => {}}
    />
  )

  // Act

  // Assert
  expect(screen.queryByText(post.title)).toBeInTheDocument()
  expect(screen.queryByText(post.authorName)).toBeInTheDocument()
  post.categories.forEach((category) =>
    expect(screen.queryByText(category)).toBeInTheDocument()
  )
  expect(screen.queryByTestId('card-saved-label')).not.toBeInTheDocument()
})

test('should show saved label when card is saved', () => {
  // Arrange
  const post = generateRandomPost()
  render(
    <Card
      id={post.id}
      title={post.title}
      authorName={post.authorName}
      categories={post.categories}
      isSaved={true}
      handlePostSave={() => {}}
      handlePostUnSave={() => {}}
    />
  )

  // Act

  // Assert
  expect(screen.queryByTestId('card-saved-label')).toBeInTheDocument()
})

test('should show save button when card is in hover', () => {
  // Arrange
  const post = generateRandomPost()
  render(
    <Card
      id={post.id}
      title={post.title}
      authorName={post.authorName}
      categories={post.categories}
      isSaved={false}
      handlePostSave={() => {}}
      handlePostUnSave={() => {}}
    />
  )

  // Act
  userEvent.hover(screen.getByText(post.title))

  // Assert
  expect(screen.queryByText('Save')).toBeInTheDocument()
  expect(screen.queryByText('Unsave')).not.toBeInTheDocument()
})

test('should show unsave button when card is in hover', () => {
  // Arrange
  const post = generateRandomPost()
  render(
    <Card
      id={post.id}
      title={post.title}
      authorName={post.authorName}
      categories={post.categories}
      isSaved={true}
      handlePostSave={() => {}}
      handlePostUnSave={() => {}}
    />
  )

  // Act
  userEvent.hover(screen.getByText(post.title))

  // Assert
  expect(screen.queryByText('Unsave')).toBeInTheDocument()
  expect(screen.queryByText('Save')).not.toBeInTheDocument()
})

test('should trigger handler when save button is clicked', () => {
  // Arrange
  const post = generateRandomPost()
  const handlePostSave = jest.fn()
  render(
    <Card
      id={post.id}
      title={post.title}
      authorName={post.authorName}
      categories={post.categories}
      isSaved={false}
      handlePostSave={handlePostSave}
      handlePostUnSave={() => {}}
    />
  )

  // Act
  userEvent.hover(screen.getByText(post.title))
  userEvent.click(screen.getByText('Save'))

  // Assert
  expect(handlePostSave).toBeCalledTimes(1)
  expect(handlePostSave).toBeCalledWith(post)
})

test('should trigger handler when unsave button is clicked', () => {
  // Arrange
  const post = generateRandomPost()
  const handlePostUnSave = jest.fn()
  render(
    <Card
      id={post.id}
      title={post.title}
      authorName={post.authorName}
      categories={post.categories}
      isSaved={true}
      handlePostSave={() => {}}
      handlePostUnSave={handlePostUnSave}
    />
  )

  // Act
  userEvent.hover(screen.getByText(post.title))
  userEvent.click(screen.getByText('Unsave'))

  // Assert
  expect(handlePostUnSave).toBeCalledTimes(1)
  expect(handlePostUnSave).toBeCalledWith(post)
})
