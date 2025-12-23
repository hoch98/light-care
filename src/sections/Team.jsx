import { Grid, GridItem, Text, Box, Flex, Image, SimpleGrid, VStack, Heading } from "@chakra-ui/react";
import useWindowDimensions from '../hooks/useWindowDimensions.jsx';

export default function OurTeamSection() {
  const { width } = useWindowDimensions();
  const isWide = width > 1200;

  const profiles = [
    {
      name: "Aiden Wong",
      role: "Creativity",
      blurb: "Brainstorms ideas and helps visualise them in a simple and concise manner.",
    },
    {
      name: "Felix Wang",
      role: "Management",
      blurb: "To guide, support, and encourage our group, directing our project from concept to reality",
    },
    {
      name: "Ho Yun Chen",
      role: "Software Development",
      blurb: "Builds and maintains the software architecture that powers the project."
    },
  ];

  const values = [
    { title: "Accessibility", desc: "No wearables, no discomfort, no barriers" },
    { title: "Ethics", desc: "Privacy-first, wellness-focused, non-diagnostic" },
    { title: "Simplicity", desc: "Clear insights, not overwhelming data" },
    { title: "Prevention", desc: "Helping people act early, not react late" },
  ];

  return (
    <div className="content" style={{ marginBottom: "20px" }}>
      {/* Heading */}
      <Box textAlign={"center"} mb={10} display="flex" flexDirection="column" alignItems={"center"}>
        <Text fontWeight="bold" fontSize={isWide ? "5xl" : "4xl"}>
          OUR TEAM
          <div style={{ marginTop: "10px", marginBottom: "20px", backgroundColor: "#ffbe5cff", width: "100%", height: "10px" }} />
        </Text>
      </Box>

      {/* Mission & Vision Card */}
      <Box
        bg="whiteAlpha.700"
        backdropFilter="blur(6px) saturate(120%)"
        borderRadius="2xl"
        boxShadow="md"
        p={isWide ? 12 : 8}
        mb={10}
        mx={isWide ? 20 : 4}
      >
        <Grid templateColumns={isWide ? "1.5fr 1fr" : "1fr"} gap={12} alignItems="center">
          <VStack align={isWide ? "left" : "center"} spacing={8}>
            <Box textAlign={isWide ? "left" : "center"}>
              <Text fontSize="lg" color="gray.700"><span style={{fontWeight:"bold"}}>Our Mission</span> is to make everyday wellness awareness simple, accessible, and effortless.</Text>
            </Box>
            
            <Box textAlign={isWide ? "left" : "center"}>
              <Text fontSize="lg" color="gray.700"><span style={{fontWeight:"bold"}}>Our Vision</span> is to shape a future where people can understand their wellbeing in seconds, just by looking in the mirror.</Text>
            </Box>
          </VStack>

          {isWide && (
            <Box borderRadius="xl" overflow="hidden" boxShadow="inner">
              <Image
                src="media/about/team.jpg"
                w="100%"
                h="300px"
                objectFit="cover"
              />
            </Box>
          )}
        </Grid>
        {/* Team profiles */}
        <Grid templateColumns={isWide ? "repeat(3, 1fr)" : "1fr"} gap={10} px={isWide ? 0 : 4} mt={10}>
          {profiles.map((p) => (
            <Box key={p.name} bg="white" borderRadius="xl" boxShadow="md" p={8} textAlign="center">
              <Text mt={4} fontWeight="semibold" fontSize="lg">{p.name}</Text>
              <Text fontSize="sm" color="gray.500">{p.role}</Text>
              <Text mt={3} fontSize="sm" color="gray.600" lineHeight="taller">{p.blurb}</Text>
            </Box>
          ))}
        </Grid>
      </Box>

      {/* Our Values Section */}
      <Box mb={16} mx={isWide ? 20 : 4}>
        <Text textAlign="center" fontWeight="bold" fontSize="3xl" mb={8}>OUR VALUES</Text>
        <SimpleGrid columns={isWide ? 4 : 1} gap={6}>
          {values.map((v) => (
            <Box key={v.title} bg="whiteAlpha.700" border="1px solid" borderColor="gray.100" p={6} borderRadius="xl" textAlign="center">
              <Text fontWeight="bold" color="#ffbe5cff" mb={2}>{v.title}</Text>
              <Text fontSize="sm" color="gray.600">{v.desc}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </div>
  );
}