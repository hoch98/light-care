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
import { Link as RouterLink } from "react-router"; // Import the Link component

const TopBar = () => {
  const { open, onToggle } = useDisclosure();

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
          spacing={0} // Reset spacing to avoid conflicts
          gap="60px"  // Use a hard 'gap' property for modern flex spacing
          flex="1"    // Allows the container to grow
          justify="center" // Ensures it stays centered between brand and actions
        >
          {Object.entries(tabs).map(([label, path]) => (
            <Text 
              as={RouterLink}
              to={path}
              key={label}
              fontSize="lg" 
              fontWeight="bold" 
              color="gray.500"
              cursor="pointer"
              transition="all 0.2s"
              whiteSpace="nowrap"
              textDecoration="none"
              px={2} // Adds a small internal padding buffer
              _hover={{ color: "#ffbe5cff", transform: "translateY(-1px)", textDecoration: "none" }}
            >
              {label}
            </Text>
          ))}
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
                variant="ghost" 
                justifyContent="start" 
                w="100%"
                onClick={onToggle} // Close menu on click
              >
                {label}
              </Button>
            ))}
            <Button 
              as={RouterLink}
              to={"/contact"}
              key={"Contact Us"} 
              variant="ghost" 
              justifyContent="start" 
              w="100%"
              onClick={onToggle} // Close menu on click
            >
              Cpntact Us
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default TopBar;