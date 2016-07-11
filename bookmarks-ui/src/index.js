import 'babel-polyfill'

// Sync "window.location" with "routing" object in store so that
// reducers can access route params without a window DOM reference
import configureStore from './store/configureStore.dev'
import { useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
import { syncHistory, syncHistoryWithStore } from 'react-router-redux'

const store = configureStore(window.__INITIAL_STATE__)

const history = syncHistoryWithStore(useRouterHistory(createHashHistory)({ queryKey: false }), store);

// Render the app
import React from 'react'
import { render } from 'react-dom'
import App from './app/App'

render(<App store={store} history={history}/>, document.getElementById('root'))
