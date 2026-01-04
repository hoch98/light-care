import { Box, Flex, Text, VStack, Heading, Image, Badge, HStack } from '@chakra-ui/react';

function PartsShowoff({ part, isSmall }) {
  // Destructure with default values to prevent crashes if data is missing
  const { name, description, stats, image } = part || {};

  return (
    <Box 
      w="100%" 
      bg="white" 
      borderRadius="3xl" 
      overflow="hidden"
      boxShadow="0 10px 30px rgba(0,0,0,0.05)"
      border="1px solid"
      borderColor="gray.100"
      transition="transform 0.3s ease"
      _hover={{ transform: "translateY(-5px)" }}
    >
      <Flex direction="column">
        {/* Top Section: Image Area */}
        <Box 
          bg="#fcfcfc" 
          p={6} 
          h="240px" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
        >
          <Image 
            // If part has an image use it, otherwise fallback to your default
            src={image || "/media/technologies/raspberrypi.png"} 
            alt={name} 
            maxH="160px" 
            objectFit="contain"
          />
        </Box>

        {/* Bottom Section: Content */}
        <Box p={6}>
          <VStack align="flex-start" spacing={3}>

            <Box>
              <Heading size="md" fontWeight="800" letterSpacing="-0.5px">
                {name || "Unknown Component"}
              </Heading>
              <Box w="30px" h="3px" bg="#ffbe5cff" mt={1} />
            </Box>

            <Text color="gray.500" fontSize="sm" noOfLines={3} minH="60px">
              {description}
            </Text>

            {/* Dynamic Stats Row */}
            <HStack w="100%" pt={3} borderTop="1px solid" borderColor="gray.50" justify="space-between">
              {stats && Object.entries(stats).map(([key, value]) => (
                <VStack align="flex-start" key={key} spacing={0}>
                  <Text fontSize="10px" color="gray.400" fontWeight="bold" textTransform="uppercase">
                    {key}
                  </Text>
                  <Text fontSize="sm" fontWeight="bold">
                    {value}
                  </Text>
                </VStack>
              ))}
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}

export default PartsShowoff;