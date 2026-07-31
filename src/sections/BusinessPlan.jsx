import { Text, Box, VStack, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const GOLD = "#FFB200";

function BusinessPlan() {
  const pillars = [
    { n: "01", title: "Phased Growth", desc: "Prototype development funded by grants, scaling to a 100-unit pilot backed by angel investors." },
    { n: "02", title: "Lean Cost Management", desc: "Off-the-shelf hardware keeps per-unit cost near SGD $370, focused on a minimal MVP." },
    { n: "03", title: "Sustainable Revenue", desc: "Hardware sales at USD $400, plus an optional $5/month subscription for premium AI features." },
    { n: "04", title: "Strategic Partnerships", desc: "Scaling through hardware suppliers and smart-home ecosystem integration." },
  ];

  return (
    <Box w="100%" bg="#061529" py={{ base: 16, md: 24 }} position="relative" overflow="hidden">
      
      {/* Scaled-down Background Flair */}
      <MotionBox
        position="absolute" top="15%" left="0" whiteSpace="nowrap" zIndex="0" opacity="0.03"
        animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <Text fontSize="100px" fontWeight="900" color="white" lineHeight="1">
          SCALE SCALE SCALE SCALE SCALE SCALE SCALE SCALE
        </Text>
      </MotionBox>

      <MotionBox
        position="absolute" bottom="0" right="-5%" w="300px" h="300px" bg="rgba(255, 178, 0, 0.05)" borderRadius="30px"
        transform="rotate(45deg)" animate={{ rotate: [45, 90, 45] }} transition={{ duration: 25, repeat: Infinity }} zIndex="0"
      />

      <Box maxW="1100px" mx="auto" px={{ base: 6, md: 8 }} position="relative" zIndex={1}>
        <Flex direction={{ base: "column", lg: "row" }} gap={10}>
          
          <VStack align="start" spacing={3} maxW="350px" position={{ lg: "sticky" }} top={{ lg: "150px" }} h="max-content">
            <Text fontSize="sm" fontWeight="800" color={GOLD} bg="rgba(255,178,0,0.15)" px={3} py={1} borderRadius="md">
              BUSINESS MODEL
            </Text>
            <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="800" lineHeight="1.1" color="white">
              Built to scale deliberately.
            </Text>
          </VStack>

          <VStack align="stretch" spacing={6} flex="1" pt={{ base: 6, lg: 12 }}>
            {pillars.map((p, i) => (
              <MotionBox
                key={p.n}
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }}
                p={8} ml={{ md: `${i * 8}%` }} w={{ base: "100%", md: "85%" }}
                bg="#0E2B50" borderLeft={`4px solid ${GOLD}`} borderRight="1px solid rgba(255,255,255,0.05)" borderTop="1px solid rgba(255,255,255,0.05)" borderBottom="1px solid rgba(255,255,255,0.05)"
                boxShadow="0 15px 30px rgba(0,0,0,0.3)"
              >
                <Text fontSize="4xl" fontWeight="900" color="rgba(255,178,0,0.3)" lineHeight="1" mb={2}>{p.n}</Text>
                <Text fontWeight="800" fontSize="xl" color="white" mb={1}>{p.title}</Text>
                <Text color="#A1A1AA" fontSize="sm" fontWeight="500">{p.desc}</Text>
              </MotionBox>
            ))}
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
}

export default BusinessPlan;