import '../App.css';
import { Provider } from '../components/ui/provider';
import { LightMode } from '../components/ui/color-mode';
import TopBar from '../sections/Topbar';
import ContactSection from '@/sections/ContactSection';
import Footer from '@/sections/Footer';

const ContactPage = () => {
  return (
    <Provider>
      <LightMode>
        <TopBar />
        <ContactSection />
      </LightMode>
      <footer>
        <Footer />
      </footer>
    </Provider>
  )
};

export default ContactPage;