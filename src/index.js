import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/style.scss';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import ColorProvider from './providers/ColorProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ColorProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </ColorProvider>
);
