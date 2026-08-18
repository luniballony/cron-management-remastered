import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <div className='font-playfair'>
    <App />
  </div>    
)