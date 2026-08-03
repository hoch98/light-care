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
      borderColor="whiteAlpha.300"
      userSelect="none"
    >
      <Image
        src={afterImg}
        alt="Background Removed"
        objectFit="cover"
        w="100%"
        h="100%"
        display="block"
      />

      <Box
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        w={`${sliderPos}%`}
        overflow="hidden"
        borderRight="3px solid white"
        boxShadow="2px 0 10px rgba(0,0,0,0.2)"
      >
        <Image
          src={beforeImg}
          alt="Raw Image"
          objectFit="cover"
          w={`${containerWidth}px`}
          h="100%"
          maxW="none"
        />
      </Box>

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

const BulletPoint = () => (
  <Box minW="6px" h="6px" bg="#FFB200" borderRadius="full" mt="10px" />
);

const SectionTitle = ({ icon, children }) => (
  <HStack spacing={3} mb={4}>
    <Icon as={icon} boxSize={5} color="#FFB200" />
    <Heading size="md" color="white" textTransform="uppercase" letterSpacing="wider">
      {children}
    </Heading>
  </HStack>
);

const BriefContent = () => {

  return (
    <VStack spacing={{ base: 32, md: 24 }} w="100%" align="stretch">

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
              <Text fontSize="lg" color="whiteAlpha.800">
                Utilizes <strong>OpenCV.js</strong> and Haar Cascade Classifiers to perform real-time face detection at <strong>30 FPS</strong>.
              </Text>
            </HStack>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="whiteAlpha.800">
                Implements <strong>YOLOv11 segmentation</strong> to isolate the user from the background for interference-free skin analysis.
              </Text>
            </HStack>
          </VStack>
        </Stack>
        <Box gridColumn={{ md: "span 4" }} maxW="400px" mx="auto" w="100%">
          <AspectRatio ratio={4 / 3}>
            <ComparisonSlider
              beforeImg="media/brief/yolo.jpg" 
              afterImg="media/brief/yolo2.png"
            />
          </AspectRatio>
          <Text fontSize="xs" color="whiteAlpha.500" mt={2} textAlign="center">
            Slide to compare Raw vs. YOLOv11 Segmentation
          </Text>
        </Box>
      </SimpleGrid>
      <br />

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
          <AspectRatio ratio={4 / 3}>
            <Image
              src="media/brief/model.png"
              borderRadius="xl"
              border="1px solid"
              borderColor="whiteAlpha.300"
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
              <Text fontSize="lg" color="whiteAlpha.800">
                Custom-tuned <strong>YOLOv11</strong> models to detect dermatological features real-time
              </Text>
            </HStack>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="whiteAlpha.800">
                Models are trained 1.6k images from public datasets for 100 epochs.
              </Text>
            </HStack>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="whiteAlpha.800">
                Flask-based backend handles asynchronous requests ensuring latency stays below <strong>150ms</strong>.
              </Text>
            </HStack>
          </VStack>
        </Stack>
      </SimpleGrid>
      <br />
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
              <Text fontSize="lg" color="whiteAlpha.800">
                Extracts blood volume pulse by monitoring pixel color fluctuations in specific regions of interest.
              </Text>
            </HStack>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="whiteAlpha.800">
                Processes raw signals through detrending, moving average smoothing, and frequency masking to derive heart rate variability.
              </Text>
            </HStack>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="whiteAlpha.800">
                Makes use of principles of <strong>structured light</strong>, projecting a patterned light grid onto the face, creating distortions. These distortions can be analyzed to compensate for unpredictable ambient lighting, allowing for reliable signal detection for remote photoplethysmography. 
              </Text>
            </HStack>
          </VStack>
        </Stack>
        <Box gridColumn={{ md: "span 4" }} maxW="400px" mx="auto" w="100%">
          <AspectRatio ratio={4 / 3}>
            <Image
              src="media/brief/rppg.png"
              borderRadius="xl"
              border="1px solid"
              borderColor="whiteAlpha.300"
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