import '../App.css';

import { Provider } from '../components/ui/provider';
import { LightMode } from '../components/ui/color-mode';
import TopBar from '../sections/Topbar';
import Team from '@/sections/OurTeam';
import Footer from '@/sections/Footer';

const TeamPage = () => {

  return (
    <Provider>
      <LightMode>
        <TopBar />
        <Team />
      </LightMode>
      <footer>
        <Footer />
      </footer>
    </Provider>
  )
};

export default TeamPage;