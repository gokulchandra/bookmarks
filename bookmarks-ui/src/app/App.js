import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import {Provider} from 'react-redux'
import HomePage from 'pages/HomePage'
import FolderPage from 'pages/FolderPage'
import * as actions from 'actions'

export default class App extends React.Component {

  componentWillMount() {
    this.props.store.dispatch(actions.loadApp())
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history}>
          <Route path='/'>
            <IndexRoute component={HomePage} />
            <Route path='folder' component={FolderPage} />
          </Route>
        </Router>
      </Provider>
    )
  }
}

App.propTypes = {
  history: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired
}
