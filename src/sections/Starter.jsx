import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Container,
  VStack,
  HStack
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import GoldButton from '@/components/GoldButton';

const MotionBox = motion(Box);

function Starter() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(true);

  // Pause the background video once the hero scrolls away.
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

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) { v.pause(); return; }
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView]);

  return (
    <Box
      ref={heroRef}
      w="100%"
      h={{ base: "115vh", md: "125vh" }}
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pb="140px"
      bg="#061529"
    >
      {/* Rendered mirror video behind the copy. */}
      <Box position="absolute" top="0" left="0" w="100%" h="100vh" zIndex={0} pointerEvents="none" overflow="hidden">
        <video
          ref={videoRef}
          src="/media/mirror-render.mp4"
          poster="/media/mirror-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      {/* Vignette — enough to hold text contrast over the render. */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        backgroundImage="radial-gradient(ellipse at center, rgba(6,21,41,0.60) 0%, rgba(6,21,41,0.32) 45%, rgba(6,21,41,0.82) 100%)"
        zIndex={1}
      />

      <Container maxW="container.md" position="relative" zIndex={2}>
        <VStack
          spacing={8}
          textAlign="center"
        >
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Heading
              fontSize={{ base: "6xl", md: "8xl", lg: "9xl" }}
              lineHeight="0.9"
              fontWeight="black"
              color="#FFB200"
              letterSpacing="-4px"
            >
              LIGHT <br /> CARE
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

          {/* DESCRIPTION */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Text fontSize="lg" color="whiteAlpha.900" mb={4} maxW="600px">
              Experience the next generation of contactless health monitoring
              powered by advanced AI and photoplethysmography.
            </Text>

            <HStack spacing={4} justify="center">
              <GoldButton
                size="lg"
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
                Learn More
              </GoldButton>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>

      {/* Animated Wave / Equalizer Bottom Transition */}
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
              bg="#061529"
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

export default Starter;
