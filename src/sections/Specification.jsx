import {
  Grid,
  GridItem,
  Text,
  Box,
  SimpleGrid,
  Image,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions.jsx";
import CodeContent from "@/components/specification/CodeContent.jsx";
import BriefContent from "@/components/specification/BriefContent.jsx";
import VideoContent from "@/components/specification/VideoContent.jsx";

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
    { id: "demonstration", label: "Demonstration", content: <VideoContent/> },
    { id: "code", label: "Code", content: <CodeContent /> },
  ];

  const [selectedContent, setSelectedContent] = useState(items[0]);

  const containerStyles = {
    bg: "white",
    borderRadius: "xl",
    boxShadow: "md",
    p: 8,
    textAlign: "center",
  };

  return (
    <Box className="content" mb="100px" px={isWide ? 40 : 10}>
      <Box textAlign={"center"} mb={10} display="flex" flexDirection="column" alignItems={"center"}>
        <Box>
          <Text fontWeight="bold" fontSize={isWide ? "5xl" : "4xl"}>
            SPECIFICATION
          </Text>
          <Box mt="10px" mb="20px" bg="#ffbe5cff" w="100%" h="10px" />
        </Box>
      </Box>

      <Grid 
        templateColumns={isWide ? "1.2fr 0.8fr" : "1fr"} 
        gap={"50px"} 
        alignItems="center"
      >
        <GridItem>
          <Box 
            {...containerStyles} 
            h={{ base: "auto", lg: "650px" }}
            minH={{ base: "400px", lg: "650px" }}
            display="flex" 
            flexDirection="column" 
            justifyContent="center"
            alignItems="center"
            w={isWide ? "50vw" : "80vw"}
            overflow={{ base: "visible", lg: "hidden" }} 
            mb={{ base: 6, lg: 0 }}
          >
            <Box w="100%" h="100%" display="flex" justifyContent="center" alignItems="center">
              {typeof selectedContent.content === 'string' ? (
                <Text color="gray.600" fontSize="md">
                  {selectedContent.content}
                </Text>
              ) : (
                selectedContent.content
              )}
            </Box>
          </Box>
        </GridItem>

        <GridItem display="flex" alignItems="center" justifyContent="center">
          <SimpleGrid columns={isWide ? 1 : 2} gap={4} w="100%">
            {items.map((item) => {
              const isActive = selectedContent.id === item.id;
              return (
                <Box
                  key={item.id}
                  as="button"
                  onClick={() => setSelectedContent(item)}
                  {...containerStyles}
                  p={isWide ? 8 : 4}
                  w="100%"
                  transition="all 0.3s ease-in-out"
                  cursor="pointer"
                  border="2px solid"
                  borderColor={isActive ? "#ffbe5cff" : "transparent"}
                  bg={isActive ? "orange.50" : "white"}
                  _hover={{ 
                    boxShadow: "lg", 
                    transform: isWide ? "translateX(10px)" : "translateY(-5px)",
                    bg: isActive ? "orange.50" : "gray.50"
                  }}
                  _active={{ transform: "scale(0.98)" }}
                >
                  <Heading fontSize={isWide ? "xl" : "md"} letterSpacing="wider" color="gray.800">
                    {item.label}
                  </Heading>
                </Box>
              );
            })}
          </SimpleGrid>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Specification;