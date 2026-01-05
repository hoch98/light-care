import '../App.css';
import { motion } from 'framer-motion';
import { Provider } from '../components/ui/provider';
import { LightMode } from '../components/ui/color-mode';
import { SimpleGrid, Container, Box } from '@chakra-ui/react';
import TopBar from '../sections/Topbar';
import Specification from '@/sections/Specification';
import Research from '@/sections/Research';
import PartsShowoff from '@/sections/PartsShowoff';
import Footer from '@/sections/Footer';
import TitleCard from '@/sections/TitleCard';

const MotionGridItem = motion(Box);

const Technologies = () => {
  const parts = [
    {
      id: 1,
      name: "Raspberry Pi 4",
      description: "Primary computation engine for system logic and real-time processing.",
      image: "/media/technologies/raspberrypi.png",
      stats: { "RAM": "8GB", "CPU": "ARMv8" }
    },
    {
      id: 2,
      name: "Pi Camera Module",
      description: "High-definition optics for precise facial symptom detection and biometric analysis.",
      image: "/media/technologies/picamera.png",
      stats: { "RES": "12.3MP", "SENSOR": "IMX477" }
    },
    {
      id: 3,
      name: "Monitor",
      description: "Ultra-slim display unit integrated behind two-way glass for seamless UI projection.",
      image: "/media/technologies/monitor.png",
      stats: { "RES": "1080p", "TYPE": "IPS" }
    }
  ];

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
            <Specification />

            <Container maxW="container.xl" py={20}>
              <SimpleGrid columns={{ md: 3, sm: 1 }} gap={10}>
                {parts.map((item, index) => (
                  <MotionGridItem
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <PartsShowoff
                      part={item}
                      isSmall={true}
                    />
                  </MotionGridItem>
                ))}
              </SimpleGrid>
            </Container>

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