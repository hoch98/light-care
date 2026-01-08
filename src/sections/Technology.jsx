import {
  Text,
  Box,
  VStack,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";
import { motion } from 'framer-motion';

import PartsShowoff from "./PartsShowoff";
import BriefContent from "@/components/specification/BriefContent.jsx";

const MotionGridItem = motion(Box);

function Technology() {
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
      description: "High-definition camera for precise facial symptom detection.",
      image: "/media/technologies/picamera.png",
      stats: { "RES": "12.3MP", "SENSOR": "IMX477" }
    },
    {
      id: 3,
      name: "Monitor",
      description: "Slim display unit integrated behind two-way glass for UI projection.",
      image: "/media/technologies/monitor.png",
      stats: { "RES": "1080p", "TYPE": "IPS" }
    }
  ];

  // Widened the section now that the 3D canvas is gone for a more immersive feel
  const sectionWidth = { base: "95%", md: "90%", lg: "85%", xl: "80%" };
  const maxWidth = "1400px";

  return (
    <Box
      className="specification-section-wrapper"
      w="100%"
      minH="50vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      py={20}
      bg="gray.50"
    >
      {/* HEADER SECTION */}
      <VStack spacing={0} mb={16}>
        <Text fontWeight="black" fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }} letterSpacing="-2px">
          TECHNOLOGY
        </Text>
        <Box bg="#ffbe5cff" w="100%" h="8px" borderRadius="full" />
      </VStack>

      {/* MAIN CONTENT CONTAINER */}
      <Box
        w={sectionWidth}
        maxW={maxWidth}
        bg="white"
        borderRadius="3xl"
        boxShadow="2xl"
        border="1px solid"
        borderColor="gray.100"
        p={{ base: 8, md: 16, xl: 20 }}
      >
        {/* BriefContent now occupies the full width. 
            This allows your images and technical text to breathe. 
        */}
        <BriefContent />
      </Box>

      {/* HARDWARE SPECS GRID */}
      <Container maxW="container.xl" py={20}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>
          {parts.map((item, index) => (
            <MotionGridItem
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
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
    </Box>
  );
}

export default Technology;