import '../App.css';
import { Provider } from '../components/ui/provider';
import { LightMode } from '../components/ui/color-mode';
import TopBar from '../sections/Topbar';
import Technology from '@/sections/Technology';
import Research from '@/sections/Research';
import Footer from '@/sections/Footer';
import TitleCard from '@/sections/TitleCard';

const Technologies = () => {

  return (
    <Provider>
      <LightMode>
        <div id='body' style={{ cursor: "default" }}>
          <TopBar />
          <TitleCard
            text={"Behind the"}
            lastword={"Mirror"}
            slogan={"The technology that quietly turns everyday moments into wellness insights."}
          />

          <div id="mainContent">
            <Technology />
            <Research />
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </LightMode>
    </Provider>
  )
};

export default Technologies;
