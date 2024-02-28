import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/firebase-context'
import { UserProvider } from './contexts/user-context'
import App from './pages/App'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <App/>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
