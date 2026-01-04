import {
  Text,
  Box,
  SimpleGrid,
  Image,
  Heading,
  VStack
} from "@chakra-ui/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useWindowDimensions from "../hooks/useWindowDimensions.jsx";
import CodeContent from "@/components/specification/CodeContent.jsx";
import BriefContent from "@/components/specification/BriefContent.jsx";
import VideoContent from "@/components/specification/VideoContent.jsx";

const MotionBox = motion(Box);

function Specification() {
  const { width } = useWindowDimensions();
  const isWide = width > 1200;

  const items = [
    { id: "brief", label: "Technology", content: <BriefContent /> },
    {
      id: "sketch",
      label: "Sketch",
      content: (
        <Image
          src="media/sketch.jpg"
          alt="Sketch"
          maxH="100%"
          maxW="100%"
          objectFit="contain"
          mx="auto"
        />
      )
    },
    { id: "demonstration", label: "Demonstration", content: <VideoContent /> },
    { id: "code", label: "Code", content: <CodeContent /> },
  ];

  const [selectedContent, setSelectedContent] = useState(items[0]);
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
      mt="100px"
      px={5} 
      display="flex" 
      flexDirection="column" 
      alignItems="center"
      w="100%"
    >
      <VStack spacing={0} mb={12}>
        <Text fontWeight="black" fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }} letterSpacing="-2px">
          TECHNOLOGIES
        </Text>
        <Box bg="#ffbe5cff" w="100%" h="8px" borderRadius="full" />
      </VStack>

      {/* Main Content Area with Cross-fade Transition */}
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
            key={selectedContent.id}
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
            {selectedContent.content}
          </MotionBox>
        </AnimatePresence>
      </Box>

      {/* Navigation Buttons with Hover Transitions */}
      <SimpleGrid 
        columns={{ base: 2, md: 4 }} 
        gap={4} 
        w={contentWidth}
      >
        {items.map((item) => {
          const isActive = selectedContent.id === item.id;
          return (
            <Box
              key={item.id}
              as="button"
              onClick={() => setSelectedContent(item)}
              {...containerStyles}
              p={{ base: 4, lg: 6 }}
              w="100%"
              transition="all 0.3s cubic-bezier(.4,0,.2,1)"
              cursor="pointer"
              border="2px solid"
              borderColor={isActive ? "#ffbe5cff" : "transparent"}
              bg={isActive ? "orange.50" : "white"}
              _hover={{
                boxShadow: "2xl",
                transform: "translateY(-4px)",
                bg: isActive ? "orange.50" : "gray.50"
              }}
              _active={{ transform: "scale(0.97)" }}
            >
              <Heading 
                fontSize={{ base: "xs", md: "sm", lg: "md" }} 
                letterSpacing="widest" 
                textTransform="uppercase"
                color={isActive ? "gray.800" : "gray.500"}
              >
                {item.label}
              </Heading>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

export default Specification;