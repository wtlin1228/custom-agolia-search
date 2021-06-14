import {
  searchInitialState as initialState,
  searchActions as actions,
  searchReducer as reducer,
} from '../search'

test('should return the initial state on first run', () => {
  // Arrange
  const nextState = initialState

  // Act
  const result = reducer(undefined, {})

  // Assert
  expect(result).toEqual(nextState)
})

test('should properly set the state when a keyword is set', () => {
  // Arrange
  const keyword = 'fake keyword'

  // Act
  const nextState = reducer(initialState, actions.setKeyword({ keyword }))

  // Assert
  expect(nextState.keyword).toEqual(keyword)
})
