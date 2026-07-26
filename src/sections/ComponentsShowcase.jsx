import React, { Suspense, lazy, useEffect, useState } from "react";
import { Box, Flex, Text, VStack, Image } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

// three.js lands in its own chunk and only loads on this page.
const DeviceExploded = lazy(() => import('@/components/DeviceExploded'));

const MotionBox = motion(Box);
const GOLD = "#FFB200";
const BLUE = "#62daff";

const OBJECTS = [
  {
    key: "assembly",
    label: "Layered Assembly",
    desc: "Frame, two-way glass, display and electronics pull apart to show the slim stack that makes up the mirror.",
    type: "canvas",
  },
  {
    key: "camera",
    label: "Pi AI Camera",
    desc: "High-definition camera module for precise facial symptom detection, right at the edge.",
    img: "/media/technologies/ai-camera.png",
  },
  {
    key: "pico",
    label: "Raspberry Pi Pico",
    desc: "Compact microcontroller coordinating sensing and peripheral control.",
    img: "/media/technologies/pico.png",
  },
  {
    key: "monitor",
    label: "Monitor",
    desc: "Slim display unit integrated behind two-way glass for UI projection.",
    img: "/media/technologies/monitor-new.png",
  },
];

// Whoop-style component walkthrough: feature list on the left, one big
// bouncing object on the right, auto-advancing through the hardware.
function ComponentsShowcase() {
  const [active, setActive] = useState(0);
  const [manualKey, setManualKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % OBJECTS.length), 5000);
    return () => clearInterval(id);
  }, [manualKey]);

  const select = (i) => {
    setActive(i);
    setManualKey(k => k + 1); // restart the auto-advance timer
  };

  const obj = OBJECTS[active];

  return (
    <Box
      w="100%"
      bg="#0D0E13"
      border="1px solid"
      borderColor="whiteAlpha.100"
      borderRadius="3xl"
      overflow="hidden"
      position="relative"
      px={{ base: 6, md: 12 }}
      py={{ base: 10, md: 14 }}
    >
      {/* Ambient glows */}
      <Box
        position="absolute" top="-30%" right="-10%" w="50%" h="80%"
        bg={`radial-gradient(circle, rgba(255,178,0,0.10) 0%, transparent 60%)`}
        filter="blur(50px)" pointerEvents="none"
      />
      <Box
        position="absolute" bottom="-30%" left="-10%" w="50%" h="80%"
        bg={`radial-gradient(circle, rgba(98,218,255,0.08) 0%, transparent 60%)`}
        filter="blur(50px)" pointerEvents="none"
      />

      <VStack align="start" spacing={2} mb={{ base: 8, md: 12 }} position="relative">
        <Text fontSize="xs" fontWeight="800" letterSpacing="0.2em" textTransform="uppercase" color={BLUE}>
          Components
        </Text>
        <Text
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight="black"
          letterSpacing="-2px"
          lineHeight="1"
          color="white"
        >
          Built into every reflection.
        </Text>
      </VStack>

      <Flex direction={{ base: "column-reverse", lg: "row" }} gap={{ base: 8, lg: 16 }} align="center" position="relative">
        {/* Feature list */}
        <VStack align="stretch" spacing={1} flex="1" w="100%">
          {OBJECTS.map((o, i) => {
            const isActive = i === active;
            return (
              <Box
                key={o.key}
                as="button"
                textAlign="left"
                onClick={() => select(i)}
                py={4}
                pl={5}
                borderLeft="3px solid"
                borderColor={isActive ? GOLD : "whiteAlpha.200"}
                transition="all 0.25s ease"
                _hover={{ borderColor: isActive ? GOLD : "whiteAlpha.400" }}
              >
                <Text
                  fontSize={isActive ? "xl" : "md"}
                  fontWeight={isActive ? "800" : "600"}
                  color={isActive ? "white" : "whiteAlpha.500"}
                  transition="all 0.25s ease"
                >
                  {o.label}
                </Text>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <MotionBox
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      overflow="hidden"
                    >
                      <Text mt={2} fontSize="sm" color="whiteAlpha.700" maxW="380px" lineHeight="tall">
                        {o.desc}
                      </Text>
                    </MotionBox>
                  )}
                </AnimatePresence>
              </Box>
            );
          })}
        </VStack>

        {/* Big bouncing object */}
        <Box flex="1.2" w="100%" h={{ base: "300px", md: "440px" }} position="relative">
          <AnimatePresence mode="wait">
            <MotionBox
              key={obj.key}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35 }}
              w="100%"
              h="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {obj.type === "canvas" ? (
                <Suspense fallback={null}>
                  <DeviceExploded />
                </Suspense>
              ) : (
                <MotionBox
                  animate={{ y: [0, -16, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src={obj.img}
                    alt={obj.label}
                    maxH={{ base: "250px", md: "380px" }}
                    maxW="100%"
                    objectFit="contain"
                    filter="drop-shadow(0 24px 45px rgba(0,0,0,0.6))"
                  />
                </MotionBox>
              )}
            </MotionBox>
          </AnimatePresence>
        </Box>
      </Flex>
    </Box>
  );
}

export default ComponentsShowcase;
