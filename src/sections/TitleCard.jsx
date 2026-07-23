import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Container,
  VStack,
  HStack
} from "@chakra-ui/react";
import { motion } from "framer-motion";

// Same lazy three.js chunk as the home hero — already cached once any page loads it.
const HeroCanvas = lazy(() => import('@/components/HeroCanvas'));

const MotionBox = motion(Box);

// Page opener styled after the home hero: dark stage, rotating device behind the
// copy, gold headline, and the equalizer transition into the page content.
// `waveColor` should match the background of the first section below the hero.
function TitleCard({ text, lastword, slogan, ctaText = "Learn More", waveColor = "#EDFCFF" }) {
  const heroRef = useRef(null);
  const [inView, setInView] = useState(true);

  // Stop rendering frames once the hero scrolls away — same saving as the home page.
  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={heroRef}
      w="100%"
      h={{ base: "100vh", md: "110vh" }}
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pb="140px"
      bg="#0A0B0E"
    >
      {/* Rotating device behind the copy, same as the home hero. */}
      <Box position="absolute" top="0" left="0" w="100%" h="100vh" zIndex={0} pointerEvents="none">
        <Suspense fallback={null}>
          <HeroCanvas active={inView} />
        </Suspense>
      </Box>

      {/* Vignette — holds text contrast over the model. */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        backgroundImage="radial-gradient(ellipse at center, rgba(10,11,14,0.60) 0%, rgba(10,11,14,0.32) 45%, rgba(10,11,14,0.82) 100%)"
        zIndex={1}
      />

      <Container maxW="container.lg" position="relative" zIndex={2}>
        <VStack spacing={8} textAlign="center">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Heading
              fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
              lineHeight="0.95"
              fontWeight="black"
              color="#FFB200"
              letterSpacing="-2px"
              textTransform="uppercase"
            >
              {text} <br /> {lastword}
            </Heading>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Text
              fontSize="sm"
              fontWeight="semibold"
              color="white"
              letterSpacing="widest"
              textTransform="uppercase"
            >
              A Brighter Wellness
            </Text>
          </MotionBox>

          {/* SLOGAN + CTA */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Text fontSize="lg" color="whiteAlpha.900" mb={4} maxW="600px" mx="auto">
              {slogan}
            </Text>

            <HStack spacing={4} justify="center">
              <Button
                size="lg"
                bg="#FFB200"
                color="white"
                px={10}
                borderRadius="full"
                _hover={{ bg: "#e6a100", transform: "translateY(-2px)" }}
                _active={{ transform: "scale(0.98)" }}
                boxShadow="0px 10px 20px rgba(255, 178, 0, 0.3)"
                onClick={() => {
                  const mainContent = document.getElementById("mainContent");
                  if (mainContent) {
                    mainContent.scrollIntoView({
                      behavior: "smooth",
                      block: "start"
                    });
                  }
                }}
              >
                {ctaText}
              </Button>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>

      {/* Animated Wave / Equalizer Bottom Transition into the page content */}
      <Box
        position="absolute"
        bottom="0"
        left="0"
        w="100%"
        h="140px"
        zIndex={3}
        display="flex"
        alignItems="flex-end"
        pointerEvents="none"
      >
        {[...Array(45)].map((_, i) => {
          const baseHeights = [30, 60, 90, 45, 100, 70, 85, 40, 95, 60];
          const hVal = baseHeights[i % 10];
          return (
            <MotionBox
              key={i}
              flex="1"
              bg={waveColor}
              borderTopRadius="3px"
              mx="1px"
              initial={{ height: "20%" }}
              animate={{
                height: [`${hVal}%`, `${(hVal + 30) % 100}%`, `${hVal}%`]
              }}
              transition={{
                duration: 2.5 + (i % 3) * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.04
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default TitleCard;
