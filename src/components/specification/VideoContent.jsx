import { Box, Stack } from "@chakra-ui/react";

const VideoContent = () => {
  return (
    <Stack spaceY={6} w="100%" h="100%" textAlign="left" justifyContent="center">
      <Box
        position="relative"
        bg="black"
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="2xl"
        aspectRatio={16 / 9}
        width="100%"
        maxW="100%"
        maxH="70vh"
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