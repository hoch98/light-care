import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  Container, 
  VStack,
  HStack
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

function Starter() {
  return (
    <Box 
      w="100%" 
      h="100vh" 
      position="relative" 
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
      /* BACKGROUND IMAGE SETTINGS */
      backgroundImage="url('/media/starter-bg.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Box 
        position="absolute"
        inset={0}
        bg="blackAlpha.600"
        backdropFilter="blur(3px)"
        zIndex={1}
      />

      <Container maxW="container.md" position="relative" zIndex={2}>
        <VStack 
          spacing={8} 
          textAlign="center"
        >
          {/* MAIN TITLE */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Heading 
              fontSize={{ base: "6xl", md: "8xl", lg: "9xl" }} 
              lineHeight="0.9" 
              fontWeight="black" 
              color="#FFB200"
              letterSpacing="-4px"
            >
              LIGHT <br /> CARE
            </Heading>
          </MotionBox>

          {/* SLOGAN */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Text 
              fontSize={{ base: "xl", md: "2xl" }} 
              fontWeight="semibold" 
              color="white" // Changed to white for better contrast on background
              letterSpacing="widest"
              textTransform="uppercase"
            >
              A Brighter Wellness
            </Text>
          </MotionBox>

          {/* DESCRIPTION */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Text fontSize="lg" color="whiteAlpha.900" mb={4} maxW="600px">
              Experience the next generation of contactless health monitoring 
              powered by advanced AI and photoplethysmography.
            </Text>
            
            <HStack spacing={4} justify="center">
              <Button 
                size="lg" 
                bg="#FFB200" 
                color="white" 
                px={10} 
                borderRadius="full"
                _hover={{ bg: "#e6a100", transform: "translateY(-2px)" }}
                _active={{ transform: "scale(0.98)" }}
                boxShadow="0px 10px 20px rgba(255, 178, 0, 0.3)"
                onClick={() => {
                  document.getElementById("mainContent").scrollIntoView({
                    behavior: "smooth", // Optional: for smooth scrolling animation
                    block: "start"      // Optional: align the top of the element with the top of the viewport
                  });
                }}
              >
                Learn More
              </Button>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}

export default Starter;