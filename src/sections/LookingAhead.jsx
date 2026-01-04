import { Grid, GridItem, Text, Box, SimpleGrid, Icon, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import useWindowDimensions from '../hooks/useWindowDimensions.jsx';

const MotionBox = motion(Box);

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
    <Box className="content" pb="100px" px={isWide ? 20 : 6} position="relative" display="flex" flexDirection="column" alignItems="center">
      {/* Background Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.2)', 
        backdropFilter: 'blur(2px)',
        pointerEvents: 'none',
        zIndex: -1,
      }} />

      {/* Header */}
      <Box textAlign={"center"} mb={10} display="flex" flexDirection="column" alignItems={"center"}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Text fontWeight="bold" fontSize={isWide ? "5xl" : "4xl"} color="gray.800">
            LOOKING AHEAD
          </Text>
          <Box mt="10px" mb="20px" bg="#ffbe5cff" w="100%" h="6px" borderRadius="full" />
        </motion.div>
      </Box>

      {/* Intro Box */}
      <Box 
        bg="rgba(255, 255, 255, 0.6)" 
        borderRadius="2xl" 
        border="1px solid rgba(255, 255, 255, 0.4)" 
        boxShadow="xl" 
        p={6} 
        mb={12} 
        w={isWide ? "60vw" : "90vw"}
        textAlign="center"
      >
        <Text fontSize={"lg"} fontWeight="medium" color="gray.700" lineHeight="tall">
          LightCare is currently in prototype development, 
          focusing on refining accuracy, usability, and feedback clarity.
        </Text>
      </Box>

      {/* Milestones Grid */}
      <SimpleGrid 
        columns={isWide ? 4 : 1} 
        gap={6} 
        mb={16} 
        maxW="80%" 
        w="100%"
      >
        {milestones.map((item, index) => (
          <MotionBox 
            key={index} 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3 }} // Subtle lift
            viewport={{ once: true }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.1,
              y: { duration: 0.2, ease: "easeOut" } 
            }}
            p={6} 
            bg="rgba(255, 255, 255, 0.5)" 
            backdropFilter="blur(5px)"
            borderRadius="xl" 
            borderTop="4px solid #ffbe5cff" 
            borderLeft="1px solid rgba(255, 255, 255, 0.3)"
            boxShadow="lg"
            _hover={{ 
              boxShadow: "xl", 
              bg: "white" 
            }}
          >
            <Text fontWeight="bold" fontSize="md" mb={2} color="gray.800">
              {item.title}
            </Text>
            <Text fontSize="xs" color="gray.600" lineHeight="relaxed">
              {item.desc}
            </Text>
          </MotionBox>
        ))}
      </SimpleGrid>

      {/* Footer Statement */}
      <Box 
        border="2px dashed" 
        borderColor="#ffbe5c88" 
        bg="rgba(255, 255, 255, 0.2)"
        borderRadius="2xl" 
        p={isWide ? 10 : 6} 
        textAlign="center"
        w={isWide ? "60vw" : "90vw"}
      >
        <VStack spacing={4}>
          <Text fontSize={isWide ? "xl" : "md"} maxW="900px" color="gray.600" fontWeight="medium">
            Our goal is not to replace medical tools, but to empower people with better daily awareness, 
            starting with the mirror they already use.
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}

export default LookingAhead;