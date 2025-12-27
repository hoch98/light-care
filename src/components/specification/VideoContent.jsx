import { Box, Stack } from "@chakra-ui/react";

const VideoContent = () => {
  return (
    <Stack spaceY={6} w="100%" h="100%" textAlign="left" justifyContent="center">
      {/* Video Container */}
      <Box 
        position="relative" 
        bg="black" 
        borderRadius="2xl" 
        overflow="hidden" 
        boxShadow="2xl"
        // 1. Maintain the ratio
        aspectRatio={16 / 9}
        // 2. Ensure it fills width but is capped by the viewport height
        width="100%"
        maxW="100%"
        maxH="70vh" // Prevents the video from being taller than 70% of any screen
        margin="0 auto"
      >
        <video 
          controls 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain' 
          }}
        >
          <source src="/media/demonstration.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
    </Stack>
  );
};

export default VideoContent;