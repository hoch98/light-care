import { Box, VStack, Text, Flex, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const GOLD = "#FFB200";
const BLUE = "#62daff";

const timelineData = [
  { n: "01", title: "Idea", description: "Identified a common problem: people ignore early wellness signs." },
  { n: "02", title: "Research", description: "Studied rPPG and camera-based wellness sensing." },
  { n: "03", title: "Design", description: "Sketched early mirror concepts and interactions." },
  { n: "04", title: "Build", description: "Built the first mirror prototype on a Raspberry Pi." },
  { n: "05", title: "Test & Improve", description: "Refined usability, messaging, and system stability." },
  { n: "06", title: "Pilot", description: "Preparing for testing in shared spaces with defined metrics.", upcoming: true },
];

function TimelineSection() {
  return (
    <Box w="100%" bg="#061529" py={{ base: 20, md: 28 }} position="relative" overflow="hidden">

      {/* Ambient glows */}
      <Box
        position="absolute" top="-10%" left="-10%" w="55%" h="60%"
        bg="radial-gradient(circle, rgba(255,178,0,0.08) 0%, transparent 60%)"
        filter="blur(60px)" pointerEvents="none" zIndex={0}
      />
      <Box
        position="absolute" bottom="-15%" right="-10%" w="55%" h="60%"
        bg="radial-gradient(circle, rgba(98,218,255,0.08) 0%, transparent 60%)"
        filter="blur(60px)" pointerEvents="none" zIndex={0}
      />

      <Container maxW="1000px" position="relative" zIndex={1}>
        <VStack spacing={2} mb={{ base: 14, md: 20 }}>
          <Text fontSize="xs" fontWeight="800" letterSpacing="0.25em" textTransform="uppercase" color={BLUE}>
            Roadmap
          </Text>
          <Text
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="900"
            color="white"
            textAlign="center"
            textTransform="uppercase"
            letterSpacing="-1.5px"
          >
            The Path Forward
          </Text>
          <Box bg={GOLD} w="90px" h="6px" borderRadius="full" mt={1} />
        </VStack>

        <Box position="relative">
          {/* Spine — a dim rail with a gold beam that fills as you scroll in. */}
          <Box
            position="absolute"
            left={{ base: "23px", md: "50%" }}
            top="0"
            bottom="0"
            w="2px"
            ml={{ md: "-1px" }}
            bg="whiteAlpha.200"
            zIndex={0}
          />
          <MotionBox
            position="absolute"
            left={{ base: "23px", md: "50%" }}
            top="0"
            w="2px"
            ml={{ md: "-1px" }}
            bgGradient={`linear(to-b, ${GOLD}, ${BLUE})`}
            zIndex={0}
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />

          <VStack spacing={{ base: 10, md: 14 }} align="stretch" w="100%">
            {timelineData.map((item, index) => {
              const isLeft = index % 2 === 0;
              const accent = item.upcoming ? BLUE : GOLD;

              return (
                <MotionFlex
                  key={item.n}
                  w="100%"
                  align="center"
                  position="relative"
                  direction={{ base: "row", md: isLeft ? "row" : "row-reverse" }}
                  initial={{ opacity: 0, x: 0, y: 24 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
                >
                  {/* Card side */}
                  <Box
                    flex="1"
                    pl={{ base: "76px", md: isLeft ? 0 : 16 }}
                    pr={{ base: 0, md: isLeft ? 16 : 0 }}
                    textAlign={{ base: "left", md: isLeft ? "right" : "left" }}
                  >
                    <MotionBox
                      display="inline-block"
                      w="100%"
                      p={6}
                      bg="#0B2444"
                      borderRadius="20px"
                      border="1px solid"
                      borderColor="whiteAlpha.100"
                      boxShadow="0 18px 40px rgba(0,0,0,0.45)"
                      position="relative"
                      overflow="hidden"
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.25 }}
                      _hover={{ borderColor: `${accent}66` }}
                    >
                      {/* Accent edge on the spine-facing side */}
                      <Box
                        position="absolute"
                        top="0"
                        bottom="0"
                        left={{ base: 0, md: isLeft ? "auto" : 0 }}
                        right={{ base: "auto", md: isLeft ? 0 : "auto" }}
                        w="3px"
                        bg={accent}
                      />

                      <Flex
                        align="center"
                        gap={2}
                        mb={2}
                        justify={{ base: "flex-start", md: isLeft ? "flex-end" : "flex-start" }}
                      >
                        <Text fontSize="xs" fontWeight="900" letterSpacing="0.15em" color={accent} textTransform="uppercase">
                          Phase {item.n}
                        </Text>
                        {item.upcoming && (
                          <Box px={2} py="1px" borderRadius="full" bg={`${BLUE}22`} border={`1px solid ${BLUE}55`}>
                            <Text fontSize="9px" fontWeight="800" color={BLUE} textTransform="uppercase" letterSpacing="0.08em">
                              Next
                            </Text>
                          </Box>
                        )}
                      </Flex>

                      <Text fontSize="xl" fontWeight="800" color="white" mb={2} letterSpacing="-0.5px">
                        {item.title}
                      </Text>
                      <Text fontSize="sm" color="whiteAlpha.700" lineHeight="tall">
                        {item.description}
                      </Text>
                    </MotionBox>
                  </Box>

                  {/* Numbered node sitting on the spine */}
                  <MotionBox
                    position="absolute"
                    left={{ base: "24px", md: "50%" }}
                    transform="translateX(-50%)"
                    zIndex={2}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4, delay: index * 0.08 + 0.15, ease: "backOut" }}
                  >
                    <Flex
                      w={{ base: "44px", md: "54px" }}
                      h={{ base: "44px", md: "54px" }}
                      borderRadius="full"
                      bg="#061529"
                      border="2px solid"
                      borderColor={accent}
                      align="center"
                      justify="center"
                      boxShadow={`0 0 22px ${accent}59`}
                    >
                      <Text fontSize={{ base: "sm", md: "md" }} fontWeight="900" color={accent}>
                        {item.n}
                      </Text>
                    </Flex>
                  </MotionBox>

                  {/* Empty counterweight so cards stay on their own half */}
                  <Box flex="1" display={{ base: "none", md: "block" }} />
                </MotionFlex>
              );
            })}
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

export default TimelineSection;
