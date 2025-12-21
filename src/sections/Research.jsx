import { Grid, GridItem, Text, Box} from "@chakra-ui/react";
import useWindowDimensions from '../hooks/useWindowDimensions.jsx'; // reuse your hook
import { Link } from "react-router";
import { Card } from "@chakra-ui/react";

function Research() {
  const { width } = useWindowDimensions();
  const isWide = width > 1200;

  const research = [
    {
      "title": "Quantitative Skin Surface Hydration Measurement by Visible Optical Image Processing",
      "description": `This study shows that skin surface hydration can be estimated from visible-light images by computing reflectance indices (for example, their "GVR" index), which correlate well with established electrical measurement devices.`,
      "link": "https://keio.elsevierpure.com/en/publications/quantitative-skin-surface-hydration-measurement-by-visible-optica/"
    },
    {
      "title": "A Comprehensive Review of Heart Rate Measurement using remote photoplethysmography and deep learning",
      "description": `This study indicates that MAE (mean absolute error) of about 3–5 BPM is typical for good rPPG methods under varying conditions, and that deep learning / signal-processing combined approaches (e.g., using color channel blind source separation, PCA/ICA, and robust preprocessing) improve accuracy.`,
      "link": "https://pubmed.ncbi.nlm.nih.gov/40542336/"
    }, 
    {
      "title": "Shiseido Measurement System for Subsurface Scattering Light in Facial Skin",
      "description": `This study describes how optical scattering beneath skin surface (subsurface scattering) correlates strongly with skin moisture, melanin, collagen, and texture. These optical properties change with age and hydration.`,
      "link": "https://www.specialchem.com/cosmetics/news/shiseido-develops-measurement-system-000229681"
    },
    {
      "title": "Evaluation of Remote Photoplethysmography (rPPG) Measurement Conditions toward Telemedicine Applications (Sensors, 2021)",
      "description": `This study showed that for accurate HRV and heart rate estimation, lighting of 500-700 lux from the front, and camera frame rates above 30 fps, are very important. Body/head motion must be minimized.`,
      "link": "https://www.mdpi.com/1424-8220/21/24/8357"
    }
  ]

  return (
    <div className="content" style={{ marginBottom: "5%"}}>
      <Text fontWeight="bold" fontSize={width > 1200 ? "5xl" : "4xl"} style={{textAlign: "center", marginBottom: "2%"}}>
        RESEARCH
        <div style={{ marginTop: "10px", marginBottom: "20px", backgroundColor: "#ffbe5cff", width: "100%", height: "10px" }} />
      </Text>
      <br />
      <Grid templateColumns={isWide ? "repeat(4, 1fr)" : "1fr"} gap={10}>
        {research.map((r) => (
          <Box key={r.title} bg="white" borderRadius="xl" boxShadow="md" p={8} textAlign="center">
            <Text mt={4} fontWeight="semibold" fontSize="lg" className="link">
              <a href={r.link}>{r.title}</a>
            </Text>
            <br />
            <Text mt={3} fontSize="sm" color="gray.600" lineHeight="taller">{r.description}</Text>
          </Box>
        ))}
      </Grid>
    </div>
  );
}

export default Research;
