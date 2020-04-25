import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApiProvider } from './ApiProvider'
import { Grid } from './Grid'
import { ModalContent } from './ModalContent'
import './index.css'

ReactDOM.render(
  <Router>
    <ApiProvider>
    <Switch>
      <Route exact path="/">
          <Grid />
      </Route>
      <Route exact path="/:date/:id">
          <ModalContent />
      </Route>
    </Switch>
    </ApiProvider>
  </Router>,
  document.getElementById('root'),
)
