import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initContract } from './utils'


//React router dom
import { BrowserRouter as Router } from 'react-router-dom'


import 'primereact/resources/themes/arya-orange/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css' //icons
import 'bootstrap/dist/css/bootstrap.css'

const container = document.querySelector('#root')
const root = createRoot(container) // createRoot(container!) if you use TypeScript

window.nearInitPromise = initContract()
  .then(() => {
    ;<App />
    root.render(
      <Router>
        <App tab="home" />
      </Router>,
    )
  })
  .catch(console.error)
