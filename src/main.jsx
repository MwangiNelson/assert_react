import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './screens/App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { AppProvider } from './Contexts/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <AppProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppProvider>,
)
