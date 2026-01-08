import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Icon,
  Circle,
  Heading,
  Badge,
} from "@chakra-ui/react";
import { ShieldAlert, Cpu, Power, UserMinus } from "lucide-react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const PrivacySection = () => {
  const layers = [
    {
      number: "01",
      title: "Local-Only Processing",
      subtitle: "The Foundation",
      icon: Cpu,
      color: "orange.400",
      isMostImportant: true,
      points: ["No cloud by default", "No video storage", "Frames processed in memory, then discarded"],
      quote: "All image processing is performed locally on-device. No raw images or videos are stored or transmitted.",
    },
    {
      number: "02",
      title: "Explicit User Control",
      subtitle: "Manual Activation",
      icon: Power,
      color: "blue.400",
      points: ["Manual activation (voice/gesture)", "Camera off by default", "Physical LED indicator when active"],
      quote: "The system only activates during explicit user interaction, with a visible indicator when the camera is on.",
    },
    {
      number: "03",
      title: "Non-Identifying Output",
      subtitle: "Identity Protection",
      icon: UserMinus,
      color: "green.400",
      points: ["No face recognition", "No identity tracking", "No personal data linked to individuals"],
      quote: "LightCare does not identify users or store personal identities. It operates purely on transient visual signals.",
    },
  ];

  return (
    <Box 
      w="100%" 
      py={24} 
      bg="white"
    >
      <VStack 
        spacing={20} 
        maxW="1200px" 
        mx="auto" 
        px={{ base: 6, md: 10 }}
      >
        {/* Header */}
        <VStack spacing={6} textAlign="center">
          <Badge colorScheme="orange" px={4} py={1} borderRadius="full">
            Security First
          </Badge>
          <Heading size="2xl" color="gray.800" letterSpacing="-1px">
            Privacy Built Into the Hardware
          </Heading>
          <Text color="gray.600" fontSize="xl" maxW="800px">
            Wellness shouldn't come at the cost of your personal data.
            Our architecture ensures your reflection stays in your home.
          </Text>
          <br />
        </VStack>

        {/* The Grid Fix: Added explicit 'gap' and 'columns' */}
        <SimpleGrid 
          columns={{ base: 1, lg: 3 }} 
          // Use 'gap' to force a 40px margin between all cards
          gap={10} 
          w="100%"
        >
          {layers.map((layer, index) => (
            <MotionBox
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              
              // Internal Card Styling
              p={10}
              bg="gray.50"
              borderRadius="3xl"
              position="relative"
              border="1px solid"
              borderColor={layer.isMostImportant ? "orange.100" : "gray.100"}
              boxShadow={layer.isMostImportant ? "xl" : "sm"}
              
              // Ensuring the card respects the grid gap
              display="flex"
              flexDirection="column"
              flex="1"
            >
              {layer.isMostImportant && (
                <Badge 
                  position="absolute" 
                  top="-12px" 
                  left="50%" 
                  transform="translateX(-50%)" 
                  bg="#ffbe5cff" 
                  color="white" 
                  px={4} 
                  py={1} 
                  borderRadius="full"
                  zIndex={1}
                >
                  MOST IMPORTANT
                </Badge>
              )}

              <VStack align="start" spacing={6} h="100%">
                <HStack w="100%" justify="space-between">
                  <Circle size="60px" bg="white" color={layer.color} shadow="md">
                    <Icon as={layer.icon} boxSize={8} />
                  </Circle>
                  <Text fontWeight="black" fontSize="4xl" opacity={0.1}>
                    {layer.number}
                  </Text>
                </HStack>

                <VStack align="start" spacing={1}>
                  <Text fontSize="xs" fontWeight="bold" color={layer.color} textTransform="uppercase" letterSpacing="1px">
                    {layer.subtitle}
                  </Text>
                  <Heading size="md" color="gray.800">
                    {layer.title}
                  </Heading>
                </VStack>

                <VStack align="start" spacing={4} flex="1">
                  {layer.points.map((point, pIndex) => (
                    <HStack key={pIndex} align="start" spacing={3}>
                      <Icon as={ShieldAlert} boxSize={4} color={layer.color} mt={1} />
                      <Text color="gray.600" fontSize="sm" lineHeight="tall">
                        {point}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </MotionBox>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default PrivacySection;