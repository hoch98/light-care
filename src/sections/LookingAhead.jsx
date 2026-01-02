import { Grid, GridItem, Text, Box, SimpleGrid, Icon, VStack } from "@chakra-ui/react";
import useWindowDimensions from '../hooks/useWindowDimensions.jsx';

function LookingAhead() {
  const { width } = useWindowDimensions();
  const isWide = width > 1200;

  const milestones = [
    {
      title: "Refining Accuracy",
      desc: "Optimizing our AI models to detect symptoms with lower error occurence."
    },
    {
      title: "Trend Tracking",
      desc: "Developing a data system to help users view wellness patterns over longer periods of time, not just a single morning."
    },
    {
      title: "Expanded Insights",
      desc: "Including additional wellness markers such as face reflectiveness and hydration levels."
    },
    {
      title: "Pilot Testing",
      desc: "Moving beyond internal prototyping to real-world testing environments to gather user feedback on the mirror's interface and utility."
    }
  ];

  return (
    <Box className="content" mb="100px" px={isWide ? 20 : 6}>
      <Box textAlign={"center"} mb={10} display="flex" flexDirection="column" alignItems={"center"}>
        <Box>
          <Text fontWeight="bold" fontSize={isWide ? "5xl" : "4xl"}>
            LOOKING AHEAD
          </Text>
          <Box mt="10px" mb="20px" bg="#ffbe5cff" w="100%" h="10px" />
        </Box>
      </Box>

      <Box 
        bg="white" 
        borderRadius="2xl" 
        boxShadow="md" 
        p={6} 
        mb={12} 
        w={isWide? "70vw" : "90vw"}
        textAlign="center"
      >
        <Text fontSize={"lg"} fontWeight="medium" color="gray.700" lineHeight="tall">
          LightCare is currently in prototype development, 
          focusing on refining accuracy, usability, and feedback clarity.
        </Text>
      </Box>

      <SimpleGrid columns={isWide ? 4 : 1} gap={8} mb={16}>
        {milestones.map((item, index) => (
          <Box 
            key={index} 
            p={6} 
            bg="whiteAlpha.700" 
            borderRadius="xl" 
            borderTop="4px solid #ffbe5cff" 
            boxShadow="sm"
          >
            <Text fontWeight="bold" fontSize="lg" mb={3} color="gray.800">
              {item.title}
            </Text>
            <Text fontSize="sm" color="gray.600" lineHeight="relaxed">
              {item.desc}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      <Box 
        border="2px dashed" 
        borderColor="#ffbe5cff" 
        borderRadius="2xl" 
        p={isWide ? 10 : 6} 
        textAlign="center"
      >
        <VStack spacing={4}>
          <Text fontSize={isWide ? "xl" : "md"} maxW="900px" color="gray.600">
            Our goal is not to replace medical tools, but to empower people with better daily awareness, 
            starting with the mirror they already use.
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}

export default LookingAhead;