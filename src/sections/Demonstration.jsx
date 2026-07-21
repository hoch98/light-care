import { Text, Box, VStack, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import VideoContent from "@/components/specification/VideoContent.jsx";

const MotionBox = motion(Box);
const GOLD = "#FFB200";

function Demonstration() {
  return (
    <Box w="100%" bg="#06070A" py={{ base: 16, md: 24 }} position="relative" overflow="hidden">
      
      <Box
        position="absolute" inset="0" zIndex="0" opacity="0.05"
        backgroundImage="repeating-linear-gradient(45deg, transparent, transparent 15px, #FFB200 15px, #FFB200 30px)"
      />

      <MotionBox
        position="absolute" top="50%" left="50%" w="500px" h="500px"
        border="4px solid rgba(255,178,0,0.15)" borderRadius="full" transform="translate(-50%, -50%)"
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        zIndex="0"
      />
      <Box position="absolute" top="50%" left="0" w="100%" h="1px" bg="rgba(255,178,0,0.2)" zIndex="0" />
      <Box position="absolute" top="0" left="50%" w="1px" h="100%" bg="rgba(255,178,0,0.2)" zIndex="0" />

      <Box maxW="1000px" mx="auto" px={{ base: 6, md: 8 }} position="relative" zIndex={1}>
        <VStack spacing={8} align="center">
          
          <VStack align="center" spacing={2} textAlign="center" bg="#06070A" p={4} borderRadius="12px" border="1px solid rgba(255,178,0,0.5)">
            <Text fontSize="xs" fontWeight="800" letterSpacing="0.2em" textTransform="uppercase" color={GOLD}>
              [ Live System Feed ]
            </Text>
            <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800" color="white">
              A morning routine, renewed.
            </Text>
          </VStack>

          <MotionBox initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} w="100%">
            <VideoContent />
          </MotionBox>
        </VStack>
      </Box>
    </Box>
  );
}

export default Demonstration;