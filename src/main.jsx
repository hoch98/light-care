import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from 'react-dom/client'

// Use lazy loading for the main pages
const App = lazy(() => import('./App.jsx'));
const Technologies = lazy(() => import('./pages/TechnologiesPage.jsx'));
const Team = lazy(() => import('./pages/TeamPage.jsx'));
const Contact = lazy(() => import('./pages/ContactPage.jsx'));

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Suspense fallback={<div style={{ background: '#ffffffff', height: '100vh' }} />}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/technologies" element={<Technologies />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);