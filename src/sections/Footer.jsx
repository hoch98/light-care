import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Link,
  VStack,
  HStack
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ShieldCheck, Activity } from "lucide-react";
import useWindowDimensions from '../hooks/useWindowDimensions.jsx';

const GOLD = "#FFB200";

export default function Footer() {
  const { width } = useWindowDimensions();
  const isWide = width > 1200;

  const linkStyles = {
    color: "whiteAlpha.700",
    fontSize: "sm",
    transition: "all 0.2s ease-in-out",
    _hover: {
      color: GOLD,
      textDecoration: "none",
      transform: "translateX(4px)"
    },
    _active: { color: GOLD },
    _focus: { boxShadow: "none" }
  };

  return (
    <Box
      bg="#040507"
      color="white"
      mt="auto"
      as="footer"
      position="relative"
      overflow="hidden"
      borderTop="1px solid rgba(255, 178, 0, 0.15)"
    >
      {/* Ambient Background Glowing Shapes & Grid Effects */}
      <Box
        position="absolute"
        top="-150px"
        left="10%"
        w="400px"
        h="400px"
        bg="radial-gradient(circle, rgba(255,178,0,0.08) 0%, rgba(10,11,14,0) 70%)"
        filter="blur(60px)"
        pointerEvents="none"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="-100px"
        right="5%"
        w="500px"
        h="500px"
        bg="radial-gradient(circle, rgba(255,178,0,0.05) 0%, rgba(6,7,10,0) 70%)"
        filter="blur(80px)"
        pointerEvents="none"
        zIndex={0}
      />
      <Box
        position="absolute"
        inset="0"
        opacity="0.03"
        backgroundImage="radial-gradient(#FFB200 1px, transparent 1px)"
        backgroundSize="32px 32px"
        pointerEvents="none"
        zIndex={0}
      />

      <Container as={Stack} maxW={'1200px'} py={20} position="relative" zIndex={1}>
        <SimpleGrid
          templateColumns={isWide ? '2fr 1fr 1fr 1fr' : '1fr'}
          spacing={12}
        >
          {/* Brand & Mission */}
          <Stack spacing={6}>
            <Box>
              <Text fontWeight="900" fontSize="2xl" color="white" letterSpacing="-1px" mb={2}>
                LIGHT<span style={{ color: GOLD }}>CARE</span>
              </Text>
              <Text fontSize="xs" fontWeight="700" color={GOLD} letterSpacing="0.2em" textTransform="uppercase">
                Contactless Wellness Mirror
              </Text>
            </Box>
            <Text fontSize="sm" color="whiteAlpha.700" maxW="320px" lineHeight="tall">
              Transforming everyday routines into effortless wellness insights through advanced photoplethysmography and edge AI.
            </Text>
            
          </Stack>
          <br />

          {/* Navigation Links */}
          <Stack spacing={4}>
            <Text fontSize="xs" fontWeight="800" color={GOLD} letterSpacing="0.15em" textTransform="uppercase">
              Navigation
            </Text>
            <Stack spacing={2.5}>
              <Link href="/" {...linkStyles}>Home</Link>
              <Link href="/technology" {...linkStyles}>Technology</Link>
              <Link href="/design" {...linkStyles}>Design & Development</Link>
              <Link href="/team" {...linkStyles}>Our Team</Link>
            </Stack>
          </Stack>

          <br />

          {/* Legal & Privacy */}
          <Stack spacing={4}>
            <Text fontSize="xs" fontWeight="800" color={GOLD} letterSpacing="0.15em" textTransform="uppercase">
              Governance
            </Text>
            <Stack spacing={2.5}>
              <Link href="/privacy" {...linkStyles}>Privacy Architecture</Link>
              <Link href="/security" {...linkStyles}>Data Security</Link>
              <Link href="/terms" {...linkStyles}>Terms of Service</Link>
              <Link href="/contact" {...linkStyles}>Contact Support</Link>
            </Stack>
          </Stack>

          <br />
          {/* Contact Details */}
          <Stack spacing={4}>
            <Text fontSize="xs" fontWeight="800" color={GOLD} letterSpacing="0.15em" textTransform="uppercase">
              Direct Contact
            </Text>
            <VStack align="start" spacing={3}>
              <Box bg="rgba(255,178,0,0.05)" p={3} borderRadius="10px" border="1px solid rgba(255,178,0,0.15)" w="100%">
                <Text fontSize="10px" fontWeight="bold" color={GOLD} textTransform="uppercase" letterSpacing="wider">Email Support</Text>
                <Text fontSize="sm" color="whiteAlpha.900" fontWeight="500">wang.felix.2027@gmail.com</Text>
              </Box>

              <Box bg="rgba(255,178,0,0.05)" p={3} borderRadius="10px" border="1px solid rgba(255,178,0,0.15)" w="100%">
                <Text fontSize="10px" fontWeight="bold" color={GOLD} textTransform="uppercase" letterSpacing="wider">Direct Line</Text>
                <Text fontSize="sm" color="whiteAlpha.900" fontWeight="500">+65 8399 4178</Text>
              </Box>

              <Text fontSize="xs" color="whiteAlpha.500" lineHeight="short">
                Available for project collaboration and pilot inquiries.
              </Text>
            </VStack>
          </Stack>
        </SimpleGrid>
      </Container>

      {/* Bottom Bar */}
      <Box
        borderTop="1px solid"
        borderColor="rgba(255, 178, 0, 0.1)"
        bg="rgba(10, 11, 14, 0.6)"
        backdropFilter="blur(10px)"
      >
        <Container
          as={Stack}
          maxW={'1200px'}
          py={5}
          direction={isWide ? 'row' : 'column'}
          spacing={4}
          justify={isWide ? 'space-between' : 'center'}
          align={'center'}
        >
          <Text fontSize="xs" color="whiteAlpha.500" fontWeight="medium">
            © {new Date().getFullYear()} LightCare Wellness Systems. All rights reserved.
          </Text>
          <HStack spacing={6}>
            <Link href="/privacy" fontSize="xs" color="whiteAlpha.500" _hover={{ color: GOLD }}>Privacy Policy</Link>
            <Link href="/terms" fontSize="xs" color="whiteAlpha.500" _hover={{ color: GOLD }}>Terms of Use</Link>
            <Link href="/contact" fontSize="xs" color="whiteAlpha.500" _hover={{ color: GOLD }}>Inquiries</Link>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
}