import './App.css';
import React, { Suspense } from 'react';
import { Provider } from './components/ui/provider';
import { LightMode } from './components/ui/color-mode';
import Starter from './sections/Starter';
import LookingAhead from './sections/LookingAhead';
import TopBar from './sections/Topbar';
import TimelineSection from './sections/Timeline';
import Footer from './sections/Footer';
import Demonstration from './sections/Demonstration';
import BusinessPlan from './sections/BusinessPlan';
import BuiltForYou from './sections/BuiltForYou';
import ChallengeSection from './sections/ChallengeSection';
import PrivacySection from './sections/Privacy';

function App() {
  return (
    <Provider>
      <LightMode>
        <div id='body' style={{ cursor: "default", backgroundColor: "#061529", color: "#F5F5F7" }}>
          <TopBar />
          <Suspense fallback={<div style={{ height: '100vh', background: '#061529' }} />}>
            <Starter />
          </Suspense>

          {/* Main content flow with rich ambient transitions */}
          <div id="mainContent">
            <ChallengeSection />
            <Demonstration />
            <BusinessPlan />
            <BuiltForYou />
            <PrivacySection />
            <TimelineSection />
            <LookingAhead />
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </LightMode>
    </Provider>
  )
}

export default App;