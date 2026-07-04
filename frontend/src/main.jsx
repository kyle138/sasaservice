import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import '@fontsource/vt323';

const container = document.getElementById('root');

if(!container) {
  throw new Error("Failed to find root element.");
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
