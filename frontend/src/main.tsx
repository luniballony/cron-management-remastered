import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App'
import AppRouter from './router/AppRouter'

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <AppRouter />
  </>    
)