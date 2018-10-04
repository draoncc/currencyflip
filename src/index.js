import { render } from 'inferno'
import { BrowserRouter, Route } from 'inferno-router'
import { Provider } from 'inferno-redux'

import './index.css'
import './material'
import App from './App'
import { store } from './store'

render((
  <Provider store={store}>
    <BrowserRouter>
      <Route exact path='/' component={App} />
    </BrowserRouter>
  </Provider>
), document.getElementById('app'))
