import { Text, Box, VStack, SimpleGrid, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const GOLD = "#FFB200";

function BuiltForYou() {
  const leftFeatures = [
    { title: "Effortless Use", desc: "Works during routines you already have with zero friction." },
    { title: "Long-term Return", desc: "Hardware investment that improves as AI learns your baseline." },
  ];
  const rightFeatures = [
    { title: "Pattern Insight", desc: "Flags persistent changes rather than one-off daily noise." },
    { title: "Wellness-Focused", desc: "Surfaces lifestyle factors like sleep — never a diagnosis." },
  ];

  return (
    <Box w="100%" bg="#0E0F14" py={{ base: 16, md: 24 }} position="relative" overflow="hidden">
      
      {/* Scaled-down Background Flair */}
      {[1, 2, 3, 4].map((ring) => (
        <MotionBox
          key={ring} position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)"
          w={`${ring * 180}px`} h={`${ring * 180}px`} borderRadius="full"
          border={`${ring}px dashed rgba(255, 178, 0, 0.15)`}
          animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 60 + ring * 10, repeat: Infinity, ease: "linear" }}
          zIndex="0"
        />
      ))}

      <Box maxW="1100px" mx="auto" px={{ base: 6, md: 8 }} position="relative" zIndex={1}>
        <VStack align="center" spacing={3} mb={16}>
          <Text fontSize="sm" fontWeight="800" color={GOLD} textTransform="uppercase" letterSpacing="0.1em">
            Why It Works
          </Text>
          <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="800" color="white" textAlign="center" bg="#0E0F14" px={4}>
            Built for you, not another app.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8} alignContent="center" alignItems="center">
          
          <VStack spacing={6} align="stretch">
            {leftFeatures.map((f, i) => (
              <MotionBox key={f.title} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} p={6} bg="rgba(0,0,0,0.6)" border={`1px solid rgba(255,178,0,0.3)`} borderRadius="12px" textAlign={{ base: "left", lg: "right" }}>
                <Text fontWeight="800" fontSize="lg" color={GOLD} mb={1}>{f.title}</Text>
                <Text color="whiteAlpha.800" fontSize="sm" fontWeight="500">{f.desc}</Text>
              </MotionBox>
            ))}
          </VStack>

          <MotionBox initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} zIndex={2}>
            <Box p={3} borderRadius="24px" bg="#1D1D1F" border={`2px solid ${GOLD}`} boxShadow={`0 0 40px rgba(255,178,0,0.2)`}>
              <Image src="/media/hero.png" alt="Product visual" w="100%" h={{ base: "250px", md: "380px" }} objectFit="contain" />
            </Box>
          </MotionBox>

          <VStack spacing={6} align="stretch">
            {rightFeatures.map((f, i) => (
              <MotionBox key={f.title} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} p={6} bg="rgba(0,0,0,0.6)" border={`1px solid rgba(255,178,0,0.3)`} borderRadius="12px">
                <Text fontWeight="800" fontSize="lg" color={GOLD} mb={1}>{f.title}</Text>
                <Text color="whiteAlpha.800" fontSize="sm" fontWeight="500">{f.desc}</Text>
              </MotionBox>
            ))}
          </VStack>

        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default BuiltForYou;