import { Box, Grid, Text, VStack, Heading, Icon, Circle, Image, AspectRatio, SimpleGrid, HStack, Badge } from "@chakra-ui/react";
import { FaCamera, FaBrain, FaLightbulb, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

// A more reliable Metric Card using standard Text components
const TrainingMetricCard = ({ label, value, helpText, color }) => (
  <VStack 
    align="start" 
    p={5} 
    bg="white" 
    borderRadius="2xl" 
    border="1px solid" 
    borderColor="gray.100" 
    boxShadow="sm" 
    spacing={1}
  >
    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
      {label}
    </Text>
    <Heading size="lg" color={color}>
      {value}
    </Heading>
    <Text fontSize="xs" color="gray.400">
      {helpText}
    </Text>
  </VStack>
);

function TechnologySection() {

  return (
    <Box pb={"100px"} px={4} bg="gray.50" id="technology">
      <Box maxW="1200px" mx="auto" pt={0}>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1.5fr" }} gap={12} alignItems="center">
          
          <VStack align="start" spacing={6}>
            <HStack spacing={3}>
              <Circle size="40px" bg="green.50">
                <Icon as={FaChartLine} color="green.500" boxSize={5} />
              </Circle>
              <Heading size="lg" color="gray.800">Training Benchmarks</Heading>
            </HStack>
            
            <Text color="gray.600" fontSize="lg" lineHeight="tall">
              Our models undergo rigorous training cycles. The results show consistent convergence across box, class, and distribution focal loss.
            </Text>
            
            <SimpleGrid columns={2} spacing={4} w="100%">
              {/* Data points derived from your uploaded training results */}
              <TrainingMetricCard 
                label="mAP50 (B)" 
                value="~0.37" 
                helpText="Mean Average Precision" 
                color="green.500" 
              />
              <TrainingMetricCard 
                label="Box Loss" 
                value="2.42" 
                helpText="Final Validation Loss" 
                color="blue.500" 
              />
            </SimpleGrid>
            
            <Badge colorScheme="gray" variant="subtle" px={3} py={1} borderRadius="full">
              YOLOv11-seg Architecture
            </Badge>
          </VStack>

          <Box 
            borderRadius="2xl" 
            overflow="hidden" 
            border="1px solid" 
            borderColor="gray.200" 
            bg="white" 
            p={4} 
            boxShadow="xl"
          >
            <VStack spacing={3}>
                <Image 
                  src="media/how/training_results.png" 
                  alt="YOLOv11 Training Metrics"
                  w="100%"
                  borderRadius="lg"
                />
                <Text fontSize="xs" color="gray.400" textAlign="center">
                  Training vs Validation Loss Convergence over 50 Epochs
                </Text>
            </VStack>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}

export default TechnologySection;