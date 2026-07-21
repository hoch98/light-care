import React, { useRef, useState } from "react";
import { Box, Stack } from "@chakra-ui/react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

const VideoContent = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
        setShowOverlay(false);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowOverlay(true);
      }
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
    setShowOverlay(false);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
    setShowOverlay(true);
  };

  return (
    <Stack spacing={6} w="100%" h="100%" textAlign="left" justifyContent="center" align="center">
      <MotionBox
        position="relative"
        bg="#0A0B0E"
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="0 0 40px rgba(255, 178, 0, 0.15), 0 20px 40px rgba(0, 0, 0, 0.6)"
        border="1px solid"
        borderColor="rgba(255, 178, 0, 0.25)"
        width="100%"
        maxW="900px"
        my={{ base: 6, md: 8 }}
        cursor="pointer"
        onClick={togglePlay}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <video
          ref={videoRef}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'contain',
            background: '#0A0B0E'
          }}
        >
          <source src="/media/demonstration.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Futuristic Click-to-Play/Pause Overlay */}
        <AnimatePresence>
          {showOverlay && !isPlaying && (
            <MotionBox
              position="absolute"
              inset={0}
              bg="blackAlpha.400"
              backdropFilter="blur(2px)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Box
                w="72px"
                h="72px"
                borderRadius="full"
                bg="#FFB200"
                color="black"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="0 0 30px rgba(255, 178, 0, 0.6)"
              >
                <Play size={32} fill="currentColor" style={{ marginLeft: "3px" }} />
              </Box>
            </MotionBox>
          )}
        </AnimatePresence>
      </MotionBox>
    </Stack>
  );
};

export default VideoContent;