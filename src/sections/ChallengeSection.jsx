import { Grid, Text, Box, VStack, HStack, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import useWindowDimensions from '../hooks/useWindowDimensions.jsx';

const MotionBox = motion(Box);

function ChallengeSection() {
  const { width } = useWindowDimensions();
  const isWide = width > 1000;

  const problemCards = [
    {
      title: "Wearables & Apps",
      color: "gray.100",
      icon: FaTimesCircle,
      iconColor: "red.400",
      points: ["High effort to maintain", "Manual data entry", "Charging fatigue"]
    },
    {
      title: "Clinical Solutions",
      color: "gray.100",
      icon: FaTimesCircle,
      iconColor: "red.400",
      points: ["Often sought too late", "High cost barriers", "Invasive procedures"]
    },
    {
      title: "Our Approach",
      color: "orange.50", 
      borderColor: "#ffbe5cff", 
      icon: FaCheckCircle,
      iconColor: "green.400", // Changed icon color to green
      points: ["Passive & non-invasive", "24/7 consistency", "Seamless daily routine"]
    }
  ];

  return (
    <Box 
      mx="auto" 
      w={isWide ? "85vw" : "95vw"} 
      maxW="1200px" 
      py="100px"
      id="mainContent"
    >
      <Grid 
        templateColumns={isWide ? "1.4fr 1fr" : "1fr"} 
        gap={16} 
        alignItems="center"
      >
        
        {/* Left Column: Narrative & Stats */}
        <VStack align="start" spacing={6}>
          <Box>
            <Text fontSize={isWide ? "5xl" : "4xl"} fontWeight="bold" lineHeight="1.1" color="gray.800" whiteSpace="nowrap">
              Wellness Feedback <br />
              <Text as="span" color="#ffbe5cff">Comes Too Late</Text>
            </Text>
            <Text mt={6} color="gray.600" fontSize="lg" whiteSpace="nowrap">
              Modern life moves fast, but awareness hasn't kept up. <br />
              Small issues build quietly until they become major disruptions.
            </Text>
          </Box>

          <VStack align="start" spacing={6} mt={4}>
            {[
              { label: "70%+", desc: "of people experience daily stress or fatigue" },
              { label: "Passive", desc: "The missing link in health monitoring" },
              { label: "Early", desc: "Detection before symptoms get serious" }
            ].map((item, i) => (
              <HStack key={i} align="baseline" spacing={6}>
                <Text 
                  fontSize="3xl" 
                  fontWeight="bold" 
                  color="#ffbe5cff" 
                  minW="110px" 
                  whiteSpace="nowrap"
                >
                  {item.label}
                </Text>
                <Text fontWeight="medium" color="gray.700" fontSize="md" whiteSpace="nowrap">
                  {item.desc}
                </Text>
              </HStack>
            ))}
          </VStack>
        </VStack>

        {/* Right Column: Comparison Cards */}
        <VStack spacing={6} w="100%">
           <Text alignSelf="start" fontWeight="bold" fontSize="xl" color="gray.800" whiteSpace="nowrap">
             Existing Alternatives Fall Short
           </Text>
           
           {problemCards.map((card, idx) => (
             <MotionBox
               key={idx}
               w="100%"
               p={6}
               bg={card.color}
               borderRadius="2xl"
               border={card.borderColor ? "2px solid" : "1px solid"}
               borderColor={card.borderColor || "gray.200"}
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
             >
               <Text fontWeight="bold" fontSize="md" mb={3} color="gray.800" whiteSpace="nowrap">
                 {card.title}
               </Text>
               <VStack align="start" spacing={2}>
                 {card.points.map((point, pIdx) => (
                   <HStack key={pIdx} spacing={3}>
                     <Icon as={card.icon} color={card.iconColor} boxSize={4} />
                     <Text fontSize="sm" color="gray.600" whiteSpace="nowrap">
                       {point}
                     </Text>
                   </HStack>
                 ))}
               </VStack>
             </MotionBox>
           ))}
        </VStack>

      </Grid>
    </Box>
  );
}

export default ChallengeSection;