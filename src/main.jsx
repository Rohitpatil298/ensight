import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import App from './app/App.jsx'
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from '../theme.js'
import 'cropperjs/dist/cropper.css';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </ThemeProvider>
  </>
)
