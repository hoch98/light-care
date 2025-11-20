import { Grid, GridItem, Text } from "@chakra-ui/react";
import useWindowDimensions from '../hooks/useWindowDimensions.jsx'; // reuse your hook
import { Link } from "react-router";
import { Card } from "@chakra-ui/react";

function Research() {
  const { width } = useWindowDimensions();

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
    <div className="content" style={{display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "5%"}}>
      <Text fontWeight="bold" fontSize={width > 1200 ? "5xl" : "4xl"} style={{textAlign: "center", marginBottom: "2%"}}>
        RESEARCH
        <div style={{ marginTop: "10px", marginBottom: "20px", backgroundColor: "#ffbe5cff", width: "100%", height: "10px" }} />
      </Text>
      <br />
      <Grid
        templateColumns={width > 1200 ? "1fr 1fr 1fr 1fr" : (width > 900 ? "1fr 1fr" : "1fr")}
        gap={"3%"}
        w="80vw"
        alignItems="start"
      >
        {
          research.map((item) => {
            return (
              <GridItem>
                <Card.Root borderRadius={"3%"} style={{aspectRatio: "1/1", padding: "10%", display: "flex", justifyContent: "center", flexDirection:"column"}}>
                  <Link to={item.link}>
                    <Text className="link" fontWeight="bold" fontSize={width > 1200 ? "2xl" : "1xl"} style={{textAlign: "center"}}>
                      {item.title}
                    </Text>
                  </Link>
                  <br />
                  <Text fontSize={width > 1200 ? "1.2em" : (width > 900 ? "1.5em": "1xl")} style={{textAlign: "center"}}>
                    {item.description}
                  </Text>
                </Card.Root>
              </GridItem>
            )
          })
        }
      </Grid>
    </div>
  );
}

export default Research;
