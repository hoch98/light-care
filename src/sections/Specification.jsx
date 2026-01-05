import {
  Text,
  Box,
  SimpleGrid,
  Heading,
  VStack,
  Flex
} from "@chakra-ui/react";
import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, Preload, OrbitControls } from "@react-three/drei";

import useWindowDimensions from "../hooks/useWindowDimensions.jsx";
import BriefContent from "@/components/specification/BriefContent.jsx";
import VideoContent from "@/components/specification/VideoContent.jsx";
import Product from "@/components/Product.jsx";

const MotionBox = motion(Box);

function Specification() {
  const { width } = useWindowDimensions();
  // Adjusted content width to be wider since we are going side-by-side
  const sectionWidth = { base: "95%", md: "90%", xl: "85%" };

  const items = [
    { id: "brief", label: "Technology", content: <BriefContent /> },
    { id: "demonstration", label: "Demonstration", content: <VideoContent /> },
  ];

  const [selectedContent, setSelectedContent] = useState(items[0]);

  const containerStyles = {
    bg: "white",
    borderRadius: "2xl",
    boxShadow: "xl",
    textAlign: "center",
    border: "1px solid",
    borderColor: "gray.100",
  };

  return (
    <Box
      className="content"
      mt="50px"
      px={5}
      display="flex"
      flexDirection="column"
      alignItems="center"
      w="100%"
    >
      {/* HEADER SECTION */}
      <VStack spacing={0} mb={12}>
        <Text fontWeight="black" fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }} letterSpacing="-2px">
          TECHNOLOGY
        </Text>
        <Box bg="#ffbe5cff" w="100%" h="8px" borderRadius="full" />
      </VStack>

      {/* MAIN INLINE WRAPPER */}
      <SimpleGrid 
        columns={{ base: 1, lg: 2 }} 
        spacing={10} 
        w={sectionWidth} 
        alignItems="start"
      >
        
        {/* LEFT COLUMN: Content + Tabs */}
        <VStack spacing={6} w="100%">
          <Box
            {...containerStyles}
            h={{ base: "auto", lg: "550px" }}
            minH={{ base: "400px", lg: "550px" }}
            w="100%"
            position="relative"
            overflow="hidden"
          >
            <AnimatePresence mode="wait">
              <MotionBox
                key={selectedContent.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                w="100%"
                h="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                p={{ base: 6, md: 10 }}
              >
                {selectedContent.content}
              </MotionBox>
            </AnimatePresence>
          </Box>

          {/* Navigation Tabs */}
          <Flex gap={4} w="100%" justify="center" wrap="wrap">
            {items.map((item) => {
              const isActive = selectedContent.id === item.id;
              return (
                <Box
                  key={item.id}
                  as="button"
                  onClick={() => setSelectedContent(item)}
                  {...containerStyles}
                  p={{ base: 4, lg: 6 }}
                  w={{ base: "47%", md: "200px" }}
                  transition="all 0.3s cubic-bezier(.4,0,.2,1)"
                  cursor="pointer"
                  border="2px solid"
                  borderColor={isActive ? "#ffbe5cff" : "transparent"}
                  bg={isActive ? "orange.50" : "white"}
                  _hover={{
                    boxShadow: "2xl",
                    transform: "translateY(-4px)",
                  }}
                >
                  <Heading
                    fontSize={{ base: "xs", md: "sm" }}
                    letterSpacing="widest"
                    textTransform="uppercase"
                    color={isActive ? "gray.800" : "gray.500"}
                  >
                    {item.label}
                  </Heading>
                </Box>
              );
            })}
          </Flex>
        </VStack>

        {/* RIGHT COLUMN: 3D Canvas */}
        <Box
          w="100%"
          h={{ base: "400px", md: "500px", lg: "650px" }} // Increased height to match container
          borderRadius="2xl"
          bg="rgba(255,255,255,0.6)"
          backdropFilter="blur(10px)"
          boxShadow="xl"
          border="1px solid"
          borderColor="gray.100"
        >
          <Canvas camera={{ fov: 45, position: [0, 2, 6] }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[5, 5, 5]} intensity={1.2} />

              <Product
                position={[0, -1.2, 0]}
                rotation={[0, Math.PI / 4, 0]}
                displayToggled={false}
              />

              <OrbitControls
                enablePan={false}
                enableZoom={false}
                enableDamping
                dampingFactor={0.08}
                target={[0, 0.6, 0]}
              />

              <ContactShadows
                position={[0, -2.2, 0]}
                opacity={0.35}
                blur={2.5}
                scale={8}
              />

              <Environment preset="city" />
              <Preload all />
            </Suspense>
          </Canvas>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default Specification;