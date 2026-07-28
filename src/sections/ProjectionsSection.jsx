import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Users, Target } from "lucide-react";

const MotionPolyline = motion.polyline;
const MotionCircle = motion.circle;

const GOLD = "#FFB200";
const BLUE = "#62daff";
// Conservative vs Realistic need clearly separate hues — gold against cyan
// reads far better on navy than the old teal/cyan pair.
const CONSERVATIVE = "#FFB200";
const REALISTIC = "#4CBDFF";

const RevenueProjections = () => {
  const conservativeData = "0,180 40,160 80,150 120,135 160,125 200,110 240,100 280,85 320,70";
  const realisticData = "0,170 40,140 80,120 120,130 160,100 200,80 240,65 280,45 320,20";

  // Unit cost matches the component breakdown on this page; the margin is
  // derived from it so the three figures can never contradict each other.
  const unitCost = 225;
  const sellingPrice = 400;
  const margin = ((sellingPrice - unitCost) / sellingPrice) * 100;

  const metrics = [
    { label: "Unit Cost", value: `$${unitCost}`, color: "whiteAlpha.700", icon: DollarSign },
    { label: "Selling Price", value: `$${sellingPrice}`, color: GOLD, icon: Target },
    { label: "Subscription", value: "$5/mo", color: BLUE, icon: Users },
    { label: "Target Margin", value: `${margin.toFixed(1)}%`, color: "green.400", icon: TrendingUp },
  ];

  // Lines redraw their climb each time the chart scrolls into view.
  const drawLine = (delay = 0) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: false, margin: "-80px" },
    transition: { duration: 2.2, ease: "easeOut", delay, opacity: { duration: 0.3, delay } },
  });

  return (
    <Box w="100%" py={20} bg="#061529" color="white" overflow="hidden">
      <VStack spacing={12} maxW="1200px" mx="auto" px={{ base: 6, md: 10 }}>

        {/* Header */}
        <VStack spacing={1} align="center" w="100%">
          <Text fontWeight="black" fontSize={{ base: "3xl", md: "4xl" }} letterSpacing="-2px" color="white">
            REVENUE PROJECTION
          </Text>
          <Box bg={GOLD} w="100px" h="6px" borderRadius="full" />
        </VStack>

        <Flex direction={{ base: "column", lg: "row" }} w="100%" gap={12} align="center">

          {/* Left: Chart Area */}
          <VStack flex="1.5" w="100%" align="start" spacing={6}>
            <HStack spacing={6} mb={2}>
              <HStack>
                <Box w="3" h="3" borderRadius="full" bg={CONSERVATIVE} />
                <Text color="whiteAlpha.700" fontSize="xs" fontWeight="bold">Conservative</Text>
              </HStack>
              <HStack>
                <Box w="3" h="3" borderRadius="full" bg={REALISTIC} />
                <Text color="whiteAlpha.700" fontSize="xs" fontWeight="bold">Realistic</Text>
              </HStack>
            </HStack>

            <Box w="100%" h="300px" position="relative" borderLeft="2px solid" borderBottom="2px solid" borderColor="whiteAlpha.300">
              <VStack position="absolute" left="-45px" h="100%" justify="space-between" color="whiteAlpha.500" fontSize="11px" fontWeight="bold">
                <Text>$10k</Text><Text>$7.5k</Text><Text>$5k</Text><Text>$2.5k</Text><Text>$0</Text>
              </VStack>

              <svg viewBox="0 0 320 180" width="100%" height="100%" preserveAspectRatio="none">
                <line x1="0" y1="45" x2="320" y2="45" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4" />
                <line x1="0" y1="90" x2="320" y2="90" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4" />
                <line x1="0" y1="135" x2="320" y2="135" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4" />

                {/* Moving-up draw animation for both revenue lines */}
                <MotionPolyline
                  fill="none"
                  stroke={CONSERVATIVE}
                  strokeWidth="4"
                  points={conservativeData}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  {...drawLine(0)}
                />
                <MotionPolyline
                  fill="none"
                  stroke={REALISTIC}
                  strokeWidth="4"
                  points={realisticData}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  {...drawLine(0.35)}
                />

                {/* End-point pulses once the lines land */}
                <MotionCircle
                  cx="320" cy="70" r="5" fill={CONSERVATIVE}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: [0, 1, 0.6, 1], scale: 1 }}
                  viewport={{ once: false, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 2.1 }}
                />
                <MotionCircle
                  cx="320" cy="20" r="5" fill={REALISTIC}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: [0, 1, 0.6, 1], scale: 1 }}
                  viewport={{ once: false, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 2.5 }}
                />
              </svg>

              <HStack w="100%" justify="space-between" mt={4} color="whiteAlpha.500" fontSize="11px" fontWeight="bold">
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
                bg="rgba(255,255,255,0.05)"
                p={5}
                borderRadius="2xl"
                boxShadow="0 10px 25px rgba(0,0,0,0.35)"
                border="1px solid"
                borderColor="whiteAlpha.100"
                justify="space-between"
                align="center"
              >
                <HStack spacing={4}>
                  <Box p={2} bg="whiteAlpha.100" borderRadius="lg">
                    <metric.icon size={18} color="#A0AEC0" />
                  </Box>
                  <Text color="whiteAlpha.700" fontWeight="bold" fontSize="sm">{metric.label}</Text>
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
            color="whiteAlpha.600"
            textAlign="center"
            lineHeight="tall"
            fontWeight="medium"
          >
            The upward trajectory of the revenue lines across the 12-month period signifies a
            successful transition from initial capital expenditure to a scalable,
            recurring income model.
          </Text>
          <Box bg="whiteAlpha.300" w="40px" h="2px" borderRadius="full" />
        </VStack>

      </VStack>
    </Box>
  );
};

export default RevenueProjections;
