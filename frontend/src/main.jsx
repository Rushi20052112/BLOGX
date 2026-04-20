import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import { AppProvider } from './context/AppContext.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <AppProvider>
        <App />
      </AppProvider>
    </Provider>
    <Toaster position="top-center" />
  </BrowserRouter>
)