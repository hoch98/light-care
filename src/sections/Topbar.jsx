import { 
  Box, 
  Flex, 
  HStack, 
  Text, 
  IconButton, 
  Button, 
  useDisclosure, 
  Stack,
  Image
} from "@chakra-ui/react";
import { Menu, X, User } from "lucide-react";
// Import useLocation alongside RouterLink
import { Link as RouterLink, useLocation } from "react-router"; 

const TopBar = () => {
  const { open, onToggle } = useDisclosure();
  // 1. Get the current location object
  const location = useLocation();

  const tabs = {
    "Home": "/",
    "Technology": "/technology",
    "Design & Development": "/build",
    "Our Team": "/team",
  };

  return (
    <Box 
      as="nav" 
      w="100vw" 
      bg="white/80" 
      backdropFilter="blur(10px)"
      borderBottom="1px solid" 
      borderColor="gray.100"
      position="sticky"
      top="0"
      zIndex="1000"
      px={12} 
      py={4}
    >
      <Flex align="center" justify="space-between" w="100%">
        
        {/* Left: Branding */}
        <HStack spacing={5} as={RouterLink} to="/" cursor="pointer">
          <Image 
            src="/media/logo-notext.png" 
            alt="Logo"
            h="45px" 
            objectFit="contain"
            fallbackSrc="https://via.placeholder.com/45"
          />
          <Box lineHeight="1">
            <Text 
              fontWeight="black" 
              fontSize="2xl" 
              color="gray.800" 
              letterSpacing="-1.5px"
            >
              Light<Text as="span" color="#ffbe5cff">Care</Text>
            </Text>
          </Box>
        </HStack>

        {/* Center: Desktop Navigation */}
        <HStack 
          display={{ base: "none", lg: "flex" }}
          gap="60px"
          flex="1"
          justify="center"
        >
          {Object.entries(tabs).map(([label, path]) => {
            // 2. Determine if this tab is active
            const isActive = location.pathname === path;

            return (
              <Text 
                as={RouterLink}
                to={path}
                key={label}
                fontSize="lg" 
                fontWeight="bold" 
                // 3. Conditional styling based on active state
                color={isActive ? "#ffbe5cff" : "gray.500"}
                borderBottom={isActive ? "2px solid #ffbe5cff" : "2px solid transparent"}
                cursor="pointer"
                transition="all 0.2s"
                whiteSpace="nowrap"
                textDecoration="none"
                px={2}
                pb={1} // Add padding for the border
                _hover={{ color: "#ffbe5cff", textDecoration: "none" }}
              >
                {label}
              </Text>
            );
          })}
        </HStack>

        <HStack spacing={4}>
          <Button 
            as={RouterLink}
            to="/contact"
            bg="#ffbe5cff" 
            color="white" 
            size="md" 
            borderRadius="full"
            px={8}
            _hover={{ bg: "#e6ab52ff", textDecoration: "none" }}
            leftIcon={<User size={18} />}
            display={{ base: "none", lg: "flex" }}
          >
            Contact Us
          </Button>

          <IconButton
            display={{ base: "flex", lg: "none" }}
            aria-label="Open Menu"
            variant="ghost"
            onClick={onToggle}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </IconButton>
        </HStack>
      </Flex>

      {/* Mobile Menu */}
      {open && (
        <Box display={{ lg: "none" }} pb={4} pt={2}>
          <Stack spacing={2}>
            {Object.entries(tabs).map(([label, path]) => (
              <Button 
                as={RouterLink}
                to={path}
                key={label} 
                variant={location.pathname === path ? "subtle" : "ghost"} // Highlight active in mobile
                colorScheme={location.pathname === path ? "orange" : "gray"}
                justifyContent="start" 
                w="100%"
                onClick={onToggle}
              >
                {label}
              </Button>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default TopBar;