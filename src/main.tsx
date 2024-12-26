import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify';
import AuthContextProvider from './Context/Context.tsx';
import './i18n.ts'

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