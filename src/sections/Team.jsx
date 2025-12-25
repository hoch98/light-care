import { Grid, Text, Box, Image, SimpleGrid, VStack } from "@chakra-ui/react";
import useWindowDimensions from '../hooks/useWindowDimensions.jsx';

export default function OurTeamSection() {
  const { width } = useWindowDimensions();
  const isWide = width > 1200;

  const profiles = [
    {
      name: "Aiden Wong",
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
      blurb: "Leads the software development, building and maintaining the system's software architecture and implementing the core features of the design.  "
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
      <Box textAlign={"center"} mb={10} display="flex" flexDirection="column" alignItems={"center"}>
        <Text fontWeight="bold" fontSize={isWide ? "5xl" : "4xl"}>
          OUR TEAM
          <div style={{ marginTop: "10px", marginBottom: "20px", backgroundColor: "#ffbe5cff", width: "100%", height: "10px" }} />
        </Text>
      </Box>

      <Box
        bg="whiteAlpha.700"
        backdropFilter="blur(6px) saturate(120%)"
        borderRadius="2xl"
        boxShadow="md"
        p={isWide ? 12 : 8}
        mb={10}
        mx={isWide ? 20 : 4}
      >
        <VStack align="center" spacing={8} mx="auto" maxW="800px" mb={12}>
          <Box textAlign="center">
            <Text fontSize="lg" color="gray.700">
              <span style={{ fontWeight: "bold" }}>Our Mission</span> is to make everyday wellness awareness simple, accessible, and effortless.
            </Text>
          </Box>

          <Box textAlign="center">
            <Text fontSize="lg" color="gray.700">
              <span style={{ fontWeight: "bold" }}>Our Vision</span> is to shape a future where people can understand their wellbeing in seconds, just by looking in the mirror.
            </Text>
          </Box>
        </VStack>

        {/* Team profiles */}
        <Grid templateColumns={isWide ? "repeat(3, 1fr)" : "1fr"} gap={10} px={isWide ? 0 : 4} mt={10}>
          {profiles.map((p) => (
            <Box key={p.name} bg="white" borderRadius="xl" boxShadow="md" p={8} textAlign="center">
              {/* Added Image Component here */}
              <Image
                src={p.imageSrc}
                alt={p.name}
                borderRadius="full"
                boxSize="240px"
                objectFit="cover"
                mx="auto"
                mb={4}
              />
              <Text fontWeight="semibold" fontSize="lg">{p.name}</Text>
              <Text mt={3} fontSize="sm" color="gray.600" lineHeight="taller">{p.blurb}</Text>
            </Box>
          ))}
        </Grid>
      </Box>

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