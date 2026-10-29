import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router';

import { Home } from './pages/Home';
import { PostPage } from './pages/Post/index'

import './globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <ReactRoutes>
            <Route path='/' element={<Home />} />
            <Route path='/post' element={<PostPage />} />
        </ReactRoutes>
    </BrowserRouter>
  </React.StrictMode>,
)
