import { Box, VStack, Text, Flex, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);
const GOLD = "#FFB200";

const timelineData = [
  { n: "01", title: "Idea", description: "Identified a common problem: people ignore early wellness signs." },
  { n: "02", title: "Research", description: "Studied rPPG and camera-based wellness sensing." },
  { n: "03", title: "Design", description: "Sketched early mirror concepts and interactions." },
  { n: "04", title: "Build", description: "Built the first mirror prototype on a Raspberry Pi." },
  { n: "05", title: "Test & Improve", description: "Refined usability, messaging, and system stability." },
  { n: "06", title: "Pilot", description: "Preparing for testing in shared spaces with defined metrics." },
];

function TimelineSection() {
  return (
    <Box w="100%" bg="#0B0C10" py={{ base: 16, md: 24 }} position="relative" overflow="hidden">
      
      {/* Scaled-down Background Flair */}
      <Box position="absolute" top="10%" left="20%" w="60%" h="80%" borderLeft={`3px solid rgba(255,178,0,0.15)`} borderTop={`3px solid rgba(255,178,0,0.15)`} borderRadius="40px 0 0 0" zIndex="0" />
      <Box position="absolute" bottom="10%" right="20%" w="60%" h="40%" borderRight={`3px solid rgba(255,178,0,0.15)`} borderBottom={`3px solid rgba(255,178,0,0.15)`} borderRadius="0 0 40px 0" zIndex="0" />

      <Container maxW="900px" position="relative" zIndex={1}>
        <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="800" color="white" mb={12} textAlign="center" textTransform="uppercase">
          The Path Forward
        </Text>

        <VStack spacing={8} align="stretch" w="100%">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <MotionFlex
                key={item.n} direction={{ base: "column", md: isEven ? "row" : "row-reverse" }} justifyContent="space-between" alignItems="center"
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} w="100%"
              >
                <Box flex="1" p={6} bg="#12131A" border={`1px solid rgba(255,178,0,0.4)`} borderRadius="16px" textAlign={{ base: "center", md: isEven ? "right" : "left" }} w="100%" boxShadow={`0 0 15px rgba(255,178,0,0.05)`}>
                  <Text fontSize="md" fontWeight="800" color={GOLD} mb={1}>Phase {item.n} // {item.title}</Text>
                  <Text fontSize="sm" color="whiteAlpha.800" fontWeight="500">{item.description}</Text>
                </Box>
                <Box w={{ base: "2px", md: "60px" }} h={{ base: "30px", md: "2px" }} bg="rgba(255,178,0,0.5)" />
                <Box flex="1" display={{ base: "none", md: "block" }} />
              </MotionFlex>
            );
          })}
        </VStack>
      </Container>
    </Box>
  );
}

export default TimelineSection;