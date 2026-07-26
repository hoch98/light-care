import React from 'react';
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

// Page opener styled after the home hero — same dark stage, gold headline and
// equalizer transition, but static: only the first page carries an animation.
function TitleCard({ text, lastword, slogan, ctaText = "Learn More", waveColor = "#0A0B0E" }) {
  return (
    <Box
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
      {/* Perspective grid flair — same design language as the home sections. */}
      <Box
        position="absolute" inset="0" zIndex={0} opacity="0.18"
        backgroundImage={`
          linear-gradient(rgba(255,178,0,0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,178,0,0.15) 1px, transparent 1px)
        `}
        backgroundSize="60px 60px"
        transform="perspective(800px) rotateX(60deg) scale(1.5)"
        transformOrigin="top"
      />

      {/* Soft gold + blue glows for depth. */}
      <Box
        position="absolute" top="-20%" left="-10%" w="55vw" h="55vw" zIndex={0}
        bg="radial-gradient(circle, rgba(255,178,0,0.12) 0%, transparent 60%)"
        filter="blur(50px)"
        pointerEvents="none"
      />
      <Box
        position="absolute" bottom="-25%" right="-10%" w="55vw" h="55vw" zIndex={0}
        bg="radial-gradient(circle, rgba(98,218,255,0.12) 0%, transparent 60%)"
        filter="blur(50px)"
        pointerEvents="none"
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
                {ctaText}
              </GoldButton>
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
