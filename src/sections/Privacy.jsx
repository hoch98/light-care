import React from "react";
import { Box, VStack, Text, Flex, Icon } from "@chakra-ui/react";
import { Cpu, Power, UserMinus } from "lucide-react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const GOLD = "#FFB200";

const PrivacySection = () => {
  const layers = [
    { title: "Local-only processing", icon: Cpu, points: "No cloud by default. Frames processed in memory, then immediately discarded." },
    { title: "Explicit user control", icon: Power, points: "Manual activation only. Camera off by default with visible active indicators." },
    { title: "Non-identifying output", icon: UserMinus, points: "No face recognition or identity tracking. Zero personal data linked." },
  ];

  return (
    <Box w="100%" bg="#050507" py={{ base: 16, md: 24 }} position="relative" overflow="hidden">
      
      {/* Scaled-down Background Flair */}
      {[...Array(5)].map((_, i) => (
        <MotionBox
          key={i} position="absolute" top="-20%" left={`${i * 25}%`} w="10px" h="150%" bg="rgba(255, 178, 0, 0.15)"
          transform="rotate(45deg)" boxShadow={`0 0 20px rgba(255,178,0,0.2)`}
          animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }} zIndex="0"
        />
      ))}

      <VStack spacing={12} maxW="800px" mx="auto" px={6} position="relative" zIndex={1}>
        <VStack align="center" textAlign="center" spacing={3} bg="rgba(0,0,0,0.6)" p={6} borderRadius="full" border={`2px solid ${GOLD}`}>
          <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800" color="white" textTransform="uppercase">
            Hardware Level Privacy
          </Text>
        </VStack>

        <VStack spacing={6} align="stretch" w="100%">
          {layers.map((layer, index) => (
            <MotionBox key={layer.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <Flex align="center" gap={6} p={6} bg="#0E2B50" borderLeft={`6px solid ${GOLD}`} borderRadius="0 16px 16px 0" boxShadow="0 10px 20px rgba(0,0,0,0.5)">
                <Box w="50px" h="50px" borderRadius="12px" bg="rgba(255,178,0,0.15)" display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                  <Icon as={layer.icon} boxSize={6} color={GOLD} />
                </Box>
                <Box>
                  <Text fontWeight="800" fontSize="lg" color="white" mb={1}>{layer.title}</Text>
                  <Text fontSize="sm" color="#A1A1AA" fontWeight="500">{layer.points}</Text>
                </Box>
              </Flex>
            </MotionBox>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default PrivacySection;