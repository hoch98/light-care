import {
  Grid,
  GridItem,
  Text,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions.jsx";
import CodeContent from "@/components/specification/CodeContent.jsx";
import BriefContent from "@/components/specification/BriefContent.jsx";

function Specification() {
  const { width } = useWindowDimensions();
  const isWide = width > 1200;

  const items = [
    { id: "brief", label: "How Does It Work?", content: <BriefContent/> },
    { id: "sketch", label: "Sketch", content: "Sketches" },
    { id: "models", label: "Models", content: "Trained models" },
    { id: "code", label: "Code", content: <CodeContent/> },
  ];

  // Initialize with the first item so the box has content on load
  const [selectedContent, setSelectedContent] = useState(items[2]);

  const containerStyles = {
    bg: "white",
    borderRadius: "xl",
    boxShadow: "md",
    p: 8,
    textAlign: "center",
  };

  return (
    <Box className="content" mb="100px" px={isWide ? 40 : 10}>
      {/* Header Section */}
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
        alignItems="stretch"
      >
        
        <GridItem>
          <Box 
            {...containerStyles} 
            h="100%" 
            display="flex" 
            flexDirection="column" 
            justifyContent="center"
            w={isWide ? "50vw" : "80vw"}
          >
            <Text color="gray.600" fontSize="md">
              {selectedContent.content}
            </Text>
          </Box>
        </GridItem>

        <GridItem>
          <SimpleGrid 
            columns={isWide ? 1 : 2} 
            gap={4}
          >
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
                  <Text fontSize={isWide ? "xl" : "md"} fontWeight="bold">
                    {item.label}
                  </Text>
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