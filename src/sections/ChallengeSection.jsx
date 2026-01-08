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
      iconColor: "green.400",
      points: ["Passive & non-invasive", "24/7 consistency", "Seamless daily routine"]
    }
  ];

  return (
    <Box 
      mx="auto" 
      w={isWide ? "85vw" : "90vw"} // Slightly tighter width on mobile
      maxW="1200px" 
      py={{ base: "60px", md: "100px" }} // Less padding on mobile
      id="mainContent"
    >
      <Grid 
        templateColumns={isWide ? "1.4fr 1fr" : "1fr"} 
        gap={{ base: 10, md: 16 }} 
        alignItems="center"
      >
        
        {/* Left Column: Narrative & Stats */}
        <VStack align="start" spacing={6} w="100%">
          <Box w="100%">
            <Text 
              fontSize={{ base: "3xl", md: "5xl" }} // Scale font size down for mobile
              fontWeight="bold" 
              lineHeight="1.1" 
              color="gray.800"
              // Removed whiteSpace="nowrap" to allow wrapping on small screens
            >
              Wellness Feedback <br />
              <Text as="span" color="#ffbe5cff">Comes Too Late</Text>
            </Text>
            <Text 
              mt={6} 
              color="gray.600" 
              fontSize={{ base: "md", md: "lg" }}
              maxW="500px" // Limits width so it doesn't stretch too far on desktop
            >
              Modern life moves fast, but awareness hasn't kept up. 
              Small issues build quietly until they become major disruptions.
            </Text>
          </Box>

          <VStack align="start" spacing={6} mt={4} w="100%">
            {[
              { label: "73%", desc: "of people report regular stress or burnout" },
              { label: "1 in 3", desc: "adults get insufficient sleep on a regular basis" },
              { label: "60%+", desc: "of health issues are linked to lifestyle factors" }
            ].map((item, i) => (
              <HStack key={i} align="center" spacing={6} w="100%">
                <Text 
                  fontSize={{ base: "2xl", md: "3xl" }} 
                  fontWeight="bold" 
                  color="#ffbe5cff" 
                  minW={{ base: "80px", md: "110px" }} // Responsive min-width
                >
                  {item.label}
                </Text>
                <Text 
                  fontWeight="medium" 
                  color="gray.700" 
                  fontSize={{ base: "sm", md: "md" }}
                >
                  {item.desc}
                </Text>
              </HStack>
            ))}
          </VStack>
        </VStack>

        {/* Right Column: Comparison Cards */}
        <VStack spacing={6} w="100%">
           <Text alignSelf="start" fontWeight="bold" fontSize="xl" color="gray.800">
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
               <Text fontWeight="bold" fontSize="md" mb={3} color="gray.800">
                 {card.title}
               </Text>
               <VStack align="start" spacing={2}>
                 {card.points.map((point, pIdx) => (
                   <HStack key={pIdx} spacing={3}>
                     <Icon as={card.icon} color={card.iconColor} boxSize={4} />
                     <Text fontSize="sm" color="gray.600">
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