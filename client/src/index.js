import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './AppRouter';
import { Login } from './Login';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
