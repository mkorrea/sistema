import './global.css'

import { RoutesApp } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/auth'

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
         <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  )
}
