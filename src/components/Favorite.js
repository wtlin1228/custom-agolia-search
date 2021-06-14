import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  favoritePostsNamespace,
  favoritePostsActions,
} from '../slices/favoritePosts'
import Tabs, { TabContent } from './Tabs'
import Card from './Card'

export const CardContainer = ({ postId }) => {
  const dispatch = useDispatch()
  const post = useSelector(
    (state) => state[favoritePostsNamespace].posts[postId]
  )

  if (!post) {
    return null
  }

  return (
    <Card
      id={postId}
      title={post.title}
      authorName={post.authorName}
      categories={post.categories}
      isSaved={true}
      handlePostSave={(post) => dispatch(favoritePostsActions.save({ post }))}
      handlePostUnSave={(post) =>
        dispatch(favoritePostsActions.unSave({ post }))
      }
    />
  )
}

CardContainer.propTypes = {
  postId: PropTypes.string.isRequired,
}

export default function Favorite() {
  const savedIds = useSelector((state) => state[favoritePostsNamespace].ids)

  return (
    <div>
      <Tabs />
      <TabContent>
        {savedIds.map((id) => (
          <CardContainer key={id} postId={id} />
        ))}
      </TabContent>
    </div>
  )
}
