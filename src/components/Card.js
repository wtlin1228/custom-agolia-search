import * as React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Root = styled.article`
  display: flex;
  justify-content: space-between;

  padding-bottom: 16px;
  border-bottom: 1px solid lightgray;
  margin-top: 16px;
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Right = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.h2`
  font-size: 20px;
  line-height: 24px;
`

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16.5px;
`

const Author = styled.p`
  font-size: 16px;
  color: #777777;
`

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 4px;
`

const Category = styled.span`
  padding: 3px 6px;
  border-radius: 2px;
  :not(:last-child) {
    margin-right: 6px;
  }

  background-color: #eeeeee;
  color: #666666;
`

const Action = styled.button`
  padding: 4px 6px;
  border: 1px solid;

  background-color: white;
  border-radius: 3px;
  cursor: pointer;

  font-size: 17px;
`

const SavedLabel = styled.span`
  padding: 4px 8px;

  background-color: lightgray;
  color: white;
`

export default function Card({
  id,
  title,
  authorName,
  categories,
  isSaved,
  handlePostSave,
  handlePostUnSave,
}) {
  const [isInHover, setIsInHover] = React.useState(false)
  const showSaveButton = !isSaved && isInHover
  const showUnSaveButton = isSaved && isInHover
  const showSavedLabel = isSaved && !isInHover
  const post = { id, title, authorName, categories }

  return (
    <Root
      onMouseEnter={() => setIsInHover(true)}
      onMouseLeave={() => setIsInHover(false)}
    >
      <Left>
        <Title>{title}</Title>
        <Content>
          <Author>{authorName}</Author>
          <Categories>
            {categories.map((category) => (
              <Category key={category}>{category}</Category>
            ))}
          </Categories>
        </Content>
      </Left>
      <Right>
        {showSaveButton && (
          <Action onClick={() => handlePostSave(post)}>Save</Action>
        )}
        {showUnSaveButton && (
          <Action onClick={() => handlePostUnSave(post)}>Unsave</Action>
        )}
        {showSavedLabel && (
          <SavedLabel data-testid="card-saved-label">Saved</SavedLabel>
        )}
      </Right>
    </Root>
  )
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  isSaved: PropTypes.bool.isRequired,
  handlePostSave: PropTypes.func.isRequired,
  handlePostUnSave: PropTypes.func.isRequired,
}
