import React from 'react'
import ReactDOM from 'react-dom'
import { ApiProvider } from './ApiProvider'
import { App } from './App'
import './index.css'

ReactDOM.render(
  <ApiProvider>
    <App />
  </ApiProvider>,
  document.getElementById('root'),
)
