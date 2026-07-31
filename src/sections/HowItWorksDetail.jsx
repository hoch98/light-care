import { Box, Text, VStack, SimpleGrid, Icon, HStack, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdWbIncandescent, MdFavorite, MdInsights } from "react-icons/md";

const MotionBox = motion(Box);
const GOLD = "#FFB200";
const BLUE = "#62daff";

const TOPICS = [
  {
    icon: MdWbIncandescent,
    accent: GOLD,
    title: "Precision Through Light",
    body: "LightCare uses structured-light principles to create consistent lighting conditions during every scan. By illuminating the face with controlled light, the system reduces shadows, compensates for environmental lighting changes, and enhances facial feature detection. This stable visual input improves the accuracy of both computer vision and physiological signal analysis.",
    img: "/media/how/structured-light-diagram.png",
    alt: "Structured light projector and camera measuring a face",
    // Line diagram on white — needs its own light plate to stay legible on navy.
    plate: "white",
  },
  {
    icon: MdFavorite,
    accent: BLUE,
    title: "Contactless Heart Rate Monitoring",
    body: "Remote photoplethysmography (rPPG) estimates heart rate by detecting microscopic colour changes in the skin caused by blood circulation. These subtle variations are invisible to the human eye but can be extracted from video frames using advanced signal processing. The result is a completely contact-free method of monitoring heart rate trends during everyday routines.",
    img: "/media/how/rppg-face.png",
    alt: "rPPG signal extracted from a face mesh",
  },
  {
    icon: MdInsights,
    accent: GOLD,
    title: "Turning Images into Insights",
    body: "Every scan begins with advanced computer vision models that detect and analyse key facial regions. The AI identifies indicators such as dark circles, eye redness, and acne, then combines these observations with physiological signals and each user's personal baseline. Instead of providing a diagnosis, LightCare delivers meaningful wellness insights and tracks changes over time to encourage healthier habits.",
    img: "/media/how/structured-light-face.jpg",
    alt: "Structured light pattern projected onto a face",
  },
];

function HowItWorksDetail() {
  return (
    <Box w="100%" px={5} display="flex" flexDirection="column" alignItems="center" mb="100px">
      <VStack spacing={0} mb={12}>
        <Text
          fontWeight="black"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          letterSpacing="-2px"
          color="white"
          textAlign="center"
        >
          HOW IT WORKS
        </Text>
        <Box bg={BLUE} w="100%" h="8px" borderRadius="full" />
      </VStack>

      <SimpleGrid
        columns={{ base: 1, lg: 3 }}
        gap={8}
        w={{ base: "95%", md: "90%", lg: "85%", xl: "80%" }}
      >
        {TOPICS.map((t, i) => (
          <MotionBox
            key={t.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            bg="#0B2444"
            border="1px solid"
            borderColor="whiteAlpha.100"
            borderRadius="2xl"
            boxShadow="0 15px 35px rgba(0,0,0,0.4)"
            p={8}
            display="flex"
            flexDirection="column"
            _hover={{ transform: "translateY(-6px)", borderColor: `${t.accent}55`, boxShadow: "0 25px 50px rgba(0,0,0,0.5)" }}
            transition-property="all"
          >
            <HStack spacing={3} mb={4}>
              <Box
                p={3}
                borderRadius="xl"
                bg={`${t.accent}1F`}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={t.icon} boxSize={6} color={t.accent} />
              </Box>
            </HStack>

            <Text fontWeight="800" fontSize="xl" color="white" mb={3} letterSpacing="-0.5px">
              {t.title}
            </Text>
            <Box w="40px" h="3px" bg={t.accent} borderRadius="full" mb={4} />
            <Text fontSize="sm" color="whiteAlpha.800" lineHeight="tall">
              {t.body}
            </Text>

            {/* Supporting figure sits under the copy, flush to the card bottom
                so the three cards line up regardless of text length. */}
            <Box
              mt={6}
              pt={2}
              flex="1"
              display="flex"
              alignItems="flex-end"
            >
              <Box
                w="100%"
                bg={t.plate || "#03101F"}
                borderRadius="xl"
                overflow="hidden"
                border="1px solid"
                borderColor="whiteAlpha.100"
                p={3}
              >
                {/* contain, not cover — these figures carry labels and signal
                    traces that must not be cropped. */}
                <Image
                  src={t.img}
                  alt={t.alt}
                  w="100%"
                  h={{ base: "180px", md: "210px" }}
                  objectFit="contain"
                  borderRadius="md"
                />
              </Box>
            </Box>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default HowItWorksDetail;
