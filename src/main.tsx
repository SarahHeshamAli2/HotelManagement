import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthContextProvider from './Context/AuthContext.tsx'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <AuthContextProvider>
    <App />
    <ToastContainer autoClose={2000}
  //  position='top-center'
     />
    </AuthContextProvider>
  </StrictMode>,
)
