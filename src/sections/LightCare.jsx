import { Grid, GridItem, Text } from "@chakra-ui/react";
import useWindowDimensions from '../hooks/useWindowDimensions.jsx';


function LightCare() {
  const { width } = useWindowDimensions();
  return (
    <div className="content" id="mainContent">
      <Grid
        templateColumns={width > 1200 ? "1fr 2fr" : "1fr"}
        gap={"2%"}
        w={width > 1200 ? "80vw" : "95vw"}
        px={width > 1200 ? 4 : 16}
        py={width > 1200 ? 8 : 16}
        textAlign={width > 1200 ? "left" : "center"}
        alignItems="start"
      >
        <GridItem >
          <Text fontWeight="bold" fontSize={width > 1200 ? "5xl" : "4xl"}>
            WHAT IS <br /> LIGHT CARE?
          </Text>
          <div style={{ marginTop: "10px", marginBottom: "20px", backgroundColor: "#ffbe5cff", width: (width > 1200 ? "80%" : "100%"), height: "10px" }} />
        </GridItem>

        <GridItem>
          <Text fontSize={width > 1200 ? "xl" : "l"} lineHeight="taller">
            Light Care is more than just a mirror, it is an AI-powered wellness mirror that provides quick, contactless insights during a user's normal morning routine such as while brushing their teeth.
            <br /><br />
            Using a camera attached, it will be able to analyse how light reflects off the face to detect patterns related to hydration, fatigue, skin condition, and heart rate trends. Based on data and a trained AI model, the screen on the smart mirror will display a quick overview of your scan, and provide personalized guidance for your day, or lifestyle adjustments.
          </Text>
        </GridItem>
      </Grid>
    </div>
  )
}

export default LightCare