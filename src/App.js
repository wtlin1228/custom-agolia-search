import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { ResetStyle } from './styles/globalStyle'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { initStore } from './utils/store'
import Search from './components/Search'
import Favorite from './components/Favorite'

const store = initStore()
const queryClient = new QueryClient()

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <ResetStyle />
        <Router>
          <Switch>
            <Route path="/" exact>
              <Link to="/search" style={{ fontSize: '30px' }}>
                Start your Search 🚀
              </Link>
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/favorite">
              <Favorite />
            </Route>
          </Switch>
        </Router>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
