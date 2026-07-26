import { Grid, Text, Box, Link, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import useWindowDimensions from '../hooks/useWindowDimensions.jsx';
import { Link as LinkReact } from "react-router";
import GoldButton from '@/components/GoldButton';

const MotionBox = motion(Box);

function Research() {
  const { width } = useWindowDimensions();
  const isWide = width > 1200;

  const research = [
    {
      "title": "Quantitative Skin Surface Hydration Measurement by Visible Optical Image Processing",
      "description": `This study shows that skin surface hydration can be estimated from visible-light images by computing reflectance indices, which correlate well with established electrical measurement devices.`,
      "link": "https://keio.elsevierpure.com/en/publications/quantitative-skin-surface-hydration-measurement-by-visible-optica/"
    },
    {
      "title": "A Comprehensive Review of Heart Rate Measurement using remote photoplethysmography and deep learning",
      "description": `This study indicates that MAE of about 3–5 BPM is typical for good rPPG methods under varying conditions, and that combined deep learning approaches improve accuracy.`,
      "link": "https://pubmed.ncbi.nlm.nih.gov/40542336/"
    },
    {
      "title": "Shiseido Measurement System for Subsurface Scattering Light in Facial Skin",
      "description": `This study describes how optical scattering beneath skin surface correlates strongly with skin moisture, melanin, collagen, and texture.`,
      "link": "https://www.specialchem.com/cosmetics/news/shiseido-develops-measurement-system-000229681"
    },
    {
      "title": "Evaluation of Remote Photoplethysmography (rPPG) Measurement Conditions toward Telemedicine Applications (Sensors, 2021)",
      "description": `This study showed that for accurate HRV and heart rate estimation, lighting of 500-700 lux and camera frame rates above 30 fps are very important.`,
      "link": "https://www.mdpi.com/1424-8220/21/24/8357"
    }
  ];

  return (
    <Box
      mx="auto"
      w={isWide ? "80vw" : "95vw"}
      pb="100px"
      position="relative"
      pt={"40px"}
    >
      <Box textAlign="center" mb={10} display="flex" flexDirection="column" alignItems="center">
        <Box>
          <Text fontWeight="bold" fontSize={isWide ? "5xl" : "4xl"} color="white">
            RESEARCH
          </Text>
          <Box mt="10px" bg="#62daff" w="100%" h="6px" borderRadius="full" />
        </Box>
      </Box>

      <Grid templateColumns={isWide ? "repeat(2, 1fr)" : "1fr"} gap={10}>
        {research.map((r, index) => (
          <MotionBox
            key={r.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            bg="rgba(255, 255, 255, 0.05)"
            backdropFilter="blur(10px)"
            borderRadius="2xl"
            border="1px solid rgba(255, 255, 255, 0.10)"
            boxShadow="0 15px 35px rgba(0,0,0,0.4)"
            p={8}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            _hover={{ transform: "translateY(-8px)", bg: "rgba(255, 255, 255, 0.09)", boxShadow: "0 25px 45px rgba(0,0,0,0.5)" }}
          >
            <Box>
              <Text fontWeight="bold" fontSize="lg" color="white" mb={4}>
                {r.title}
              </Text>
              <Text fontSize="sm" color="whiteAlpha.700" lineHeight="relaxed">
                {r.description}
              </Text>
            </Box>

            <Box textAlign="right" mt={6}>
              <Link
                href={r.link}
                isExternal
                fontSize="xs"
                fontWeight="900"
                color="#FFB200"
                letterSpacing="widest"
                _hover={{ color: "#FFD24D", textDecoration: "none" }}
              >
                READ FULL STUDY →
              </Link>
            </Box>
          </MotionBox>
        ))}
      </Grid>
      <br />
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <VStack mt={16} w="100%" align="center">
          <GoldButton as={LinkReact} to="/design">
            Learn About Our Design & Development →
          </GoldButton>
        </VStack>
      </MotionBox>
    </Box>
  );
}

export default Research;