import { combineReducers } from 'redux'
import { favoritePostsNamespace, favoritePostsReducer } from './favoritePosts'
import { searchNamespace, searchReducer } from './search'

const rootReducer = combineReducers({
  [favoritePostsNamespace]: favoritePostsReducer,
  [searchNamespace]: searchReducer,
})

export default rootReducer
