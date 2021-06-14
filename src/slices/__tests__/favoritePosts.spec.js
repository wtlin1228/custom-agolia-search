import {
  favoritePostsInitialState as initialState,
  favoritePostsActions as actions,
  favoritePostsReducer as reducer,
} from '../favoritePosts'
import { generateRandomPost } from '../../tests/factories'

test('should return the initial state on first run', () => {
  // Arrange
  const nextState = initialState

  // Act
  const result = reducer(undefined, {})

  // Assert
  expect(result).toEqual(nextState)
})

test('should properly set the state when a post is saved', () => {
  // Arrange
  const post = generateRandomPost()

  // Act
  const nextState = reducer(initialState, actions.save({ post }))

  // Assert
  expect(nextState.ids).toEqual([post.id])
  expect(nextState.posts).toEqual({ [post.id]: post })
})

test('should properly set the state when a post is unsaved', () => {
  // Arrange
  const post1 = generateRandomPost()
  const post2 = generateRandomPost()

  // Act
  const nextState = reducer(
    {
      ids: [post1.id, post2.id],
      posts: { [post1.id]: post1, [post2.id]: post2 },
    },
    actions.unSave({ post: post1 })
  )

  // Assert
  expect(nextState.posts).toEqual({ [post2.id]: post2 })
  expect(nextState.ids).toEqual([post2.id])
})
