import React, { Suspense, lazy, useState } from "react";
import { Box, Flex, Text, VStack, HStack, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

// three.js lands in its own chunk and only loads on this page.
const DeviceExploded = lazy(() => import('@/components/DeviceExploded'));

const MotionBox = motion(Box);
const GOLD = "#FFB200";
const BLUE = "#62daff";

const LAYERS = [
  { label: "Two-way glass", desc: "Mirrored front surface that hides the display until it lights up." },
  { label: "Display panel", desc: "Slim monitor projecting the interface straight through the glass." },
  { label: "Separator", desc: "Internal spacer holding the optical stack at the right depth." },
  { label: "Electronics", desc: "Compute and sensing boards mounted behind the panel." },
  { label: "Timber frame", desc: "Furniture-grade enclosure that makes it read as a mirror, not a device." },
];

// Looping exploded view of the mirror with playback control.
function ExplodedView() {
  const [playing, setPlaying] = useState(true);

  return (
    <Box w="100%" px={5} display="flex" flexDirection="column" alignItems="center" mb="100px">
      <VStack spacing={0} mb={12}>
        <Text
          fontWeight="black"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          letterSpacing="-2px"
          color="white"
          textAlign="center"
        >
          EXPLODED VIEW OF THE MIRROR
        </Text>
        <Box bg={GOLD} w="100%" h="8px" borderRadius="full" />
      </VStack>

      <Box
        w={{ base: "95%", md: "90%", lg: "80%" }}
        bg="#0B2444"
        border="1px solid"
        borderColor="whiteAlpha.100"
        borderRadius="3xl"
        boxShadow="0 20px 50px rgba(0,0,0,0.5)"
        overflow="hidden"
        position="relative"
        px={{ base: 6, md: 12 }}
        py={{ base: 10, md: 14 }}
      >
        {/* Ambient glows */}
        <Box
          position="absolute" top="-30%" right="-10%" w="50%" h="80%"
          bg="radial-gradient(circle, rgba(255,178,0,0.10) 0%, transparent 60%)"
          filter="blur(50px)" pointerEvents="none"
        />
        <Box
          position="absolute" bottom="-30%" left="-10%" w="50%" h="80%"
          bg="radial-gradient(circle, rgba(98,218,255,0.10) 0%, transparent 60%)"
          filter="blur(50px)" pointerEvents="none"
        />

        <Flex direction={{ base: "column-reverse", lg: "row" }} gap={{ base: 8, lg: 12 }} align="center" position="relative">
          {/* Layer list */}
          <VStack align="stretch" spacing={1} flex="1" w="100%">
            <Text fontSize="xs" fontWeight="800" letterSpacing="0.2em" textTransform="uppercase" color={BLUE} mb={3}>
              Inside the build
            </Text>
            {LAYERS.map((l) => (
              <Box key={l.label} py={3} pl={5} borderLeft="3px solid" borderColor="whiteAlpha.200">
                <Text fontSize="md" fontWeight="700" color="white">{l.label}</Text>
                <Text mt={1} fontSize="sm" color="whiteAlpha.700" maxW="380px" lineHeight="tall">
                  {l.desc}
                </Text>
              </Box>
            ))}
          </VStack>

          {/* Animation + playback control on the side */}
          <HStack flex="1.2" w="100%" spacing={4} align="center">
            <Box flex="1" h={{ base: "320px", md: "460px" }} position="relative">
              <Suspense fallback={null}>
                <DeviceExploded playing={playing} />
              </Suspense>
            </Box>

            <VStack spacing={2}>
              <IconButton
                aria-label={playing ? "Pause animation" : "Resume animation"}
                onClick={() => setPlaying(p => !p)}
                bg={GOLD}
                color="#061529"
                borderRadius="full"
                size="lg"
                boxShadow="0 0 20px rgba(255,178,0,0.35)"
                _hover={{ bg: "#E6A100", transform: "translateY(-2px)", boxShadow: "0 0 28px rgba(255,178,0,0.5)" }}
                _active={{ transform: "scale(0.96)" }}
              >
                {playing ? <Pause size={20} /> : <Play size={20} />}
              </IconButton>
              <Text fontSize="10px" fontWeight="700" letterSpacing="0.1em" textTransform="uppercase" color="whiteAlpha.600">
                {playing ? "Pause" : "Resume"}
              </Text>
            </VStack>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}

export default ExplodedView;
