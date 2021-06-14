import { createSlice } from '@reduxjs/toolkit'

export const searchNamespace = 'search'

export const searchInitialState = {
  /** @type {string} */ keyword: '',
}

const searchSlice = createSlice({
  name: searchNamespace,
  initialState: searchInitialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload.keyword
    },
  },
})

export const searchActions = searchSlice.actions
export const searchReducer = searchSlice.reducer
