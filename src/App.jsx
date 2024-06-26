import './global.css'

import { RoutesApp } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/auth'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
         <ToastContainer autoClose={3000} />
         <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  )
}
