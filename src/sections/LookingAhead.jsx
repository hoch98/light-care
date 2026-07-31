import { Box, Text, Flex, VStack, Button, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const MotionBox = motion(Box);
const GOLD = "#FFB200";

function LookingAhead() {
  const milestones = [
    { title: "Refining Accuracy", desc: "Combining several models into one to reduce overlap." },
    { title: "Trend Tracking", desc: "View wellness patterns over weeks and months." },
    { title: "Expanded Insights", desc: "Additional markers like facial reflectiveness." },
    { title: "Pilot Testing", desc: "Moving to real-world environments to gather feedback." }
  ];

  return (
    <Box w="100%" bg="#03101F" py={{ base: 16, md: 24 }} position="relative" overflow="hidden">
      
      {/* Scaled-down Background Flair */}
      <Box
        position="absolute" bottom="0" left="0" w="100%" h="50%" zIndex="0"
        backgroundImage={`
          linear-gradient(transparent 0%, rgba(255,178,0,0.2) 1px, transparent 2px),
          linear-gradient(90deg, transparent 0%, rgba(255,178,0,0.2) 1px, transparent 2px)
        `}
        backgroundSize="60px 60px" transform="perspective(600px) rotateX(75deg)" transformOrigin="bottom"
      />
      <Box position="absolute" bottom="0" left="50%" transform="translateX(-50%)" w="80%" h="200px" bg="radial-gradient(ellipse at bottom, rgba(255,178,0,0.25) 0%, transparent 60%)" zIndex="0" />

      <Box maxW="1100px" mx="auto" px={{ base: 6, md: 8 }} position="relative" zIndex={1}>
        <Flex direction={{ base: "column", lg: "row" }} gap={12} mb={20} align="center">
          
          <VStack align="start" spacing={4} flex="1" bg="rgba(0,0,0,0.6)" p={8} borderRadius="24px" border={`1px solid rgba(255,178,0,0.3)`} backdropFilter="blur(8px)">
            <Text fontSize={{ base: "4xl", md: "5xl" }} fontWeight="800" color="white" lineHeight="1.1">
              Still Early.<br/>Deliberately So.
            </Text>
            <Text color="#A1A1AA" fontSize="md" fontWeight="500">
              Focused on accuracy, daily usability, and absolute clarity.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4} flex="1.5">
            {milestones.map((item, i) => (
              <MotionBox key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} p={6} bg="#0E2B50" border={`1px solid rgba(255,178,0,0.2)`} borderRadius="16px" boxShadow={`0 5px 15px rgba(0,0,0,0.3)`}>
                <Text fontWeight="800" fontSize="lg" color={GOLD} mb={1}>{item.title}</Text>
                <Text fontSize="sm" color="whiteAlpha.900" fontWeight="400">{item.desc}</Text>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Flex>

        <VStack align="center" textAlign="center" spacing={8}>
          <Text fontSize={{ base: "lg", md: "xl" }} color="white" fontWeight="600" maxW="700px" bg="rgba(0,0,0,0.4)" p={4} borderRadius="lg">
            Our goal isn't to replace medical tools — it's to empower people with proactive daily awareness.
          </Text>
          
          <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button as={Link} to="/technology" bg={GOLD} color="#061529" fontWeight="800" borderRadius="full" px={10} py={7} fontSize="md" boxShadow={`0 0 20px rgba(255,178,0,0.3)`}>
              Explore Technology
            </Button>
          </MotionBox>
        </VStack>
      </Box>
    </Box>
  );
}

export default LookingAhead;