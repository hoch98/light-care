import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { Rocket, Users, TrendingUp, ShieldCheck } from "lucide-react";

const FinanceSection = () => {
  const costData = [
    { label: "Display", value: 100, color: "#ED8936" },
    { label: "Raspberry Pi", value: 100, color: "#A0AEC0" },
    { label: "Pi Camera", value: 50, color: "#CBD5E0" },
    { label: "Mirror", value: 50, color: "#63B3ED" },
    { label: "Other", value: 30, color: "#4299E1" },
    { label: "Casing", value: 20, color: "#BEE3F8" },
  ];

  const total = 350;

  let cumulativePercentage = 0;
  const gradientString = costData
    .map((item) => {
      const start = cumulativePercentage;
      cumulativePercentage += (item.value / total) * 100;
      return `${item.color} ${start}% ${cumulativePercentage}%`;
    })
    .join(", ");

  const phases = [
    {
      title: "Prototype Development",
      timeline: "1-5 units",
      funding: "School grants, competitions, or crowdfunding (~USD 5k-10k).",
      icon: Rocket,
    },
    {
      title: "Pilot Phase",
      timeline: "~100 units",
      funding: "Angel investors or tech incubators (~USD 20k-30k).",
      icon: Users,
    },
    {
      title: "Scale-Up / Rollout",
      timeline: "Mass Market",
      funding: "Pre-orders and optional subscription for premium AI features.",
      icon: TrendingUp,
    },
    {
      title: "Efficiency Optimization",
      timeline: "",
      funding: "Utilizing off-the-shelf hardware (Raspberry Pi) and modular casing to minimize R&D capital.",
      icon: ShieldCheck,
      isSpecial: true
    },
  ];

  return (
    <Box w="100%" py={20} bg="#0A0B0E" color="white">
      <VStack spacing={12} maxW="1200px" mx="auto" px={{ base: 6, md: 10 }}>
        
        <VStack spacing={1} align="center" w="100%">
          <Text fontWeight="black" fontSize={{ base: "3xl", md: "4xl" }} letterSpacing="-2px" color="white">
            FINANCES
          </Text>
          <Box bg="#FFB200" w="100px" h="6px" borderRadius="full" />
        </VStack>
        <br />

        <Flex direction={{ base: "column", lg: "row" }} w="100%" gap={{ base: 12, lg: 20 }} align="center">
          
          <VStack flex="1.2" spacing={8} w="100%">
            <Box position="relative">
              <Box
                w={{ base: "260px", md: "320px" }}
                h={{ base: "260px", md: "320px" }}
                borderRadius="full"
                background={`conic-gradient(${gradientString})`}
                display="flex"
                alignItems="center"
                justifyContent="center"
                shadow="xl"
              >
                <Box
                  w={{ base: "130px", md: "160px" }}
                  h={{ base: "130px", md: "160px" }}
                  bg="#101118"
                  borderRadius="full"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  shadow="inner"
                >
                  <Text fontSize="10px" color="whiteAlpha.600" fontWeight="bold">TOTAL COST</Text>
                  <Text fontSize="xl" fontWeight="black" color="white">SGD$350</Text>
                </Box>
              </Box>
            </Box>
            <br />
            <Flex wrap="wrap" justify="center" gap={3}>
              {costData.map((item, i) => (
                <HStack key={i} spacing={1.5}>
                  <Box w="10px" h="10px" borderRadius="sm" bg={item.color} />
                  <Text fontSize="xs" fontWeight="bold" color="whiteAlpha.700">
                    {item.label}
                  </Text>
                </HStack>
              ))}
            </Flex>
          </VStack>

          <VStack align="stretch" spacing={0} flex="1">
            <Text fontSize="xs" fontWeight="bold" color="#FFB200" mb={4} textTransform="uppercase" letterSpacing="widest">
                Growth Strategy
            </Text>
            
            {phases.map((phase, index) => (
              <Box key={index}>
                <HStack align="start" spacing={4}>
                  <VStack spacing={0}>
                    <Flex 
                      w="40px" h="40px" minW="40px" 
                      bg={phase.isSpecial ? "rgba(255,178,0,0.12)" : "rgba(255,255,255,0.06)"} 
                      rounded="full" shadow="sm" 
                      align="center" justify="center" 
                      border="1px solid" 
                      borderColor={phase.isSpecial ? "rgba(255,178,0,0.35)" : "whiteAlpha.200"} 
                      zIndex={1}
                    >
                      <phase.icon size={18} color={phase.isSpecial ? "#ED8936" : "#ffbe5cff"} />
                    </Flex>
                    {index !== phases.length - 1 && (
                      <Box w="2px" h="45px" bg="whiteAlpha.200" />
                    )}
                  </VStack>
                  
                  <VStack align="start" spacing={0.5} pt={0.5}>
                    <HStack spacing={2}>
                      <Heading size="sm" color="white" fontWeight="800">{phase.title}</Heading>
                      <Box bg={phase.isSpecial ? "whiteAlpha.200" : "rgba(255,178,0,0.15)"} px={2} py={0} borderRadius="full">
                        <Text fontSize="10px" fontWeight="bold" color={phase.isSpecial ? "whiteAlpha.800" : "#FFC94D"}>
                          {phase.timeline}
                        </Text>
                      </Box>
                    </HStack>
                    <Text color="whiteAlpha.700" fontSize="13px" lineHeight="short" maxW="380px">
                      {phase.funding}
                    </Text>
                  </VStack>
                </HStack>
                {index !== phases.length - 1 && <Box h={2} />}
              </Box>
            ))}
          </VStack>

        </Flex>
      </VStack>
    </Box>
  );
};

export default FinanceSection;