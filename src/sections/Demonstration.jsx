import {
  Text,
  Box,
  VStack,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import VideoContent from "@/components/specification/VideoContent.jsx";

const MotionBox = motion(Box);

function Demonstration() {
  const sectionWidth = { base: "95%", md: "85%", lg: "75%", xl: "65%" };
  const maxWidth = "1100px";

  return (
    <Box
      className="demonstration-section-wrapper"
      w="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      py={"40px"}
      position="relative"
      pb={"100px"}
      // 1. CLEAR THE BACKGROUND: Set to transparent so body shows
      bg="transparent" 
      // 2. OPTIONAL FROST: Blurs the body content slightly for readability
      backdropFilter="blur(1px)" 
    >
      <VStack spacing={12} w="100%" alignItems="center" zIndex={1}>
        
        {/* SECTION HEADER */}
        <VStack spacing={0}>
          <Text 
            fontWeight="black" 
            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }} 
            letterSpacing="-2px"
            // Ensure color contrasts with your body background
            color="gray.800" 
          >
            SEE IT IN ACTION
          </Text>
          <Box bg="#ffbe5cff" w="100%" h="8px" borderRadius="full" />
          <br />
        </VStack>

        <br />

        {/* VIDEO CONTAINER */}
        <MotionBox
          w={sectionWidth}
          maxW={maxWidth}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          position="relative"
        >
          <Box
            bg="black"
            borderRadius="3xl"
            // Deep shadow to create "lift" from the body background
            boxShadow="0 40px 100px rgba(0, 0, 0, 0.3)"
            overflow="hidden"
            border="1px solid"
            borderColor="whiteAlpha.300"
            aspectRatio={{ base: "16/9", lg: "21/9" }}
          >
            <Flex w="100%" h="100%" align="center" justify="center" bg="black">
               <VideoContent />
            </Flex>
          </Box>
        </MotionBox>
      </VStack>
    </Box>
  );
}

export default Demonstration;