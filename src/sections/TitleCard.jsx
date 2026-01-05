import { Box, VStack, Text, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionVStack = motion(VStack);

function TitleCard({color, text, textColor, lastword, lastwordColour, slogan}) {
  return (
    <Box
      w="100%"
      py={{ base: "80px", md: "120px" }}
      position="relative"
      bg={color}
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "url('/media/bg.jpg')",
        
        /* REPEAT SETTINGS */
        backgroundSize: "800px", // Adjust this value to make the pattern smaller or larger
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        
        /* BLENDING & OPACITY */
        opacity: 0.07, // Lowered slightly so a dense repeating pattern isn't distracting
        zIndex: 0,
      }}
    >
      <Container maxW="container.lg" position="relative" zIndex={1}>
        <MotionVStack
          spacing={6}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          textAlign="center"
        >
          <VStack spacing={-2}>
            <Text
              fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
              fontWeight="800"
              color={textColor} 
              letterSpacing="-0.04em"
              lineHeight="1.1"
            >
              {text} <span style={{color: lastwordColour}}>
                {lastword}
              </span>
            </Text>
          </VStack>

          <Text
            fontSize={{ base: "md", md: "xl" }}
            color={"whiteAlpha.800" }
            maxW="600px"
            fontWeight="medium"
            lineHeight="tall"
          >
            {slogan}
          </Text>
        </MotionVStack>
      </Container>
    </Box>
  );
}

export default TitleCard;