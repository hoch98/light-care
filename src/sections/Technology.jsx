import {
  Text,
  Box,
  VStack,
  Flex,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";
// 1. Import 'lazy' from React
import { Suspense, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, Preload, OrbitControls } from "@react-three/drei";
import { motion } from 'framer-motion';

import PartsShowoff from "./PartsShowoff";
import BriefContent from "@/components/specification/BriefContent.jsx";

// 2. Replace the direct import with React.lazy
const Product = lazy(() => import("@/components/Product.jsx"));

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

  const sectionWidth = { base: "95%", md: "85%", lg: "75%", xl: "65%" };
  const maxWidth = "1300px";

  return (
    <Box
      className="specification-section-wrapper"
      w="100%"
      minH="50vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      py={10}
      bg="gray.50"
    >
      <VStack spacing={0} mb={12}>
        <Text fontWeight="black" fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }} letterSpacing="-2px">
          TECHNOLOGY
        </Text>
        <Box bg="#ffbe5cff" w="100%" h="8px" borderRadius="full" />
      </VStack>

      <Flex
        w={sectionWidth}
        maxW={maxWidth}
        direction={{ base: "column", lg: "row" }}
        bg="white"
        borderRadius="3xl"
        boxShadow="2xl"
        border="1px solid"
        borderColor="gray.100"
        overflow="hidden"
        minH={{ base: "auto", lg: "550px" }}
      >
        <Box 
          flex={{ base: "1", lg: "0.6" }} 
          p={{ base: 8, md: 12, xl: 16 }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          position="relative"
          borderRight={{ base: "none", lg: "1px solid" }}
          borderRightColor="gray.100"
          borderBottom={{ base: "1px solid", lg: "none" }}
          borderBottomColor="gray.100"
          textAlign="center"
        >
          <BriefContent />
        </Box>

        <Box 
          flex={{ base: "1", lg: "0.4" }} 
          bg="white" 
          h={{ base: "400px", lg: "auto" }}
          position="relative"
        >
          <Canvas camera={{ fov: 45, position: [-1, 3, 8] }}>
            {/* 3. The Suspense boundary here handles the lazy loading state */}
            <Suspense fallback={null}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[5, 5, 5]} intensity={1.2} />

              <Product
                position={[0, -1, 0]}
                rotation={[0, Math.PI / 4, 0]}
                displayToggled={false}
                hoverEnabled={false}
              />

              <OrbitControls
                enablePan={false}
                enableZoom={false}
                enableDamping
                dampingFactor={0.08}
                target={[0.2, 1, 0]}
              />

              <ContactShadows
                position={[0, -2, 0]}
                opacity={0.3}
                blur={2.5}
                scale={8}
              />

              <Environment preset="city" />
              <Preload all />
            </Suspense>
          </Canvas>
        </Box>
      </Flex>

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
    </Box>
  );
}

export default Technology;