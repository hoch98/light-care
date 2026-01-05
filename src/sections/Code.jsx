import {
  Text,
  Box,
  VStack
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import useWindowDimensions from "../hooks/useWindowDimensions.jsx";
import CodeContent from "@/components/specification/CodeContent.jsx";

const MotionBox = motion(Box);

function CodeSection() {
  const { width } = useWindowDimensions();
  const isWide = width > 1200;

  const contentWidth = { base: "95%", md: "85%", lg: "70%", xl: "60%" };

  const containerStyles = {
    bg: "white",
    borderRadius: "2xl",
    boxShadow: "xl",
    textAlign: "center",
    border: "1px solid",
    borderColor: "gray.100"
  };

  return (
    <Box 
      className="content"
      mb={"100px"}
      px={5} 
      display="flex" 
      flexDirection="column" 
      alignItems="center"
      w="100%"
    >
      <VStack spacing={0} mb={12}>
        <Text fontWeight="black" fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }} letterSpacing="-2px">
          Code
        </Text>
        <Box bg="#ffbe5cff" w="100%" h="8px" borderRadius="full" />
      </VStack>

      <Box
        {...containerStyles}
        h={{ base: "auto", lg: "650px" }}
        minH={{ base: "400px", lg: "650px" }}
        w={contentWidth}
        mb={6}
        position="relative"
        overflow="hidden"
      >
        <AnimatePresence mode="wait">
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            w="100%"
            h="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={{ base: 6, md: 10 }}
          >
            <CodeContent />
          </MotionBox>
        </AnimatePresence>
      </Box>

    </Box>
  );
}

export default CodeSection;