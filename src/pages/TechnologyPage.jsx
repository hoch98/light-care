import '../App.css';
import { motion } from 'framer-motion';
import { Provider } from '../components/ui/provider';
import { LightMode } from '../components/ui/color-mode';
import { SimpleGrid, Container, Box } from '@chakra-ui/react';
import TopBar from '../sections/Topbar';
import Technology from '@/sections/Technology';
import Research from '@/sections/Research';
import Footer from '@/sections/Footer';
import TitleCard from '@/sections/TitleCard';
import TechnologySection from '@/sections/How';

const Technologies = () => {

  return (
    <Provider>
      <LightMode>
        <Box id='body' style={{ cursor: "default" }}>
          <TopBar />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <TitleCard color={"#336298ff"} textColor={"white"} text={"Behind the"} lastword={"Mirror"} lastwordColour={"#FFBE5C"} slogan={"The technology that quietly turns everyday moments into wellness insights."}/>
            <Technology />
            {/* <TechnologySection /> */}
            <Research />
          </motion.div>
        </Box>
        <footer>
          <Footer />
        </footer>
      </LightMode>
    </Provider>
  )
};

export default Technologies;