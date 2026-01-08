import '../App.css';
import { Provider } from '../components/ui/provider';
import { LightMode } from '../components/ui/color-mode';
import TopBar from '../sections/Topbar';
import BehindTheBuild from '@/sections/BehindTheBuild';
import Footer from '@/sections/Footer';
import CodeSection from "@/sections/Code"
import TitleCard from '@/sections/TitleCard';

const ContactPage = () => {
  return (
    <Provider>
      <LightMode>
        <TopBar />
        <TitleCard color={"#ffbe5cff"} textColor={"#336298ff"} text={"The Architecture of"} lastword={"Insight"} lastwordColour={"#62daffff"} slogan={"From CAD designs to neural networks: a look at the system's core."} />
        <BehindTheBuild />
        <CodeSection />
      </LightMode>
      <footer>
        <Footer />
      </footer>
    </Provider>
  )
};

export default ContactPage;