import * as React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { fromEvent } from 'rxjs'
import { debounceTime, map } from 'rxjs/operators'
import {
  favoritePostsNamespace,
  favoritePostsActions,
} from '../slices/favoritePosts'
import { searchNamespace, searchActions } from '../slices/search'
import useSearch from '../hooks/useSearch'
import Tabs, { TabContent } from './Tabs'
import Card from './Card'

const Input = styled.input`
  border: 1px solid #cccccc;
  padding: 6px 10px;
`

export const SearchResult = ({ data, isLoading, isError }) => {
  const savedIds = useSelector((state) => state[favoritePostsNamespace].ids)
  const dispatch = useDispatch()

  if (isLoading) {
    return 'Loading...'
  }

  if (isError) {
    return 'Something went wrong for the search API Q__Q'
  }

  return (
    <div>
      {data?.hits.length === 0
        ? 'No result'
        : data?.hits.map(({ id, title, authorName, categories }) => (
            <Card
              key={`post-card-${id}`}
              id={String(id)}
              title={title}
              authorName={authorName}
              categories={categories}
              isSaved={savedIds.includes(String(id))}
              handlePostSave={(post) =>
                dispatch(favoritePostsActions.save({ post }))
              }
              handlePostUnSave={(post) =>
                dispatch(favoritePostsActions.unSave({ post }))
              }
            />
          ))}
    </div>
  )
}

SearchResult.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
}

export default function Search() {
  const keyword = useSelector((state) => state[searchNamespace].keyword)
  const dispatch = useDispatch()
  const { data, isLoading, isError } = useSearch(keyword)
  const [inputValue, setInputValue] = React.useState(keyword)
  const inputRef = React.useRef(null)

  React.useEffect(() => {
    const keyword$ = fromEvent(inputRef.current, 'keyup').pipe(
      debounceTime(250),
      map((e) => e.target.value)
    )

    const subscription = keyword$.subscribe((keyword) =>
      dispatch(searchActions.setKeyword({ keyword }))
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [inputRef, dispatch])

  return (
    <div>
      <Tabs />
      <TabContent>
        <Input
          data-testid="search-input"
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <SearchResult data={data} isLoading={isLoading} isError={isError} />
      </TabContent>
    </div>
  )
}
