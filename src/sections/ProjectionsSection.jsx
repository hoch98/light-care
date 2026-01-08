import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { TrendingUp, DollarSign, Users, Target } from "lucide-react";

const RevenueProjections = () => {
  const conservativeData = "0,180 40,160 80,150 120,135 160,125 200,110 240,100 280,85 320,70";
  const realisticData = "0,170 40,140 80,120 120,130 160,100 200,80 240,65 280,45 320,20";

  const metrics = [
    { label: "Unit Cost", value: "$350", color: "gray.500", icon: DollarSign },
    { label: "Selling Price", value: "$400", color: "orange.400", icon: Target },
    { label: "Subscription", value: "$5/mo", color: "blue.400", icon: Users },
    { label: "Target Margin", value: "12.5%", color: "green.500", icon: TrendingUp },
  ];

  return (
    <Box w="100%" py={20} bg="#F7FAFC" borderRadius={{ base: "0", md: "50px" }} overflow="hidden">
      <VStack spacing={12} maxW="1200px" mx="auto" px={{ base: 6, md: 10 }}>

        {/* Header */}
        <VStack spacing={1} align="center" w="100%">
          <Text fontWeight="black" fontSize={{ base: "3xl", md: "4xl" }} letterSpacing="-2px" color="gray.800">
            REVENUE PROJECTION
          </Text>
          <Box bg="#ffbe5cff" w="100px" h="6px" borderRadius="full" />
        </VStack>

        <Flex direction={{ base: "column", lg: "row" }} w="100%" gap={12} align="center">

          {/* Left: Chart Area */}
          <VStack flex="1.5" w="100%" align="start" spacing={6}>
            <HStack spacing={6} mb={2}>
              <HStack>
                <Box w="3" h="3" borderRadius="full" bg="cyan.400" />
                <Text color="gray.600" fontSize="xs" fontWeight="bold">Conservative</Text>
              </HStack>
              <HStack>
                <Box w="3" h="3" borderRadius="full" bg="blue.400" />
                <Text color="gray.600" fontSize="xs" fontWeight="bold">Realistic</Text>
              </HStack>
            </HStack>

            <Box w="100%" h="300px" position="relative" borderLeft="2px solid" borderBottom="2px solid" borderColor="gray.200">
              <VStack position="absolute" left="-45px" h="100%" justify="space-between" color="gray.400" fontSize="11px" fontWeight="bold">
                <Text>$10k</Text><Text>$7.5k</Text><Text>$5k</Text><Text>$2.5k</Text><Text>$0</Text>
              </VStack>

              <svg viewBox="0 0 320 180" width="100%" height="100%" preserveAspectRatio="none">
                <line x1="0" y1="45" x2="320" y2="45" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4" />
                <line x1="0" y1="90" x2="320" y2="90" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4" />
                <line x1="0" y1="135" x2="320" y2="135" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4" />

                <polyline
                  fill="none"
                  stroke="#4FD1C5"
                  strokeWidth="4"
                  points={conservativeData}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <polyline
                  fill="none"
                  stroke="#3182CE"
                  strokeWidth="4"
                  points={realisticData}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>

              <HStack w="100%" justify="space-between" mt={4} color="gray.400" fontSize="11px" fontWeight="bold">
                <Text>Month 1</Text><Text>Month 3</Text><Text>Month 6</Text><Text>Month 9</Text><Text>Month 12</Text>
              </HStack>
            </Box>
          </VStack>

          {/* Right: Metrics */}
          <VStack flex="1" w="100%" spacing={4}>
            {metrics.map((metric, index) => (
              <Flex
                key={index}
                w="100%"
                bg="white"
                p={5}
                borderRadius="2xl"
                boxShadow="sm"
                border="1px solid"
                borderColor="gray.100"
                justify="space-between"
                align="center"
              >
                <HStack spacing={4}>
                  <Box p={2} bg="gray.50" borderRadius="lg">
                    <metric.icon size={18} color="#4A5568" />
                  </Box>
                  <Text color="gray.600" fontWeight="bold" fontSize="sm">{metric.label}</Text>
                </HStack>
                <Text color={metric.color} fontWeight="900" fontSize="xl">{metric.value}</Text>
              </Flex>
            ))}
          </VStack>
        </Flex>

        {/* Final Insight Text */}
        <VStack spacing={3} align="center" w="100%" maxW="800px" pt={8}>
          <br />
          <Text 
            fontSize={{ base: "sm", md: "md" }} 
            color="gray.500" 
            textAlign="center" 
            lineHeight="tall"
            fontWeight="medium"
          >
            The upward trajectory of the revenue lines across the 12-month period signifies a 
            successful transition from initial capital expenditure to a scalable, 
            recurring income model.
          </Text>
          <Box bg="gray.200" w="40px" h="2px" borderRadius="full" />
        </VStack>

      </VStack>
    </Box>
  );
};

export default RevenueProjections;