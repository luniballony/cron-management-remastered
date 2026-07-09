import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App'
import AppRouter from './router/AppRouter'
import Footer from './components/Footer'

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <AppRouter />
    <Footer />
  </>    
)