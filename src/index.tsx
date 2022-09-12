import React from 'react'

import ReactDOM from 'react-dom/client'

import 'services/i18n'

import 'bootstrap/dist/css/bootstrap.min.css'

import { PontosProvider } from 'context/PontosContext'

import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PontosProvider>
      <App />
    </PontosProvider>
  </React.StrictMode>,
)
