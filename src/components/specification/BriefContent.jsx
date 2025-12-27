import { 
  Box, 
  Text, 
  Stack, 
  Heading, 
  Separator,
  HStack,
  Circle
} from "@chakra-ui/react";

const BriefContent = () => {
  return (
    <Stack spaceY={10} textAlign="left" w="100%" py={2}>
      
      <Box position="relative" pl={6}>
        <Box position="absolute" left={0} top={0} bottom={0} w="2px" bg="#ffbe5cff" />
        <Heading size="md" mb={3} letterSpacing="wider" color="gray.800">
          1. FACIAL IMAGE PROCESSING
        </Heading>
        <Text fontSize="lg" color="gray.600" lineHeight="relaxed">
          The system captures images via a built-in webcam and performs preprocessing to isolate the face. 
          A segmentation model removes the background and non-relevant regions, ensuring that background 
          objects do not interfere with the analysis.
        </Text>
      </Box>

      <Box position="relative" pl={6}>
        <Box position="absolute" left={0} top={0} bottom={0} w="2px" bg="#ffbe5cff" opacity={0.6} />
        <Heading size="md" mb={3} letterSpacing="wider" color="gray.800">
          2. SYMPTOM DETECTION
        </Heading>
        <Text fontSize="lg" color="gray.600" lineHeight="relaxed">
          The processed image passes through custom-tuned object detection models trained on public datasets. 
          These models specifically identify visual skin and eye-related symptoms, such as <strong>acne, 
          dark circles, and eye redness</strong>, providing feedback on skin condition.
        </Text>
      </Box>

      <Box position="relative" pl={6}>
        <Box position="absolute" left={0} top={0} bottom={0} w="2px" bg="#ffbe5cff" opacity={0.3} />
        <Heading size="md" mb={3} letterSpacing="wider" color="gray.800">
          3. MEASURING HEART RATE
        </Heading>
        <Text fontSize="lg" color="gray.600" lineHeight="relaxed">
          Using remote photoplethysmography (rPPG), the system analyzes subtle color changes in the skin 
          caused by blood flow. By tracking these fluctuations in colour over time, the system estimates the 
          user's heart rate remotely.
        </Text>
      </Box>

    </Stack>
  );
};

export default BriefContent;