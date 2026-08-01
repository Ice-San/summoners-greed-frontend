import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router';

import { Home } from './pages/Home';
import { SignInPage } from './pages/signin/index';

import './globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <ReactRoutes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<SignInPage />} />
        </ReactRoutes>
    </BrowserRouter>
  </React.StrictMode>,
)
