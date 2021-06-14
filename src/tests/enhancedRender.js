import React from 'react'
import PropTypes from 'prop-types'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { initStore } from '../utils/store'
import createReactQueryWrapper from './createReactQueryWrapper'

const AllTheProviders = ({ children, initialState = {} }) => {
  const store = initStore(initialState)
  const ReactQueryWrapper = createReactQueryWrapper()

  return (
    <Provider store={store}>
      <ReactQueryWrapper>{children}</ReactQueryWrapper>
    </Provider>
  )
}

AllTheProviders.propTypes = {
  children: PropTypes.element.isRequired,
  initialState: PropTypes.object,
}

const customRender = (ui, options = {}) => {
  const { initialState, ...others } = options
  return render(ui, {
    wrapper: ({ children }) => AllTheProviders({ children, initialState }),
    ...others,
  })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
