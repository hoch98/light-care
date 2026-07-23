import '../App.css';
import { Provider } from '../components/ui/provider';
import { LightMode } from '../components/ui/color-mode';
import TopBar from '../sections/Topbar';
import BehindTheBuild from '@/sections/BehindTheBuild';
import Footer from '@/sections/Footer';
import CodeSection from "@/sections/Code"
import TitleCard from '@/sections/TitleCard';

const BuildPage = () => {
  return (
    <Provider>
      <LightMode>
        <div id='body' style={{ cursor: "default" }}>
          <TopBar />
          <TitleCard
            text={"The Architecture of"}
            lastword={"Insight"}
            slogan={"From CAD designs to neural networks: a look at the system's core."}
          />

          <div id="mainContent">
            <BehindTheBuild />
            <CodeSection />
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </LightMode>
    </Provider>
  )
};

export default BuildPage;
