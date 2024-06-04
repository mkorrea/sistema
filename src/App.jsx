import './global.css'

import { RoutesApp } from './routes'

import { BrowserRouter } from 'react-router-dom'

export function App() {
  return (
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  )
}
