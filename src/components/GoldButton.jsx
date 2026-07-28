import { Button } from "@chakra-ui/react";

const GOLD = "#FFB200";

// The one button design used across the whole site — gold pill, bold dark
// text, soft gold glow (matches the "Explore Technology" reference).
export default function GoldButton(props) {
  return (
    <Button
      bg={GOLD}
      color="#061529"
      fontWeight="800"
      borderRadius="full"
      px={10}
      py={7}
      fontSize="md"
      boxShadow="0 0 20px rgba(255,178,0,0.3)"
      _hover={{ bg: "#E6A100", transform: "translateY(-2px)", boxShadow: "0 0 30px rgba(255,178,0,0.45)" }}
      _active={{ transform: "scale(0.98)" }}
      {...props}
    />
  );
}
