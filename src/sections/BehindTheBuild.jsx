import { useState } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Image,
  VStack,
  Portal
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

// Animation configuration for that "smooth" spring feel
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 10,
    transition: { duration: 0.2 } 
  }
};

function BehindTheBuild() {
  const [selectedImg, setSelectedImg] = useState(null);

  const images = [
    { src: "/media/build/image0.jpg", caption: "Initial Sketch" },
    { src: "/media/build/image1.jpg", caption: "Monitor fitting" },
    { src: "/media/build/image2.jpg", caption: "Monitor disassembly" },
    { src: "/media/build/image6.jpg", caption: "Display positioning adjustment" },
    { src: "/media/build/image10.jpg", caption: "Reducing monitor to fit form factor" },
    { src: "/media/build/image15.jpg", caption: "Display shine-through test" },
  ];

  return (
    <Box className="content" mt="120px" px={5} display="flex" flexDirection="column" alignItems="center" w="100%" mb="50px">
      <VStack spacing={0} mb={12}>
        <Text fontWeight="black" fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }} letterSpacing="-2px">
          FROM IDEA TO IMPLEMENTATION
        </Text>
        <Box bg="#ffbe5cff" w="100%" h="8px" borderRadius="full" />
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w={{ base: "90%", md: "85%", lg: "70%", xl: "60%" }}>
        {images.map((img, i) => (
          <MotionBox
            key={i}
            position="relative"
            overflow="hidden"
            borderRadius="2xl"
            boxShadow="xl"
            cursor="pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }} // Visual feedback on click
            onClick={() => setSelectedImg(img)}
          >
            <Image src={img.src} alt={img.caption} objectFit="cover" w="100%" h="100%" />
            <Box position="absolute" bottom="0" w="100%" px={4} py={3} bg="rgba(0,0,0,0.55)" style={{ backdropFilter: "blur(6px)" }}>
              <Text color="white" fontSize="sm" fontWeight="medium">{img.caption}</Text>
            </Box>
          </MotionBox>
        ))}
      </SimpleGrid>

      <Portal>
        <AnimatePresence>
          {selectedImg && (
            <Box
              as={motion.div}
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              position="fixed"
              top={0}
              left={0}
              w="100vw"
              h="100vh"
              bg="rgba(0,0,0,0.85)"
              style={{ backdropFilter: "blur(10px)" }} // Smooth background blur
              zIndex={9999}
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => setSelectedImg(null)}
            >
              <Box
                as={motion.div}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                maxW={{ base: "95%", md: "80%" }}
                onClick={(e) => e.stopPropagation()}
                textAlign="center"
              >
                <Image
                  src={selectedImg.src}
                  alt={selectedImg.caption}
                  maxH="80vh"
                  borderRadius="20px"
                  boxShadow="2xl"
                  border="1px solid rgba(255,255,255,0.1)"
                />
                <Text color="white" mt={6} fontSize="2xl" fontWeight="bold" letterSpacing="tight">
                  {selectedImg.caption}
                </Text>
                <Text 
                  color="rgba(255,255,255,0.5)" 
                  mt={2} 
                  fontSize="sm" 
                  cursor="pointer" 
                  _hover={{ color: "white" }} 
                  onClick={() => setSelectedImg(null)}
                >
                  Click anywhere to close
                </Text>
              </Box>
            </Box>
          )}
        </AnimatePresence>
      </Portal>
    </Box>
  );
}

export default BehindTheBuild;