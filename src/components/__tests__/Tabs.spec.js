import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '../../tests/enhancedRender'
import Tabs from '../Tabs'

test('should be rendered correctly', () => {
  // Arrange
  render(
    <MemoryRouter initialEntries={['/search']}>
      <Tabs />
    </MemoryRouter>
  )

  // Act

  // Assert
  expect(screen.queryByText('Search')).toBeInTheDocument()
  expect(screen.queryByText('Search')).toHaveStyle(`color: #555555`)
  expect(screen.queryByText('Favorite')).toBeInTheDocument()
  expect(screen.queryByText('Favorite')).toHaveStyle(`color: #777777`)
})

test('should change to favorite tab when Favorite Tab is clicked', () => {
  // Arrange
  render(
    <MemoryRouter initialEntries={['/search']}>
      <Tabs />
    </MemoryRouter>
  )

  // Act
  userEvent.click(screen.getByText('Favorite'))

  // Assert
  expect(screen.queryByText('Search')).toHaveStyle(`color: #777777`)
  expect(screen.queryByText('Favorite')).toHaveStyle(`color: #555555`)
})
