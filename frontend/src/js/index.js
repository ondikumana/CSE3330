import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import Main from './Main'

const app = document.getElementById('root')
ReactDOM.render(
  <HashRouter>
    <Main />
  </HashRouter>
  , app);
