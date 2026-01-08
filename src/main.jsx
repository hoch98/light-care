import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from 'react-dom/client'
import ScrollToTop from './components/ScrollToTop.jsx';

// Use lazy loading for the main pages
const App = lazy(() => import('./App.jsx'));
const Technology = lazy(() => import('./pages/TechnologyPage.jsx'));
const Team = lazy(() => import('./pages/TeamPage.jsx'));
const Contact = lazy(() => import('./pages/ContactPage.jsx'));
const Build = lazy(() => import('./pages/BuildPage.jsx'));
const Finance = lazy(() => import('./pages/FinancePage.jsx'));

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Suspense fallback={<div style={{ background: '#ffffffff', height: '100vh' }} />}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/team" element={<Team />} />
        <Route path="/design" element={<Build />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/finance" element={<Finance />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);