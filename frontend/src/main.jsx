import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './context/context.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <GlobalProvider>
        <App />
        <Toaster />
      </GlobalProvider>
    </StrictMode>
  </BrowserRouter>
);
