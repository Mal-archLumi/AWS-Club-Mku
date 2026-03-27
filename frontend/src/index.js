import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Initialize EmailJS (replace with your actual public key)
import emailjs from '@emailjs/browser';
emailjs.init('DiIq_Jyufw19_CGfy'); // Replace with your actual public key

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);