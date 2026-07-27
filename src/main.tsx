import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { AppProviders } from './app/providers/AppProviders';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No se encontró el elemento root.');
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);