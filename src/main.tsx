import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { PWAProvider } from './context/PWAContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PWAProvider>
      <App />
    </PWAProvider>
  </StrictMode>,
);
