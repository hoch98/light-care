import '../App.css';
import { Provider } from '../components/ui/provider';
import { LightMode } from '../components/ui/color-mode';
import TopBar from '../sections/Topbar';
import ContactSection from '@/sections/ContactSection';
import Footer from '@/sections/Footer';
import TitleCard from '@/sections/TitleCard';

const ContactPage = () => {
  return (
    <Provider>
      <LightMode>
        <div id='body' style={{ cursor: "default" }}>
          <TopBar />
          <TitleCard
            text={"Let's"}
            lastword={"Connect"}
            slogan={"We'd love to hear from you — reach out anytime."}
            ctaText={"Reach Us"}
          />

          <div id="mainContent">
            <ContactSection />
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </LightMode>
    </Provider>
  )
};

export default ContactPage;
