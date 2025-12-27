import { Grid, GridItem, Text, Image, Box, Flex } from "@chakra-ui/react";
import useWindowDimensions from '../hooks/useWindowDimensions.jsx';

function LightCare() {
  const { width } = useWindowDimensions();
  const isDesktop = width > 1200;

  return (
    <div className="content" id="mainContent">
      <Grid
        templateColumns={isDesktop ? "1fr 2fr" : "1fr"}
        gap={"2%"}
        w={isDesktop ? "80vw" : "95vw"}
        px={isDesktop ? 4 : 16}
        py={isDesktop ? 8 : 16}
        textAlign={isDesktop ? "left" : "center"}
        alignItems="start"
      >
        <GridItem>
          <Text fontWeight="bold" fontSize={isDesktop ? "5xl" : "4xl"}>
            WHAT IS <br /> LIGHT CARE?
          </Text>
          
          <Box 
            mt="10px" 
            mb="20px" 
            bg="#ffbe5cff" 
            w={isDesktop ? "80%" : "100%"} 
            h="10px" 
          />
          <Flex justify={isDesktop ? "left" : "center"} ml={isDesktop ? 10 : 0} w="100%" mb={6}>
            <Image 
              src="media/logo.png" 
              alt="Light Care Logo" 
              maxH="200px" 
            />
          </Flex>
        </GridItem>

        <GridItem>
          <Text fontSize={isDesktop ? "xl" : "lg"} lineHeight="taller">
            Light Care is more than just a mirror, it is an AI-powered wellness mirror that provides quick, contactless insights during a user's normal morning routine such as while brushing their teeth.
            <br /><br />
            Using a camera attached, it will be able to analyse how light reflects off the face to detect patterns related to hydration, fatigue, skin condition, and heart rate trends. Based on data and a trained AI model, the screen on the smart mirror will display a quick overview of your scan, and provide personalized guidance for your day, or lifestyle adjustments.
          </Text>
        </GridItem>
      </Grid>
    </div>
  )
}

export default LightCare;