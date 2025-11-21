import { Grid, GridItem, Text } from "@chakra-ui/react";
import useWindowDimensions from '../hooks/useWindowDimensions.jsx'; // reuse your hook


function LightCare() {
  const { width } = useWindowDimensions();
  return (
    <div className="content" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Grid
        templateColumns={width > 1200 ? "1fr 2fr" : "1fr"}
        gap={"2%"}
        w={width > 1200 ? "80vw" : "95vw"}
        px={width > 1200 ? 4 : 16} // padding on sides
        py={width > 1200 ? 8 : 16} // vertical spacing
        textAlign={width > 1200 ? "left" : "center"}
        alignItems="start"
      >
        <GridItem >
          <Text fontWeight="bold" fontSize={width > 1200 ? "5xl" : "4xl"}>
            WHAT IS <br /> LIGHT CARE?
          </Text>
          <div style={{ marginTop: "10px", marginBottom: "20px", backgroundColor: "#ffbe5cff", width: (width > 1200 ? "80%": "100%"), height: "10px" }} />
        </GridItem>

        <GridItem>
          <Text fontSize={width > 1200 ? "xl" : "l"} lineHeight="taller">
            Light Care is more than just a mirror — it’s a smart wellness companion designed to help you understand your body and optimize your wellbeing. At its core, Light Care uses advanced computer vision and AI to monitor subtle signs of fatigue and stress. Fine-tuned object detection models analyze your facial features in real-time, detecting indicators such as eye strain, facial tension, and even changes in skin tone.
            <br /><br />
            Using these insights, Light Care can estimate physiological metrics like heart rate just by observing slight variations in your face. From there, it provides personalized guidance, whether that’s recommending a short break, a relaxation exercise, or lifestyle adjustments to improve sleep and energy levels.
          </Text>
        </GridItem>
      </Grid>
    </div>
  )
}

export default LightCare