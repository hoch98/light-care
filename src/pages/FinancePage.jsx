import '../App.css';
import { Provider } from '../components/ui/provider';
import { LightMode } from '../components/ui/color-mode';
import TopBar from '../sections/Topbar';
import Footer from '@/sections/Footer';
import FinanceSection from '@/sections/FinanceSection';
import TitleCard from '@/sections/TitleCard';
import RevenueProjections from '@/sections/ProjectionsSection';

const FinancePage = () => {
  return (
    <Provider>
      <LightMode>
        <div id='body' style={{ cursor: "default" }}>
          <TopBar />
          <TitleCard
            text={"The Engine of"}
            lastword={"Growth"}
            slogan={"A look at the finances behind Light Care."}
          />

          <div id="mainContent">
            <FinanceSection />
            <RevenueProjections />
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </LightMode>
    </Provider>
  )
};

export default FinancePage;
