import './App.css';
import React, { Suspense, lazy } from 'react';
import { Provider } from './components/ui/provider';
import { LightMode } from './components/ui/color-mode';
import LightCare from './sections/LightCare';
const Starter = lazy(() => import('./sections/Starter'));
import LookingAhead from './sections/LookingAhead';
import TopBar from './sections/Topbar';
import { Box } from '@chakra-ui/react';
import Footer from './sections/Footer';

const SectionSeparator = () => (
  <Box 
    w="100%" 
    h="100px"
    bg="white" 
    opacity="1"  
    position="relative" 
    zIndex="10"  
    shadow="sm" 
  />
);

function App() {

  return (
    <Provider>
      <LightMode>
        <div id='body' style={{ cursor: "default" }}>
          <TopBar />
          <Suspense fallback={<div style={{ height: '100vh', background: 'white' }} />}>
            <Starter />
          </Suspense>
          <SectionSeparator />
          <LightCare />
          <LookingAhead />
        </div>
        <footer>
          <Footer />
        </footer>
      </LightMode>
    </Provider>
  )
}


export default App
