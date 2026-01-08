import {
  Text,
  Box,
  VStack,
  Flex,
  Icon,
  Heading,
  Circle,
  Image
} from "@chakra-ui/react";

import { motion } from "framer-motion";
import { Zap, BrainCircuit, ShieldCheck, HeartPulse } from "lucide-react";

const MotionFlex = motion(Flex);

function BuiltForYou() {
  const sectionWidth = { base: "95%", md: "85%", lg: "80%", xl: "70%" };
  const maxWidth = "1200px";

  const features = [
    {
      title: "Effortless Use",
      icon: Zap,
      desc: "Can operate during daily routines, such as brushing teeth, with little to no interaction required, allowing for seamless integration into user's everyday life.",
    },
    {
      title: "Long-Term Return",
      icon: BrainCircuit,
      desc: "A one-time hardware investment designed for multi-year use. ROI improves over time as the system learns user baselines, supported by continuous software updates.",
    },
    {
      title: "Privacy by Design",
      icon: ShieldCheck,
      desc: "While the mirror is connected to the internet to fetch weather data, all processing and inference is done locally, ensuring no threat to privacy from third parties.",
    },
    {
      title: "Wellness-Focused",
      icon: HeartPulse,
      desc: "Designed to support everyday wellbeing by highlighting potential lifestyle factors such as sleep, stress, and hydration, while avoiding medical diagnoses.",
    },
  ];

  return (
    <Box
      w="100%"
      minH="50vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      py={24}
      bg="gray.50" // Alternating background color from the white Business section
    >
      <VStack spacing={16} w={sectionWidth} maxW={maxWidth}>

        {/* HEADER */}
        <VStack spacing={4} textAlign="center">
          <VStack spacing={0}>
            <Text fontWeight="black" fontSize={{ base: "4xl", md: "5xl" }} letterSpacing="-2px" color="gray.800">
              BUILT FOR YOU
            </Text>
            <Box bg="#ffbe5cff" w="100%" h="8px" borderRadius="full" />
          </VStack>
          <br />
          <Text color="gray.600" fontSize="lg" maxW="700px">
            LightCare fits seamlessly into everyday routines—no wearables, apps, or extra effort required.
          </Text>
        </VStack>

        {/* ALTERNATIVE LAYOUT: Split List Design */}
        <Flex
          // Changed "row" to "row-reverse" to flip the visual order
          direction={{ base: "column", lg: "row-reverse" }}
          w="100%"
          gap={12}
          align="center"
          mt={"20px"}
        >
          {/* THIS IS NOW VISUALLY ON THE RIGHT */}
          <Box
            flex="1"
            bg="white"
            p={10}
            borderRadius="3xl"
            boxShadow="2xl"
            border="1px solid"
            borderColor="gray.100"
            textAlign="center"
          >
            <Heading size="lg" mb={6} color="gray.800">The Seamless Experience</Heading>
            <Text color="gray.500" mb={8}>
              We believe wellness shouldn't be a chore. LightCare transforms your reflection into a partner in health.
            </Text>
            <Image
              src="/media/hero.png"
              alt="LightCare product visual"
              h="400px"
              w="100%"
              objectFit="contain"
              borderRadius="2xl"
            />
          </Box>

          {/* THIS IS NOW VISUALLY ON THE LEFT */}
          <VStack flex="1.2" spacing={0} align="stretch" position="relative" mt={"20px"}>
            {features.map((item, index) => (
              <MotionFlex
                key={index}
                // Swapped initial x: 30 to x: -30 so they slide in from the left instead
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                mb={8}
                align="start"
              >
                <VStack mr={6} spacing={0}>
                  <Circle size="48px" bg="white" border="2px solid" borderColor="#ffbe5cff" color="#ffbe5cff" shadow="md">
                    <Icon as={item.icon} boxSize={5} />
                  </Circle>
                  {index !== features.length - 1 && (
                    <Box w="2px" h="50px" bg="gray.200" my={2} />
                  )}
                </VStack>

                <VStack align="start" spacing={1} pt={2}>
                  <Text fontWeight="bold" fontSize="lg" color="gray.800">
                    {item.title}
                  </Text>
                  <Text color="gray.500">
                    {item.desc}
                  </Text>
                </VStack>
              </MotionFlex>
            ))}
          </VStack>
        </Flex>
      </VStack>
    </Box>
  );
}

export default BuiltForYou;