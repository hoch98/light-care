import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  VStack,
  Heading,
  Image,
  HStack
} from '@chakra-ui/react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

function PartsShowoff({ part }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { name, description, stats, image, longDescription } = part || {};

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
        <Box bg="#fcfcfc" p={6} h="240px" display="flex" alignItems="center" justifyContent="center">
          <Image
            src={image || "/media/technologies/raspberrypi.png"}
            alt={name}
            maxH="160px"
            objectFit="contain"
          />
        </Box>

        <Box p={6}>
          <VStack align="flex-start" spacing={3}>

            <Flex w="100%" justify="space-between" align="center">
              <Box>
                <Heading size="md" fontWeight="800" letterSpacing="-0.5px">
                  {name || "Unknown Component"}
                </Heading>
                <Box w="30px" h="3px" bg="#ffbe5cff" mt={1} />
              </Box>

              {
                longDescription ? (
                  <Box
                    onClick={() => setIsExpanded(!isExpanded)}
                    cursor="pointer"
                    p={2}
                    borderRadius="full"
                    bg={isExpanded ? "orange.50" : "transparent"}
                    transition="all 0.2s"
                    _hover={{ bg: "gray.100" }}
                    zIndex={10}
                  >
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <ChevronDown size={24} color={isExpanded ? "#ffbe5cff" : "#A0AEC0"} />
                    </motion.div>
                  </Box>
                )
                  :
                  ""
              }
            </Flex>

            <Text color="gray.500" fontSize="sm" noOfLines={isExpanded ? undefined : 3}>
              {description}
            </Text>


            {
              longDescription ?
                (
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <MotionBox
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        overflow="hidden"
                        w="100%"
                      >
                        <Box pt={4} pb={2} borderTop="1px solid" borderColor="gray.50" mt={2}>
                          <Text fontSize="xs" fontWeight="bold" color="gray.400" mb={2} textTransform="uppercase">
                            Extended Details
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            {longDescription || "High-performance integration optimized for LightCare's local processing requirements."}
                          </Text>
                        </Box>
                      </MotionBox>
                    )}
                  </AnimatePresence>
                )
                :
                ""
            }

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