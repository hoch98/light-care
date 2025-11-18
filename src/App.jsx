import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { useProgress, Html, Environment, Text as Text3d, ContactShadows, OrbitControls } from '@react-three/drei'
import { Loader } from "@/components/retroui/Loader";
import * as React from 'react'
import Product from './components/Product'
import Button from './components/Button'
import Switch from './components/Switch'
import * as THREE from "three"
import './App.css'
import { Provider } from './components/ui/provider';
import { Text} from "@chakra-ui/react"
import { Grid, GridItem } from "@chakra-ui/react"

import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


function LoadingScreen() {
  const { progress, active } = useProgress();
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    let minTime = new Promise((resolve) => setTimeout(resolve, 500));
    let assetsLoaded = new Promise((resolve) => {
      if (!active) resolve();
      else {
        const unsubscribe = useProgress.subscribe(({ active }) => {
          if (!active) {
            resolve();
            unsubscribe();
          }
        });
      }
    });

    Promise.all([minTime, assetsLoaded]).then(() => setShow(false));
  }, [active]);

  if (!show) return null;

  return (
    <Html center>
      <Loader/>
    </Html>
  );
}



function App() {
  const [displayToggled, setDisplayToggled] = React.useState(false);

  function toggleDisplay() {
    setDisplayToggled(!displayToggled)
  }

  const { height, width } = useWindowDimensions();

  
  return (
    <Provider>
      <div id='body' style={{cursor: "default"}}>
        <div id="canvas-container">
          <Canvas shadows camera={{ fov: 80}}
            
            style={{backgroundColor: "transparent"}}
          >
            <Suspense fallback={<LoadingScreen />}>
              <ambientLight intensity={1} />
              <group position={width > 1200 ? [0, 0, 0] : [2.5, 2, -1]} rotation={width > 1200 ? [0, 0, 0] : [0, -Math.PI/6, 0]}>
                <Switch position={[-2.25, 2.2, 1]} rotation={[0, Math.PI / 6, 0]} displayToggled={displayToggled} toggleDisplay={toggleDisplay}/>
                <Text3d font={"fonts/Poppins-Black.ttf"} color={"#FFA500"} position={[-2.25, 0.75, 1]} strokeColor={"black"} strokeWidth={0.002} rotation={[0, Math.PI / 6, 0]} lineHeight={1}>
                  LIGHT {"\n"}CARE
                </Text3d>
                <Button position={[-2.25, -0.75, 1]} rotation={[0, Math.PI / 6, 0]}/>
              </group>  
              <Product position={width > 1200 ? [1.5, -1.5, 1.5] : [0, -4, -1]} rotation={width > 1200 ? [0, Math.PI/4, -Math.PI/36] : [0, Math.PI/2, 0]} displayToggled={displayToggled}/>
              {width > 1200 ? <OrbitControls
                  enablePan={false}
                  enableZoom={false} 
                  mouseButtons={{
                    LEFT: THREE.MOUSE.ROTATE,  // left-click rotates
                    MIDDLE: null, // middle scroll zoom
                    RIGHT: null                 // right-click does nothing
                  }}
                /> : <></>}
              <ContactShadows resolution={512} position={[0, -2, 0]} opacity={width > 1200 ? 1 : 0} scale={10} blur={2} far={5} />
              <Environment preset="city" blur={1} /> 
            </Suspense>
          </Canvas>
        </div>

        <div className="content" style={{backgroundColor: "transparent", color: "#272727ff", width: "100vw"}}>
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 2fr" }}
            gap={6}
            w="90vw"
            px={{ base: 4, md: 16 }} // padding on sides
            py={{ base: 8, md: 16 }} // vertical spacing
            alignItems="start"
          >
            <GridItem >
              <Text fontWeight="bold" fontSize={{ base: "5xl", md: "6xl" }}>
                WHAT IS <br /> LIGHT CARE?
              </Text>
              <div style={{marginTop: "10px", marginBottom: "20px", backgroundColor: "#0059ffff", width: "90%", height: "10px"}}/>
            </GridItem>

            <GridItem>
              <Text fontSize={{ base: "md", md: "xl" }} lineHeight="taller">
                Light Care is more than just a mirror — it’s a smart wellness companion designed to help you understand your body and optimize your wellbeing. At its core, Light Care uses advanced computer vision and AI to monitor subtle signs of fatigue and stress. Fine-tuned object detection models analyze your facial features in real-time, detecting indicators such as eye strain, facial tension, and even changes in skin tone.
                <br /><br />
                Using these insights, Light Care can estimate physiological metrics like heart rate just by observing slight variations in your face. From there, it provides personalized guidance, whether that’s recommending a short break, a relaxation exercise, or lifestyle adjustments to improve sleep and energy levels.
                <br /><br />
                Our goal is to combine cutting-edge technology with practical wellness advice, giving you a seamless way to check in with your health every day. With Light Care, a simple glance in the mirror becomes an opportunity to better understand and care for yourself.
              </Text>
            </GridItem>
          </Grid>


        </div>

      </div>
    </Provider>
  )
}


export default App
