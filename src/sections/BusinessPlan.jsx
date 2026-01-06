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
      title: "Flexible Offering",
      icon: Layout,
      desc: "Smart wellness mirrors can be sold or leased to homes, schools, offices, and wellness spaces.",
    },
    {
      title: "Recurring Revenue",
      icon: RefreshCw,
      desc: "Optional software subscriptions provide updates, maintenance, and feature enhancements.",
    },
    {
      title: "Institutional Partnerships",
      icon: Users,
      desc: "Schools and organisations enable shared access while reducing per-user costs.",
    },
    {
      title: "Low Regulatory Barrier",
      icon: ShieldCheck,
      desc: "Positioned as a preventive wellness tool, avoiding medical device classification.",
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
        {/* HEADER */}
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

        {/* CARDS */}
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
                {/* ICON */}
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

                {/* TEXT */}
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
