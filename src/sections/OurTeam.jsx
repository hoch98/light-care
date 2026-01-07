import { Grid, Text, Box, Image, SimpleGrid, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import useWindowDimensions from '../hooks/useWindowDimensions.jsx';

const MotionBox = motion(Box);

export default function OurTeamSection() {
  const { width } = useWindowDimensions();
  const isWide = width > 1200;

  const profiles = [
    {
      name: "Yin Hoi Aiden Wong",
      imageSrc: "media/about/aiden.jpg",
      blurb: "Responsible for creativity and ideation, contributing original concepts and helping visualize the innovation in a simple, user friendly way. His work shapes the design and communication of the project.",
    },
    {
      name: "Felix Wang",
      imageSrc: "media/about/felix.png",
      blurb: "Serves as the team lead and manager, overseeing project direction coordinaiting responsibilities, managing deadlines. He also lead in decision making, and played a crucial role in the hardware designing area",
    },
    {
      name: "Ho Yun Chen",
      imageSrc: "media/about/hoyun.jpg",
      blurb: "Leads the software development, building and maintaining the system's software architecture and implementing the core features of the design.   "
    },
  ];

  const values = [
    { title: "Accessibility", desc: "No wearables, no discomfort, no barriers" },
    { title: "Ethics", desc: "Privacy-first, wellness-focused, non-diagnostic" },
    { title: "Simplicity", desc: "Clear insights, not overwhelming data" },
    { title: "Prevention", desc: "Helping people act early, not react late" },
  ];

  return (
    <div className="content" style={{ marginBottom: "20px", marginTop: "120px" }}>
      {/* Header with Fade-in */}
      <Box textAlign={"center"} mb={10} display="flex" flexDirection="column" alignItems={"center"}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Text fontWeight="bold" fontSize={isWide ? "5xl" : "4xl"}>
            OUR TEAM
            <div style={{ marginTop: "10px", marginBottom: "20px", backgroundColor: "#ffbe5cff", width: "100%", height: "10px", borderRadius: "10px" }} />
          </Text>
        </motion.div>
      </Box>

      {/* Main Container with original width/position + Glass Effect */}
      <Box
        bg="whiteAlpha.700"
        backdropFilter="blur(10px) saturate(120%)"
        borderRadius="2xl"
        boxShadow="xl"
        p={isWide ? 12 : 8}
        mb={10}
        mx={isWide ? 20 : 4}
        border="1px solid"
        borderColor="whiteAlpha.500"
      >
        <VStack align="center" spacing={8} mx="auto" maxW="800px" mb={12}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Box textAlign="center" mb={4}>
              <Text fontSize="25px" color="gray.700">
                <span style={{ fontWeight: "bold", color: "#416D9F" }}>Our Mission</span> is to make everyday wellness awareness simple, accessible, and effortless.
              </Text>
            </Box>

            <Box textAlign="center">
              <Text fontSize="25px" color="gray.700">
                <span style={{ fontWeight: "bold", color: "#ffb700ff" }}>Our Vision</span> is to shape a future where people can understand their wellbeing in seconds, just by looking in the mirror.
              </Text>
            </Box>
          </motion.div>
        </VStack>

        <Grid templateColumns={isWide ? "repeat(3, 1fr)" : "1fr"} gap={10} px={isWide ? 0 : 4} mt={10}>
          {profiles.map((p, index) => (
            <MotionBox 
              key={p.name} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              bg="white" 
              borderRadius="xl" 
              boxShadow="md" 
              p={8} 
              textAlign="center"
              _hover={{ transform: "translateY(-5px)", boxShadow: "2xl" }}
            >
              <Box overflow="hidden" borderRadius="full" boxSize="240px" mx="auto" mb={4}>
                <Image
                  src={p.imageSrc}
                  alt={p.name}
                  boxSize="100%"
                  objectFit="cover"
                  transition="transform 0.5s ease"
                  _hover={{ transform: "scale(1.1)" }}
                />
              </Box>
              <Text fontWeight="bold" fontSize="lg" color="gray.800">{p.name}</Text>
              <Box w="30px" h="3px" bg="#ffbe5cff" mx="auto" mt={2} mb={3} />
              <Text mt={3} fontSize="sm" color="gray.600" lineHeight="taller">{p.blurb}</Text>
            </MotionBox>
          ))}
        </Grid>
      </Box>

      {/* Values Section with Staggered Reveal */}
      <Box mb={16} mx={isWide ? 20 : 4}>
        <Text textAlign="center" fontWeight="bold" fontSize="3xl" mb={8}>OUR VALUES</Text>
        <SimpleGrid columns={isWide ? 4 : 2} gap={6}>
          {values.map((v, index) => (
            <MotionBox 
              key={v.title} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              bg="whiteAlpha.800" 
              backdropFilter="blur(5px)"
              border="1px solid" 
              borderColor="gray.100" 
              p={6} 
              borderRadius="xl" 
              textAlign="center"
              boxShadow="sm"
              _hover={{ bg: "white", boxShadow: "md", transform: "translateY(-2px)" }}
            >
              <Text fontWeight="bold" color="#ffbe5cff" mb={2} letterSpacing="wider" textTransform="uppercase" fontSize="xs">
                {v.title}
              </Text>
              <Text fontSize="sm" color="gray.600" fontWeight="medium">{v.desc}</Text>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Box>
    </div>
  );
}