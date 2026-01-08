import {
  Box,
  Text,
  Stack,
  Heading,
  HStack,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { MdFace, MdVisibility, MdFavorite } from "react-icons/md";

const BriefContent = () => {
  const BulletPoint = () => (
    <Box
      minW="8px"
      h="8px"
      bg="#ffbe5cff"
      borderRadius="full"
      mt="10px"
    />
  );

  return (
    <HStack
      align="start"
      spacing={16}
      w="100%"
      flexDir={{ base: "column", lg: "row" }}
    >
      <Stack spacing={10} textAlign="left" w="100%" py={2}>
        
        {/* SECTION 1: Computer Vision */}
        <Box>
          <HStack spacing={3} mb={4}>
            <Icon as={MdFace} boxSize={6} color="#ffbe5cff" />
            <Heading size="md" letterSpacing="wider" color="gray.800" textTransform="uppercase">
              OpenCV Face Localization
            </Heading>
          </HStack>
          <VStack align="start" spacing={3} pl={9}>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="gray.600">
                Utilizes <strong>OpenCV.js</strong> and Haar Cascade Classifiers to perform real-time face detection at 30 FPS.
              </Text>
            </HStack>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="gray.600">
                Implements <strong>YOLO segmentation</strong> on the backend to isolate the user from the background, ensuring interference-free analysis of skin regions.
              </Text>
            </HStack>
          </VStack>
        </Box>

        <br />

        {/* SECTION 2: AI Detection */}
        <Box>
          <HStack spacing={3} mb={4}>
            <Icon as={MdVisibility} boxSize={6} color="#ffbe5cff" />
            <Heading size="md" letterSpacing="wider" color="gray.800" textTransform="uppercase">
              Neural Network Inference
            </Heading>
          </HStack>
          <VStack align="start" spacing={3} pl={9}>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="gray.600">
                Sends localized frame data to a Flask-based backend for inference using <strong>YOLO detection models</strong> trained on specialized skin-health datasets.
              </Text>
            </HStack>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="gray.600">
                Identifies dermatological features like acne or dark circles through weighted confidence scoring and maps them with bounding boxes.
              </Text>
            </HStack>
          </VStack>
        </Box>

        <br />

        {/* SECTION 3: Signal Processing */}
        <Box>
          <HStack spacing={3} mb={4}>
            <Icon as={MdFavorite} boxSize={6} color="#ffbe5cff" />
            <Heading size="md" letterSpacing="wider" color="gray.800" textTransform="uppercase">
              rPPG Signal Pipeline
            </Heading>
          </HStack>
          <VStack align="start" spacing={3} pl={9}>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="gray.600">
                Extracts blood volume pulse by monitoring fluctuations change in pixel colour on regions of interest.
              </Text>
            </HStack>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="gray.600">
                Processes raw signals through detrending, moving average smoothing, and frequency masking.
              </Text>
            </HStack>
          </VStack>
        </Box>

      </Stack>
    </HStack>
  );
};

export default BriefContent;