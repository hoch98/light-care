import { Box, Grid, Text, VStack, Heading, Icon, Circle, Image, SimpleGrid, HStack, Badge } from "@chakra-ui/react";
import { FaChartLine, FaBullseye, FaCheckCircle } from "react-icons/fa";

const TrainingMetricCard = ({ label, value, helpText, color, icon }) => (
  <VStack
    align="start"
    p={5}
    bg="white"
    borderRadius="2xl"
    border="1px solid"
    borderColor="gray.100"
    boxShadow="sm"
    spacing={1}
    position="relative"
    overflow="hidden"
  >
    <HStack w="100%" justifyContent="space-between">
      <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
        {label}
      </Text>
      <Icon as={icon} color={`${color}.400`} opacity={0.6} />
    </HStack>
    <Heading size="lg" color={`${color}.500`}>
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
              <Circle size="40px" bg="blue.50">
                <Icon as={FaChartLine} color="blue.500" boxSize={5} />
              </Circle>
              <Heading size="lg" color="gray.800">Training Performance</Heading>
            </HStack>

            <Text color="gray.600" fontSize="lg" lineHeight="tall">
              Our model achieved stable convergence over <b>100 epochs</b>. By utilizing Distribution Focal Loss (DFL), we’ve optimized the network for high-precision spatial localization in complex environments.
            </Text>

            <SimpleGrid columns={2} spacing={4} w="100%">
              <TrainingMetricCard
                label="mAP50-95 (B)"
                value="~0.12"
                helpText="Strict COCO Evaluation"
                color="purple"
                icon={FaBullseye}
              />
              <TrainingMetricCard
                label="Precision"
                value="~44.1%"
                helpText="Detection Accuracy"
                color="green"
                icon={FaCheckCircle}
              />
            </SimpleGrid>

            <Badge colorScheme="blue" variant="subtle" px={3} py={1} borderRadius="full">
              YOLOv11 Architecture • 100 Epochs
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
                alt="YOLOv11 100 Epoch Training Metrics"
                w="100%"
                borderRadius="lg"
              />
              <Text fontSize="xs" color="gray.400" textAlign="center">
                Full 100-Epoch Training Cycle: Loss Minimization & Metric Improvement
              </Text>
            </VStack>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}

export default TechnologySection;