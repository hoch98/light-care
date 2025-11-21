import { Grid, GridItem, Text, Box, Flex, Image } from "@chakra-ui/react";
import useWindowDimensions from '../hooks/useWindowDimensions.jsx';

// Chakra‑UI version of the Our Team section
// Matches the style + layout of your LightCare section

export default function OurTeamSection() {
  const { width } = useWindowDimensions();
  const isWide = width > 1200;

  const profiles = [
    {
      name: "Aiden Wong",
      role: "Lead Creativity",
      blurb:
        "Brainstorms ideas and helps visualise them in a simple and concise manner.",
    },
    {
      name: "Felix Wang",
      role: "Head of Management",
      blurb:
        "Turns vision into action, directing our project from concept to reality.",
    },
    {
      name: "Ho Yun Chen",
      role: "Head of Software Development",
      blurb:
        "Builds and maintains the software architecture that powers the project."
    },
  ];

  return (
    <Box w={isWide ? "80vw" : "95vw"} px={isWide ? 4 : 4} py={isWide ? 20 : 16} mx="auto">
      {/* Heading */}
      <Box
        textAlign={"center"}
        mb={10}
        display="flex"
        flexDirection="column"
        alignItems={ "center"}
      >

        <Text fontWeight="bold" fontSize={isWide ? "5xl" : "4xl"}>
          OUR TEAM
          <div style={{ marginTop: "10px", marginBottom: "20px", backgroundColor: "#ffbe5cff", width: "100%", height: "10px" }} />
        </Text>
        <Text fontSize={isWide ? "xl" : "md"} color="gray.700" lineHeight="taller" maxW="900px" mx={isWide ? "0" : "auto"}>
          We combine optical sensing, machine learning, and human‑centered design to make actionable wellbeing insights. We focus on reliability, accessibility, and clear
          communication so people can make small, confident decisions every day.
        </Text>
      </Box>

      {/* Mission card */}
      <Box
        bg="whiteAlpha.700"
        backdropFilter="blur(6px) saturate(120%)"
        borderRadius="2xl"
        boxShadow="md"
        p={isWide ? 12 : 8}
        mb={16}
      >
        <Grid templateColumns={isWide ? "2fr 1fr" : "1fr"} gap={10} alignItems="center">
          <GridItem>
            <Text fontWeight="bold" fontSize="2xl">Our mission</Text>
            <Text mt={4} color="gray.700" lineHeight="taller">
              We combine AI, optical sensing, and design to help people understand their wellbeing without
              friction. 
              <br />
              Everything we create prioritizes scientific accuracy, privacy, and real‑world usability.
            </Text>
          </GridItem>

          {isWide && (
            <GridItem>
              <Flex justify="center">
                <Box w="500px" h="250px" borderRadius="xl" overflow="hidden" boxShadow="inner">
                  <Image
                    src="media/about/team.jpg"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                  />
                </Box>
              </Flex>
            </GridItem>
          )}
        </Grid>
      </Box>

      {/* Team profiles */}
      <Grid templateColumns={isWide ? "repeat(3, 1fr)" : "1fr"} gap={10}>
        {profiles.map((p) => (
          <Box key={p.name} bg="white" borderRadius="xl" boxShadow="md" p={8} textAlign="center">
            <Text mt={4} fontWeight="semibold" fontSize="lg">{p.name}</Text>
            <Text fontSize="sm" color="gray.500">{p.role}</Text>
            <Text mt={3} fontSize="sm" color="gray.600" lineHeight="taller">{p.blurb}</Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
