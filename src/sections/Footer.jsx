import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Link,
  VStack,
} from "@chakra-ui/react";
import useWindowDimensions from '../hooks/useWindowDimensions.jsx';

export default function Footer() {
  const { width } = useWindowDimensions();
  const isWide = width > 1200;

  const linkStyles = {
    color: "gray.700",
    fontSize: "sm",
    transition: "all 0.2s ease-in-out",
    _hover: {
      color: "#ffbe5cff",
      textDecoration: "none",
      transform: "translateX(2px)"
    },
    _active: { color: "#ffbe5cff" },
    _focus: { boxShadow: "none" }
  };

  return (
    <Box
      bg="rgba(255, 255, 255, 0.4)"
      backdropFilter="blur(10px)"
      borderTop="1px solid rgba(255, 255, 255, 0.3)"
      color="gray.700"
      mt="auto"
      as="footer"
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={isWide ? '2fr 1fr 1fr 1fr' : '1fr'}
          spacing={12}
        >
          <Stack spacing={6}>
            <Box>
              <Text fontWeight="black" fontSize="2xl" color="gray.800" letterSpacing="-1px">
                LIGHT<Text as="span" color="#ffbe5cff"> CARE</Text>
              </Text>
              <Box h="4px" w="40px" bg="#ffbe5cff" borderRadius="full" mt={1} />
            </Box>
            <Text fontSize={'sm'} maxW="300px" lineHeight="tall" color="gray.600">
              Empowering daily wellness through non-intrusive,
              AI-driven mirror technology. Making health awareness
              as simple as looking in the mirror.
            </Text>
          </Stack>

          <Stack align={isWide ? 'flex-start' : 'center'} spacing={3}>
            <Text fontWeight={'bold'} fontSize={'lg'} mb={2} color="gray.800">Technologies</Text>
            <Link href={'/technology'} {...linkStyles}>Neural Networks</Link>
            <Link href={'/technology'} {...linkStyles}>Components</Link>
            <Link href={'/technology'} {...linkStyles}>Research</Link>
          </Stack>

          <Stack align={isWide ? 'flex-start' : 'center'} spacing={3}>
            <Text fontWeight={'bold'} fontSize={'lg'} mb={2} color="gray.800">Our Team</Text>
            <Link href={'/team'} {...linkStyles}>Mission</Link>
            <Link href={'/team'} {...linkStyles}>Vision</Link>
            <Link href={'/team'} {...linkStyles}>Values</Link>
          </Stack>

          <Stack align={isWide ? 'flex-start' : 'center'}>
            <Text fontWeight={'bold'} fontSize={'lg'} mb={2} color="gray.800">Connect</Text>
            <VStack align={isWide ? 'flex-start' : 'center'} spacing={3}>
              <Box>
                <Text fontSize="xs" fontWeight="bold" color="#ffbe5cff" textTransform="uppercase">Email</Text>
                <Text fontSize="sm" color="gray.700">wang.felix.2027@gmail.com</Text>
              </Box>

              <Box>
                <Text fontSize="xs" fontWeight="bold" color="#ffbe5cff" textTransform="uppercase">Phone</Text>
                <Text fontSize="sm" color="gray.700">+65 8399 4178</Text>
              </Box>

              <Text fontSize="xs" color="gray.500" lineHeight="short" textAlign={isWide ? "left" : "center"}>
                Feel free to reach out for project details or collaboration.
              </Text>
            </VStack>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={'rgba(0,0,0,0.05)'}
        bg="rgba(255, 255, 255, 0.2)"
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={isWide ? 'row' : 'column'}
          spacing={4}
          justify={isWide ? 'space-between' : 'center'}
          align={isWide ? 'center' : 'center'}
        >
          <Text fontSize="xs" color="gray.500" fontWeight="medium">
            Conrad Light Care Project © 2026
          </Text>
          <Text fontSize="xs" color="gray.400" fontStyle="italic">
            Non-diagnostic wellness tool.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}