import {
  Box,
  Text,
  Stack,
  Heading,
  HStack,
  Icon,
  VStack,
  Image,
  SimpleGrid,
  AspectRatio,
} from "@chakra-ui/react";
import { MdFace, MdVisibility, MdFavorite } from "react-icons/md";
import React, { useState, useRef, useEffect } from "react";

const ComparisonSlider = ({ beforeImg, afterImg }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Track container width to keep the "Before" image size constant
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      ref={containerRef}
      position="relative"
      w="100%"
      h="100%"
      overflow="hidden"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.200"
      userSelect="none"
    >
      {/* 1. BOTTOM LAYER: Processed Image (After) */}
      <Image
        src={afterImg}
        alt="Background Removed"
        objectFit="cover"
        w="100%"
        h="100%"
        display="block"
      />

      {/* 2. TOP LAYER: Raw Image (Before) */}
      <Box
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        w={`${sliderPos}%`} // This moves the "clip" line
        overflow="hidden"
        borderRight="3px solid white"
        boxShadow="2px 0 10px rgba(0,0,0,0.2)"
      >
        <Image
          src={beforeImg}
          alt="Raw Image"
          objectFit="cover"
          /* CRITICAL: Set width to the FIXED container width 
             so it doesn't squash when the parent div shrinks.
          */
          w={`${containerWidth}px`} 
          h="100%"
          maxW="none"
        />
      </Box>

      {/* 3. INTERACTIVE SLIDER INPUT */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(e.target.value)}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          cursor: "col-resize",
          zIndex: 10,
        }}
      />

      {/* 4. VISUAL HANDLE */}
      <Box
        position="absolute"
        top="50%"
        left={`${sliderPos}%`}
        transform="translate(-50%, -50%)"
        bg="white"
        w="40px"
        h="40px"
        borderRadius="full"
        boxShadow="lg"
        display="flex"
        alignItems="center"
        justifyContent="center"
        pointerEvents="none"
        zIndex={5}
      >
        <Box w="2px" h="15px" bg="gray.400" mx="2px" />
        <Box w="2px" h="15px" bg="gray.400" mx="2px" />
      </Box>
    </Box>
  );
};

const BriefContent = () => {
  const BulletPoint = () => (
    <Box minW="6px" h="6px" bg="#ffbe5c" borderRadius="full" mt="10px" />
  );

  const SectionTitle = ({ icon, children }) => (
    <HStack spacing={3} mb={4}>
      <Icon as={icon} boxSize={5} color="#ffbe5c" />
      <Heading size="md" color="gray.800" textTransform="uppercase" letterSpacing="wider">
        {children}
      </Heading>
    </HStack>
  );

  return (
    /* Increased spacing from 24 to 32 for better breathing room between sections */
    <VStack spacing={{ base: 32, md: 24 }} w="100%" align="stretch">
      
      {/* SECTION 1: COMPUTER VISION */}
      <SimpleGrid 
        columns={{ base: 1, md: 10 }} 
        spacing={{ base: 12, md: 10 }} 
        alignItems="center"
        py={{ base: 4, md: 0 }}
      >
        <Stack spacing={4} gridColumn={{ md: "span 6" }}>
          <SectionTitle icon={MdFace}>OpenCV Face Localization</SectionTitle>
          <VStack align="start" spacing={3} pl={2}>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="gray.600">
                Utilizes <strong>OpenCV.js</strong> and Haar Cascade Classifiers to perform real-time face detection at <strong>30 FPS</strong>.
              </Text>
            </HStack>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="gray.600">
                Implements <strong>YOLOv11 segmentation</strong> to isolate the user from the background for interference-free skin analysis.
              </Text>
            </HStack>
          </VStack>
        </Stack>
        <Box gridColumn={{ md: "span 4" }} maxW="400px" mx="auto" w="100%">
          <AspectRatio ratio={4/3}>
            <ComparisonSlider 
              beforeImg="media/brief/yolo.jpg"  // Path to your raw image
              afterImg="media/brief/yolo2.png"        // Path to your processed image
            />
          </AspectRatio>
          <Text fontSize="xs" color="gray.400" mt={2} textAlign="center">
            Slide to compare Raw vs. YOLOv11 Segmentation
          </Text>
        </Box>
      </SimpleGrid>

      {/* SECTION 2: NEURAL INFERENCE */}
      <SimpleGrid 
        columns={{ base: 1, md: 10 }} 
        spacing={{ base: 12, md: 10 }} 
        alignItems="center"
        py={{ base: 4, md: 0 }}
      >
        <Box 
          gridColumn={{ md: "span 4" }} 
          maxW="400px" 
          mx="auto" 
          w="100%" 
          order={{ base: 2, md: 1 }}
        >
          <AspectRatio ratio={4/3}>
            <Image 
              src="media/brief/model.png" 
              borderRadius="xl" 
              border="1px solid" 
              borderColor="gray.200" 
              objectFit="cover" 
              alt="Neural Network Performance"
            />
          </AspectRatio>
        </Box>
        <Stack spacing={4} gridColumn={{ md: "span 6" }} order={{ base: 1, md: 2 }}>
          <SectionTitle icon={MdVisibility}>Neural Network Inference</SectionTitle>
          <VStack align="start" spacing={3} pl={2}>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="gray.600">
                Custom-trained <strong>YOLOv11</strong> models detect dermatological features with <strong>87.4% mAP</strong> on test data.
              </Text>
            </HStack>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="gray.600">
                Flask-based backend handles asynchronous requests ensuring latency stays below <strong>150ms</strong>.
              </Text>
            </HStack>
          </VStack>
        </Stack>
      </SimpleGrid>

      {/* SECTION 3: SIGNAL PROCESSING */}
      <SimpleGrid 
        columns={{ base: 1, md: 10 }} 
        spacing={{ base: 12, md: 10 }} 
        alignItems="center"
        py={{ base: 4, md: 0 }}
      >
        <Stack spacing={4} gridColumn={{ md: "span 6" }}>
          <SectionTitle icon={MdFavorite}>rPPG Signal Pipeline</SectionTitle>
          <VStack align="start" spacing={3} pl={2}>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="gray.600">
                Extracts blood volume pulse by monitoring pixel color fluctuations in specific regions of interest.
              </Text>
            </HStack>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="gray.600">
                Processes raw signals through <strong>detrending</strong> and frequency masking to derive heart rate variability.
              </Text>
            </HStack>
          </VStack>
        </Stack>
        <Box gridColumn={{ md: "span 4" }} maxW="400px" mx="auto" w="100%">
          <AspectRatio ratio={4/3}>
            <Image 
              src="media/brief/rppg.png" 
              borderRadius="xl" 
              border="1px solid" 
              borderColor="gray.200" 
              objectFit="cover" 
              alt="rPPG Waveform Analysis"
            />
          </AspectRatio>
        </Box>
      </SimpleGrid>

    </VStack>
  );
};

export default BriefContent;