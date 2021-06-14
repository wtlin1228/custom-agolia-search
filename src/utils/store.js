import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../slices'

export const initStore = (initialState) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [],
    preloadedState: initialState,
    enhancers: [],
  })

  return store
}
