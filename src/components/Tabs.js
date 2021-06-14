import { useRouteMatch, Link } from 'react-router-dom'
import styled from 'styled-components'

const Ul = styled.ul`
  padding-top: 24px;
  padding-left: 20px;

  background-color: lightgray;
`

const Li = styled.li`
  display: inline-flex;

  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  padding: 6px 12px;
  :not(:last-child) {
    margin-right: 24px;
  }

  background-color: ${(props) => (props.isActive ? 'white' : 'transparent')};

  a {
    text-decoration: none;
    color: ${(props) => (props.isActive ? '#555555' : '#777777')};
  }
`

export const TabContent = styled.div`
  padding: 16px 24px;
`

export default function Tabs() {
  const isSearch = useRouteMatch('/search')
  const isFavorite = useRouteMatch('/favorite')

  return (
    <nav>
      <Ul>
        <Li isActive={isSearch}>
          <Link to="/search">Search</Link>
        </Li>
        <Li isActive={isFavorite}>
          <Link to="/favorite">Favorite</Link>
        </Li>
      </Ul>
    </nav>
  )
}
