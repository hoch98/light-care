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
// Importing semantic icons for each phase
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
    description: "Identified a common problem: people often ignore early wellness signs. Goal: make daily wellness awareness simple, contactless, and accessible.",
  },
  {
    title: "2. Research",
    icon: MdSearch,
    description: "Studied rPPG and camera-based wellness sensing. Confirmed feasibility using standard cameras and controlled lighting.",
  },
  {
    title: "3. Design",
    icon: MdBrush,
    description: "Sketched early mirror concepts and user interactions. Planned system flow: camera → AI analysis → simple feedback.",
  },
  {
    title: "4. Build",
    icon: MdBuild,
    description: "Developed initial software for face detection and signal extraction. Built first mirror prototype using Raspberry Pi and Pi Camera.",
  },
  {
    title: "5. Test & Improve",
    icon: MdCheckCircleOutline,
    description: "Gathered peer and mentor feedback. Refined usability, messaging, and system stability.",
  },
  {
    title: "6. Pilot",
    icon: MdGroups,
    description: "Prepared for small-scale testing in schools and shared spaces. Defined success metrics (usability, engagement, trust).",
  },
  {
    title: "7. Scale",
    icon: MdTrendingUp,
    description: "Plan to expand through institutional partnerships. Improve features while staying non-diagnostic.",
  },
];

function TimelineSection() {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const { width } = useWindowDimensions();
  const isWide = width > 1200;

  return (
    <Box 
      position="relative" 
      bg="white" 
      py={24}
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        backgroundImage: `linear-gradient(#edf2f7 1px, transparent 1px), linear-gradient(90deg, #edf2f7 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        opacity: 0.4,
        zIndex: 0,
      }}
    >
      {/* HEADER SECTION */}
      <Container maxW="container.lg" mb={20} textAlign="center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <VStack spacing={2} align="center">
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
        {/* VERTICAL CENTER LINE */}
        <Box
          position="absolute"
          left={{ base: "31px", md: "50%" }}
          top={0}
          bottom={0}
          w="2px"
          bg="#10172fff"
          transform={{ md: "translateX(-50%)" }}
        />

        <VStack spacing={16} align="stretch" w="100%">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <MotionFlex
                key={index}
                initial={{ opacity: 0, x: isDesktop ? (isEven ? -40 : 40) : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                w="100%"
                justifyContent="center"
                alignItems="center"
                position="relative"
              >
                {/* NODE DOT */}
                <Circle
                  size="16px"
                  bg="#FFBE5C"
                  border="4px solid"
                  borderColor="#10172fff"
                  position="absolute"
                  left={{ base: "31px", md: "50%" }}
                  transform="translateX(-50%)"
                  zIndex={2}
                />

                {/* CARD WRAPPER */}
                <Flex 
                  w="100%" 
                  justifyContent={isEven ? "flex-start" : "flex-end"}
                  paddingLeft={{ base: "60px", md: "0" }}
                >
                  <Box 
                    w={{ base: "100%", md: "44%" }} 
                    bg="white" 
                    p={8} 
                    borderRadius="2xl" 
                    boxShadow="2xl"
                    border="1px solid"
                    borderColor="gray.50"
                    textAlign={isDesktop && isEven ? "right" : "left"}
                    position="relative"
                  >
                    {/* ICON CIRCLE */}
                    <Flex justify={isDesktop && isEven ? "flex-end" : "flex-start"} mb={4}>
                        <Circle size="48px" bg="orange.50" color="#ffbe5cff">
                            <Icon as={item.icon} boxSize={6} />
                        </Circle>
                    </Flex>

                    <Heading 
                      size="sm" 
                      color="#FFBE5C" 
                      mb={3} 
                      textTransform="uppercase" 
                      letterSpacing="2px"
                    >
                      {item.title}
                    </Heading>
                    <Text fontSize="md" color="gray.600" lineHeight="tall" fontWeight="medium">
                      {item.description}
                    </Text>

                    {/* SPEECH BUBBLE ARROW */}
                    {isDesktop && (
                      <Box 
                        position="absolute"
                        top="50%"
                        {...(isEven ? { right: "-10px" } : { left: "-10px" })}
                        transform="translateY(-50%) rotate(45deg)"
                        w="20px"
                        h="20px"
                        bg="white"
                        borderRight={isEven ? "1px solid" : "none"}
                        borderTop={isEven ? "1px solid" : "none"}
                        borderLeft={!isEven ? "1px solid" : "none"}
                        borderBottom={!isEven ? "1px solid" : "none"}
                        borderColor="gray.50"
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