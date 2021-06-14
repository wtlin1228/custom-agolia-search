import { createSlice } from '@reduxjs/toolkit'

export const favoritePostsNamespace = 'favoritePosts'

/**
 * @typedef {Object} Post
 * @property {string} id
 * @property {string} title
 * @property {string} authorName
 * @property {string[]} categories
 */

export const favoritePostsInitialState = {
  /** @type {string[]} */ ids: [],
  /** @type {Object.<string, Post>} */ posts: {},
}

const favoritePostsSlice = createSlice({
  name: favoritePostsNamespace,
  initialState: favoritePostsInitialState,
  reducers: {
    save: (state, action) => {
      const newPost = action.payload.post

      state.ids = [...state.ids, newPost.id]
      state.posts[newPost.id] = newPost
    },
    unSave: (state, action) => {
      const postId = action.payload.post.id

      state.ids = state.ids.filter((id) => id !== postId)
      state.posts[postId] = undefined
    },
  },
})

export const favoritePostsActions = favoritePostsSlice.actions
export const favoritePostsReducer = favoritePostsSlice.reducer
