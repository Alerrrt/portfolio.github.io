import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log(
  "%cIf you're reading this, I'm actually a pretty good dev. Hire me: sajuajin8680@gmail.com",
  "background: #000; color: #0f0; font-size: 14px; padding: 10px; border-radius: 5px; font-family: monospace;"
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
