import '../App.css';

import { Provider } from '../components/ui/provider';
import { LightMode } from '../components/ui/color-mode';
import TopBar from '../sections/Topbar';
import Team from '@/sections/OurTeam';
import Footer from '@/sections/Footer';
import TitleCard from '@/sections/TitleCard';

const TeamPage = () => {

  return (
    <Provider>
      <LightMode>
        <div id='body' style={{ cursor: "default" }}>
          <TopBar />
          <TitleCard
            text={"The Heart of"}
            lastword={"Light Care"}
            slogan={"Dedicated to making non-diagnostic wellness sensing accessible, simple, and private."}
          />

          <div id="mainContent">
            <Team />
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </LightMode>
    </Provider>
  )
};

export default TeamPage;
