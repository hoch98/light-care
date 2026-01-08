import { Box, Grid, Text, VStack, Heading, Icon, Circle, Image, AspectRatio } from "@chakra-ui/react";
import { FaCamera, FaBrain, FaLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

function TechnologySection() {
  const techData = [
    {
      title: "Remote Photoplethysmography (rPPG)",
      icon: FaCamera,
      color: "blue.500",
      image: "/media/how/rppg.png", 
      description: "Detects subtle color changes in facial skin caused by blood flow using a standard RGB camera.",
      points: [
        "Tracks micro-changes in light absorption with each heartbeat",
        "Estimates heart rate trends without wearables or contact",
        "Ideal for tracking daily stress and fatigue indicators"
      ]
    },
    {
      title: "Computer Vision & AI Models",
      icon: FaBrain,
      color: "purple.500",
      image: "/media/how/ai.png",
      description: "Advanced face segmentation and AI analysis focused on long-term wellness baselines.",
      points: [
        "Isolates stable regions (forehead, cheeks) from background",
        "Detects visual indicators like dark circles and eye redness",
        "Learns 'normal' for each user to provide personalized feedback"
      ]
    },
    {
      title: "Controlled Lighting Principles",
      icon: FaLightbulb,
      color: "orange.400",
      image: "/media/how/structured-light.png",
      description: "Integrated illumination inspired by structured-light principles for medical-grade reliability.",
      points: [
        "Eliminates environmental shadows and variation",
        "Stabilizes skin reflectance for accurate color analysis",
        "Ensures consistency in bedrooms or low-light environments"
      ]
    }
  ];

  return (
    <Box pb={"100px"} px={4} bg="gray.50" id="technology">
      <VStack spacing={4} mb={16} textAlign="center">
        <Heading size="2xl" color="gray.800">The Technology Inside</Heading>
        <Box w="60px" h="4px" bg="#ffbe5cff" borderRadius="full" />
      </VStack>

      <Grid 
        templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} 
        gap={10} 
        maxW="1200px" 
        mx="auto"
      >
        {techData.map((tech, idx) => (
          <MotionBox
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            bg="white"
            p={8}
            borderRadius="3xl"
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.100"
            display="flex"
            flexDirection="column"
            _hover={{ boxShadow: "xl", transform: "translateY(-5px)" }}
          >
            <Circle size="60px" bg={`${tech.color}10`} color={tech.color} mb={6}>
              <Icon as={tech.icon} boxSize={6} />
            </Circle>
            
            <Heading size="md" mb={4} color="gray.800">
              {tech.title}
            </Heading>
            
            <Text color="gray.600" mb={6} fontSize="md" lineHeight="tall" minH="72px">
              {tech.description}
            </Text>

            {/* Image Space */}
            
            <AspectRatio ratio={16 / 9} mb={8}>
              <Box 
                bg="gray.100" 
                borderRadius="xl" 
                overflow="hidden"
                border="1px solid"
                borderColor="gray.50"
              >
                <Image 
                  src={tech.image} 
                  alt={tech.title}
                  objectFit="cover"
                  transition="0.3s ease-in-out"
                  _hover={{ transform: "scale(1.05)" }}
                />
              </Box>
            </AspectRatio>

            
            <VStack align="start" spacing={3} mt="auto">
              {tech.points.map((point, pIdx) => (
                <Text key={pIdx} fontSize="sm" color="gray.500" display="flex" alignItems="start">
                  <Box as="span" color={tech.color} mr={2} mt="1px">•</Box>
                  {point}
                </Text>
              ))}
            </VStack>
          </MotionBox>
        ))}
      </Grid>
    </Box>
  );
}

export default TechnologySection;