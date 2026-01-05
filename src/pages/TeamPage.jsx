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
        <TopBar />
        <TitleCard color={"#336298ff"} textColor={"white"} text={"The Heart of"} lastword={"Light Care"} lastwordColour={"#FFBE5C"} slogan={"Dedicated to making non-diagnostic wellness sensing accessible, simple, and private."}/>
        <Team />
      </LightMode>
      <footer>
        <Footer />
      </footer>
    </Provider>
  )
};

export default TeamPage;