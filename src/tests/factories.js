import { nanoid } from 'nanoid'

export const generateRandomPost = ({
  id = nanoid(),
  title = `Fake title for post ${id}`,
  authorName = `Fake name for post ${id}`,
  categories = [
    `fake category 1 for post ${id}`,
    `fake category 2 for post ${id}`,
  ],
} = {}) => ({
  id,
  title,
  authorName,
  categories,
})
