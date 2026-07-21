import { Text, Box, VStack, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const GOLD = "#FFB200";
const MUTED = "#A1A1AA";

function ChallengeSection() {
  const stats = [
    { value: "73%", desc: "report regular stress or burnout" },
    { value: "1 in 3", desc: "adults get insufficient sleep" },
    { value: "60%+", desc: "of health issues trace back to lifestyle" },
  ];

  return (
    <Box w="100%" bg="#0A0B0E" py={{ base: 16, md: 24 }} position="relative" overflow="hidden" id="mainContent">
      
      {/* Scaled-down Background Flair */}
      <Box
        position="absolute" inset="0" zIndex="0" opacity="0.2"
        backgroundImage={`
          linear-gradient(rgba(255,178,0,0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,178,0,0.15) 1px, transparent 1px)
        `}
        backgroundSize="60px 60px"
        transform="perspective(800px) rotateX(60deg) scale(1.5)"
        transformOrigin="top"
      />
      
      <MotionBox
        position="absolute" top="5%" right="-5%" w="0" h="0"
        borderTop="150px solid transparent"
        borderBottom="150px solid transparent"
        borderLeft={`150px solid rgba(255, 178, 0, 0.08)`}
        animate={{ x: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        zIndex="0"
      />

      <Box maxW="1100px" mx="auto" px={{ base: 6, md: 8 }} position="relative" zIndex={1}>
        <Flex direction={{ base: "column", lg: "row" }} gap={12} align="center">
          
          <VStack align="start" spacing={5} flex="1" maxW="480px" bg="rgba(10, 11, 14, 0.85)" p={6} borderRadius="24px" backdropFilter="blur(8px)">
            <Text fontSize="xs" fontWeight="800" letterSpacing="0.15em" textTransform="uppercase" color={GOLD}>
              // The Problem
            </Text>
            <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="800" letterSpacing="-0.02em" lineHeight="1.1" color="white">
              Wellness feedback comes too late.
            </Text>
            <Text fontSize="md" color={MUTED} lineHeight="tall" borderLeft={`2px solid ${GOLD}`} pl={4}>
              Small issues build quietly until they become disruptions. Daily awareness hasn't kept pace with modern life.
            </Text>
          </VStack>

          <Box flex="1" position="relative" w="100%">
            <VStack spacing={4} align="stretch" position="relative">
              {stats.map((s, i) => (
                <MotionBox
                  key={s.value}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} whileHover={{ scale: 1.02, x: -5 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  p={6} ml={{ base: 0, md: i % 2 === 0 ? "0" : "10%" }} mr={{ base: 0, md: i % 2 === 0 ? "10%" : "0" }}
                  borderRadius="0 20px 0 20px"
                  bg="#12131A" border="1px solid rgba(255, 178, 0, 0.2)"
                  boxShadow="0 10px 20px rgba(0,0,0,0.4)"
                >
                  <Text fontSize="4xl" fontWeight="800" color={GOLD} lineHeight="1">{s.value}</Text>
                  <Text mt={1} color="white" fontSize="sm" fontWeight="600" textTransform="uppercase">{s.desc}</Text>
                </MotionBox>
              ))}
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default ChallengeSection;