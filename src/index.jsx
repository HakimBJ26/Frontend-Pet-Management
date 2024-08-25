import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext';

const firebaseMessagingSW = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      if (!registration.active) {
        registration.register('/firebase-messaging-sw.js')
          .then(reg => {
            console.log('Service Worker registered with scope:', reg.scope);
          })
          .catch(err => {
            console.error('Service Worker registration failed:', err);
          });
      }
    });
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

serviceWorkerRegistration.unregister();
firebaseMessagingSW(); 

reportWebVitals();
