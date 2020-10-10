import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApiProvider } from './ApiProvider'
import { App } from './App'
import { Homepage } from './Homepage'
import { Picture } from './Picture'
import './index.css'

ReactDOM.render(
  <Router>
    <ApiProvider>
      <App>
        <Switch>
          <Route path={['/', '/astronomy-picture-of-the-day']} exact sensitive>
            <Homepage />
          </Route>
          <Route path="/:date/:id" exact>
            <Picture />
          </Route>
        </Switch>
      </App>
    </ApiProvider>
  </Router>,
  document.getElementById('root'),
)
