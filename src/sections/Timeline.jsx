import {
  Box,
  VStack,
  Text,
  Heading,
  Circle,
  Flex,
  Container,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import {
  MdLightbulbOutline,
  MdSearch,
  MdBrush,
  MdBuild,
  MdCheckCircleOutline,
  MdGroups,
  MdTrendingUp
} from "react-icons/md";

const MotionFlex = motion(Flex);

const timelineData = [
  {
    title: "1. Idea",
    icon: MdLightbulbOutline,
    description:
      "Identified a common problem: people often ignore early wellness signs. Goal: make daily wellness awareness simple, contactless, and accessible.",
  },
  {
    title: "2. Research",
    icon: MdSearch,
    description:
      "Studied rPPG and camera-based wellness sensing. Confirmed feasibility using standard cameras and controlled lighting.",
  },
  {
    title: "3. Design",
    icon: MdBrush,
    description:
      "Sketched early mirror concepts and user interactions. Planned system flow: camera → AI analysis → simple feedback.",
  },
  {
    title: "4. Build",
    icon: MdBuild,
    description:
      "Developed initial software for face detection and signal extraction. Built first mirror prototype using Raspberry Pi and Pi Camera.",
  },
  {
    title: "5. Test & Improve",
    icon: MdCheckCircleOutline,
    description:
      "Gathered peer and mentor feedback. Refined usability, messaging, and system stability.",
  },
  {
    title: "6. Pilot",
    icon: MdGroups,
    description:
      "Prepared for small-scale testing in schools and shared spaces. Defined success metrics (usability, engagement, trust).",
  },
  {
    title: "7. Scale",
    icon: MdTrendingUp,
    description:
      "Plan to expand through institutional partnerships. Improve features while staying non-diagnostic.",
  },
];

function TimelineSection() {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const { width } = useWindowDimensions();
  const isWide = width > 1200;

  return (
    <Box
      position="relative"
      py={24}
      overflow="hidden"
      bg="rgba(224, 224, 224, 0.2)" 
      backdropFilter="blur(3px)" 
    >

      <Container maxW="container.lg" mb={20} textAlign="center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <VStack spacing={2}>
            <Text
              fontWeight="900"
              fontSize={isWide ? "5xl" : "4xl"}
              color="gray.800"
              letterSpacing="tight"
            >
              TIMELINE
            </Text>
            <Box bg="#ffbe5cff" w="80px" h="6px" borderRadius="full" />
          </VStack>
        </motion.div>
      </Container>

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Box
          position="absolute"
          left={{ base: "31px", md: "50%" }}
          top={0}
          bottom={0}
          w="2px"
          bg="#10172fff"
          transform={{ md: "translateX(-50%)" }}
        />

        <VStack spacing={16} align="stretch">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <MotionFlex
                key={index}
                initial={{
                  opacity: 0,
                  x: isDesktop ? (isEven ? -40 : 40) : 20,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                justify="center"
                position="relative"
              >
                <Circle
                  size="16px"
                  bg="#FFBE5C"
                  border="4px solid #10172fff"
                  position="absolute"
                  left={{ base: "31px", md: "50%" }}
                  transform="translateX(-50%)"
                  zIndex={2}
                />

                <Flex
                  w="100%"
                  justify={isEven ? "flex-start" : "flex-end"}
                  pl={{ base: "60px", md: 0 }}
                >
                  <Box
                    w={{ base: "100%", md: "44%" }}
                    p={8}
                    borderRadius="2xl"
                    bg="rgba(255,255,255,0.7)"
                    backdropFilter="blur(10px)"
                    border="1px solid"
                    borderColor="gray.200"
                    boxShadow="lg"
                    textAlign={isDesktop && isEven ? "right" : "left"}
                    position="relative"
                  >
                    <Flex
                      align="center"
                      gap={3}
                      justify={isDesktop && isEven ? "flex-end" : "flex-start"}
                      mb={3}
                    >
                      <Circle size="36px" bg="orange.100" color="#ffbe5cff">
                        <Icon as={item.icon} boxSize={5} />
                      </Circle>

                      <Heading
                        size="sm"
                        color="#FFBE5C"
                        textTransform="uppercase"
                        letterSpacing="2px"
                      >
                        {item.title}
                      </Heading>
                    </Flex>

                    <Text
                      fontSize="md"
                      color="gray.700"
                      lineHeight="tall"
                      fontWeight="medium"
                    >
                      {item.description}
                    </Text>

                    {isDesktop && (
                      <Box
                        position="absolute"
                        top="50%"
                        {...(isEven ? { right: "-10px" } : { left: "-10px" })}
                        transform="translateY(-50%) rotate(45deg)"
                        w="20px"
                        h="20px"
                        bg="rgba(255,255,255,0.7)"
                        backdropFilter="blur(10px)"
                        border="1px solid"
                        borderColor="gray.200"
                      />
                    )}
                  </Box>
                </Flex>
              </MotionFlex>
            );
          })}
        </VStack>
      </Container>
    </Box>
  );
}

export default TimelineSection;
