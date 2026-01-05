import { Box, VStack, Text, Container } from "@chakra-ui/react";
import { color, motion } from "framer-motion";

const MotionVStack = motion(VStack);

function TitleCard() {
  return (
    <Box
      w="100%"
      py={{ base: "80px", md: "120px" }}
      position="relative"
      bg="white"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "url('/media/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.05,
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
              color="#1A202C"
              letterSpacing="-0.04em"
              lineHeight="1.1"
            >
              Behind the <span style={{color: "#FFBE5C"}}>
                Mirror
              </span>
            </Text>
          </VStack>

          <Text
            fontSize={{ base: "md", md: "xl" }}
            color="gray.500"
            maxW="600px"
            fontWeight="medium"
            lineHeight="tall"
          >
            The technology that quietly turns everyday moments <br /> 
            into wellness insights.
          </Text>
        </MotionVStack>
      </Container>
    </Box>
  );
}

export default TitleCard;