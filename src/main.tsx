import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router';

import { Home } from './pages/home/index';

import './globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <ReactRoutes>
            <Route path='/' element={<Home />} />
        </ReactRoutes>
    </BrowserRouter>
  </React.StrictMode>,
)
