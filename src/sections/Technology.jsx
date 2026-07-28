import {
  Text,
  Box,
  VStack,
  Container,
} from "@chakra-ui/react";

import BriefContent from "@/components/specification/BriefContent.jsx";
import ComponentsShowcase from "./ComponentsShowcase";
import { Image } from "@chakra-ui/react";

const GOLD = "#FFB200";

function Technology() {
  const sectionWidth = { base: "95%", md: "90%", lg: "85%", xl: "80%" };
  const maxWidth = "1400px";

  return (
    <Box
      className="specification-section-wrapper"
      w="100%"
      minH="50vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      py={20}
      bg="#061529"
      color="white"
    >
      <VStack spacing={0} mb={16}>
        <Text fontWeight="black" fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }} letterSpacing="-2px" color="white">
          TECHNOLOGY
        </Text>
        <Box bg={GOLD} w="100%" h="8px" borderRadius="full" />
      </VStack>

      <Box
        w={sectionWidth}
        maxW={maxWidth}
        bg="#0B2444"
        borderRadius="3xl"
        boxShadow="0 20px 50px rgba(0,0,0,0.5)"
        border="1px solid"
        borderColor="whiteAlpha.100"
        p={{ base: 8, md: 16, xl: 20 }}
      >
        <BriefContent />
      </Box>

      <Container maxW="container.xl" py={10}>
        <VStack spacing={0} mb={8}>
          <Text fontWeight="black" fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }} letterSpacing="-2px" color="white">
            Dataset
          </Text>
          <Box bg="#62daff" w="120px" h="6px" borderRadius="full" />
        </VStack>
        <Box
          display="flex"
          justifyContent="center"
        >
          <Box
            bg="#0B2444"
            borderRadius="3xl"
            boxShadow="0 20px 50px rgba(0,0,0,0.5)"
            border="1px solid"
            borderColor="whiteAlpha.100"
            p={{ base: 6, md: 10 }}
          >
            <Image
              src="/media/technologies/dataset.png"
              maxW="900px"
              w="100%"
              borderRadius="xl"
              objectFit="contain"
            />
            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)" }}>https://universe.roboflow.com/redness/acne-l6cao</p>
          </Box>
        </Box>

      </Container>

      <Container maxW="container.xl" py={10}>
        <ComponentsShowcase />
      </Container>
    </Box>
  );
}

export default Technology;
