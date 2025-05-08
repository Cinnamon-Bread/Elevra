import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HabitContextProvider } from './context/habitcontext.jsx'
import { AuthContextProvider } from './context/authcontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <HabitContextProvider>
        <App />
      </HabitContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
