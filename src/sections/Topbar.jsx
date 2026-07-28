import {
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Image,
  Container
} from "@chakra-ui/react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link as RouterLink, useLocation } from "react-router";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const GOLD = "#FFB200";

const TopBar = () => {
  const { open, onToggle } = useDisclosure();
  const location = useLocation();

  const tabs = {
    "Home": "/",
    "Technology": "/technology",
    "Design & Dev": "/design",
    "Team": "/team",
  };

  return (
    <Box
      as="nav"
      w="100%"
      position="sticky"
      top="0"
      zIndex="1000"
      py={4}
      px={{ base: 4, md: 8 }}
    >
      <Container maxW="1400px" p={0}>
        <MotionBox
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          bg="rgba(6, 21, 41, 0.8)"
          backdropFilter="blur(16px)"
          border="1px solid"
          borderColor="rgba(255, 178, 0, 0.2)"
          borderRadius="full"
          px={{ base: 6, md: 8 }}
          py={3}
          boxShadow="0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 178, 0, 0.1)"
        >
          <Flex align="center" justify="space-between" w="100%">
            {/* Logo & Brand */}
            <HStack spacing={3} as={RouterLink} to="/" cursor="pointer" _hover={{ opacity: 0.9 }}>
              {/* Light chip behind the mark — the logo's navy letterforms would
                  otherwise disappear into the navy nav bar. */}
              <Box
                bg="white"
                borderRadius="full"
                p="6px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="0 0 18px rgba(76, 189, 255, 0.55), 0 0 0 1px rgba(76, 189, 255, 0.35)"
                transition="all 0.25s ease"
                _hover={{ boxShadow: "0 0 26px rgba(76, 189, 255, 0.8), 0 0 0 1px rgba(76, 189, 255, 0.6)" }}
              >
                <Image
                  src="/media/logo-lc.png"
                  alt="LightCare Logo"
                  h="30px"
                  w="30px"
                  objectFit="contain"
                />
              </Box>
              <Text
                fontWeight="900"
                fontSize="lg"
                color="white"
                letterSpacing="-0.5px"
              >
                LIGHT<span style={{ color: GOLD }}>CARE</span>
              </Text>
            </HStack>

            {/* Inline Navigation Links */}
            <HStack spacing={6} display={{ base: "none", lg: "flex" }}>
              {Object.entries(tabs).map(([label, path]) => {
                const isActive = location.pathname === path;
                return (
                  <Text
                    as={RouterLink}
                    to={path}
                    key={label}
                    fontSize="xs"
                    fontWeight={isActive ? "700" : "500"}
                    color={isActive ? GOLD : "whiteAlpha.700"}
                    letterSpacing="0.05em"
                    textTransform="uppercase"
                    _hover={{ color: GOLD }}
                    transition="all 0.2s"
                    position="relative"
                    py={1}
                  >
                    {label}
                    {isActive && (
                      <MotionBox
                        layoutId="activeIndicator"
                        position="absolute"
                        bottom="0"
                        left="0"
                        w="100%"
                        h="2px"
                        bg={GOLD}
                        borderRadius="full"
                        boxShadow={`0 0 8px ${GOLD}`}
                      />
                    )}
                  </Text>
                );
              })}
            </HStack>

            {/* Action Button & Mobile Toggle */}
            <HStack spacing={3}>
              <Button
                as={RouterLink}
                to="/contact"
                bg={GOLD}
                color="#061529"
                size="sm"
                borderRadius="full"
                px={5}
                h="36px"
                fontWeight="700"
                fontSize="xs"
                letterSpacing="0.05em"
                textTransform="uppercase"
                boxShadow="0 0 12px rgba(255,178,0,0.25)"
                _hover={{ bg: "#E6A100", transform: "translateY(-1px)", boxShadow: "0 0 20px rgba(255,178,0,0.4)" }}
                _active={{ transform: "translateY(0)" }}
                rightIcon={<ArrowRight size={14} />}
                display={{ base: "none", sm: "flex" }}
              >
                Connect
              </Button>

              <IconButton
                display={{ base: "flex", lg: "none" }}
                aria-label="Open Menu"
                variant="ghost"
                color="white"
                size="sm"
                borderRadius="full"
                _hover={{ bg: "whiteAlpha.100" }}
                onClick={onToggle}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </IconButton>
            </HStack>
          </Flex>

          {/* Mobile Menu Dropdown */}
          {open && (
            <MotionBox
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              display={{ lg: "none" }}
              pt={4}
              pb={2}
              mt={3}
              borderTop="1px solid rgba(255,178,0,0.15)"
            >
              <Stack spacing={2}>
                {Object.entries(tabs).map(([label, path]) => {
                  const isActive = location.pathname === path;
                  return (
                    <Button
                      as={RouterLink}
                      to={path}
                      key={label}
                      variant="ghost"
                      color={isActive ? GOLD : "whiteAlpha.800"}
                      bg={isActive ? "rgba(255,178,0,0.1)" : "transparent"}
                      justifyContent="start"
                      size="sm"
                      borderRadius="md"
                      w="100%"
                      fontWeight={isActive ? "700" : "500"}
                      onClick={onToggle}
                      _hover={{ bg: "rgba(255,178,0,0.15)", color: GOLD }}
                    >
                      {label}
                    </Button>
                  );
                })}
                <Button
                  as={RouterLink}
                  to="/contact"
                  bg={GOLD}
                  color="#061529"
                  size="sm"
                  borderRadius="full"
                  w="100%"
                  fontWeight="700"
                  mt={2}
                  onClick={onToggle}
                >
                  Connect
                </Button>
              </Stack>
            </MotionBox>
          )}
        </MotionBox>
      </Container>
    </Box>
  );
};

export default TopBar;