import { Text, Box, VStack, SimpleGrid, Icon, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaSearchLocation } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import useWindowDimensions from '../hooks/useWindowDimensions.jsx';

const MotionBox = motion(Box);

export default function ContactSection() {
  const { width } = useWindowDimensions();
  const isWide = width > 1200;

  const contactMethods = [
    {
      label: "Email Us",
      value: "wang.felix.2027@gmail.com",
      icon: FaEnvelope,
    },
    {
      label: "Location",
      value: "Singapore",
      icon: MdLocationOn,
    },
    {
      label: "Call Us",
      value: "+65 83994178",
      icon: FaPhone,
    },
  ];

  return (
    <Box className="content" pb="150px" pt="80px" minH={"70vh"}>
      {/* Header */}
      <VStack spacing={4} mb={20} textAlign="center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Text fontWeight="black" fontSize={isWide ? "6xl" : "4xl"} color="gray.800" letterSpacing="-2px">
            GET IN TOUCH
          </Text>
          <Box mt="10px" bg="#ffbe5cff" w="100%" h="8px" borderRadius="full" />
        </motion.div>
        
        <Text fontSize="xl" color="gray.600" maxW="600px" mt={4} px={6}>
          Interested or got any questions about LightCare?
          <br />
          We'd love to hear from you. 
        </Text>
      </VStack>

      {/* Centered Container for the Grid */}
      <Box maxW="1200px" mx="auto" px={isWide ? 20 : 6}>
        <SimpleGrid 
          columns={isWide ? 3 : 1} 
          // We use a large gap here, and ensuring the columns take up equal space
          gap={isWide ? "100px" : "40px"} 
        >
          {contactMethods.map((method, index) => (
            <MotionBox
              key={method.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              bg="whiteAlpha.700"
              backdropFilter="blur(12px) saturate(150%)"
              borderRadius="3xl"
              p={12} // Increased internal padding
              boxShadow="2xl"
              border="1px solid"
              borderColor="whiteAlpha.500"
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              // Adding width control to prevent stretching if necessary
              width="100%"
            >
              <Flex 
                bg="#ffbe5c22" 
                p={6} 
                borderRadius="2xl" 
                mb={6} 
                alignItems="center" 
                justifyContent="center"
              >
                <Icon as={method.icon} w={8} h={8} color="#ffbe5cff" />
              </Flex>
              
              <VStack spacing={3}>
                <Text fontWeight="black" fontSize="xs" color="#ffbe5cff" textTransform="uppercase" letterSpacing="widest">
                  {method.label}
                </Text>
                <Text fontWeight="bold" fontSize={isWide ? "1xl" : "xl"} color="gray.800">
                  {method.value}
                </Text>
              </VStack>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}