import {
  Box,
  Text,
  Stack,
  Heading,
  HStack,
  Icon,
  VStack,
} from "@chakra-ui/react";
// Importing relevant icons
import { MdFace, MdVisibility, MdFavorite } from "react-icons/md";

const BriefContent = () => {
  // Custom Bullet Point Component
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
        
        {/* SECTION 1 */}
        <Box>
          <HStack spacing={3} mb={4}>
            <Icon as={MdFace} boxSize={6} color="#ffbe5cff" />
            <Heading size="md" letterSpacing="wider" color="gray.800" textTransform="uppercase">
              Facial Image Processing
            </Heading>
          </HStack>
          <VStack align="start" spacing={3} pl={9}> {/* Increased padding to align with text under icon */}
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="gray.600">
                The camera captures a live facial image and automatically isolates the face.
              </Text>
            </HStack>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="gray.600">
                AI segmentation removes the background to ensure consistent and accurate analysis.
              </Text>
            </HStack>
          </VStack>
        </Box>
        <br />
        {/* SECTION 2 */}
        <Box>
          <HStack spacing={3} mb={4}>
            <Icon as={MdVisibility} boxSize={6} color="#ffbe5cff" />
            <Heading size="md" letterSpacing="wider" color="gray.800" textTransform="uppercase">
              Symptom Detection
            </Heading>
          </HStack>
          <VStack align="start" spacing={3} pl={9}>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="gray.600">
                Trained AI models analyze facial skin and eye regions.
              </Text>
            </HStack>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="gray.600">
                Identifies visible indicators such as acne, dark circles, and eye redness to inform wellness feedback.
              </Text>
            </HStack>
          </VStack>
        </Box>
        <br />
        {/* SECTION 3 */}
        <Box>
          <HStack spacing={3} mb={4}>
            <Icon as={MdFavorite} boxSize={6} color="#ffbe5cff" />
            <Heading size="md" letterSpacing="wider" color="gray.800" textTransform="uppercase">
              Heart Rate Estimation
            </Heading>
          </HStack>
          <VStack align="start" spacing={3} pl={9}>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="gray.600">
                Uses remote photoplethysmography (rPPG) to detect subtle blood-flow-related color changes in the skin.
              </Text>
            </HStack>
            <HStack align="start" spacing={4}>
              <BulletPoint />
              <Text fontSize="lg" color="gray.600">
                Estimates heart rate trends through continuous, contactless monitoring.
              </Text>
            </HStack>
          </VStack>
        </Box>

      </Stack>
    </HStack>
  );
};

export default BriefContent;