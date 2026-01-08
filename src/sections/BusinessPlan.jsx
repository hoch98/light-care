import {
  Text,
  Box,
  VStack,
  Flex,
  SimpleGrid,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Layout, RefreshCw, Users, ShieldCheck } from "lucide-react";

const MotionBox = motion(Box);

function BusinessPlan() {
  const sectionWidth = { base: "95%", md: "85%", lg: "75%", xl: "65%" };
  const maxWidth = "1100px";

  const pillars = [
    {
      title: "Phased Growth Strategy",
      icon: Layout,
      desc: "Starting with Prototype Development (USD 5k-10k) via grants, scaling to a 100-unit Pilot Phase funded by angel investors to test market demand.",
    },
    {
      title: "Lean Cost Management",
      icon: ShieldCheck,
      desc: "Utilizing off-the-shelf hardware like Raspberry Pi and Pi Cameras to keep per-unit costs at SGD $370, focusing on a minimal MVP to reduce upfront capital.",
    },
    {
      title: "Sustainable Revenue",
      icon: RefreshCw,
      desc: "Revenue is driven by hardware sales (USD $400) and an optional $5/month subscription for premium AI features, ensuring 5% projected monthly growth.",
    },
    {
      title: "Strategic Partnerships",
      icon: Users,
      desc: "Scaling through hardware suppliers and smart-home ecosystem integration, targeting the 50% of smart home users who now adopt smart mirrors.",
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
      bg="white"
    >
      <VStack spacing={16} w={sectionWidth} maxW={maxWidth}>
        <VStack spacing={5} textAlign="center">
          <VStack spacing={2}>
            <Text
              fontWeight="black"
              fontSize={{ base: "4xl", md: "5xl" }}
              letterSpacing="-2px"
              color="gray.800"
            >
              BUSINESS PLAN
            </Text>
            <Box bg="#ffbe5cff" w="100%" h="8px" borderRadius="full" />
          </VStack>
          <br />
          <Text color="gray.500" fontSize="lg" maxW="800px">
            LightCare is built on a scalable and sustainable model designed to support both individual users and institutions.
          </Text>
        </VStack>

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          columnGap={10}
          rowGap={10}
          w="100%"
          mt={"40px"}
        >
          {pillars.map((pillar, index) => (
            <MotionBox
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              bg="gray.50"
              p={8}
              borderRadius="2xl"
              border="1px solid"
              borderColor="gray.100"
              boxShadow="sm"
              minH="140px"
              _hover={{
                bg: "gray.100",
                transform: "translateY(-4px)",
                transition: "0.2s ease",
              }}
            >
              <Flex align="flex-start" gap={6}>
                <Box
                  p={4}
                  bg="white"
                  borderRadius="xl"
                  boxShadow="sm"
                  color="#ffbe5cff"
                  flexShrink={0}
                >
                  <Icon as={pillar.icon} boxSize={6} />
                </Box>

                <VStack align="start" spacing={2}>
                  <Heading
                    fontSize="md"
                    color="gray.800"
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    {pillar.title}
                  </Heading>
                  <Text color="gray.600" fontSize="sm" lineHeight="tall">
                    {pillar.desc}
                  </Text>
                </VStack>
              </Flex>
            </MotionBox>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}

export default BusinessPlan;
