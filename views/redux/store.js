import { createStore, applyMiddleware, compose } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'

import reducer from './reducer'

const _routerMiddleware = routerMiddleware(browserHistory)

const store = createStore(
  reducer, compose(
    applyMiddleware(_routerMiddleware),
    process.env.NODE_ENV === 'development' && window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store
