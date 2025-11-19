import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { useProgress, Html, Environment, Text as Text3d, ContactShadows, OrbitControls } from '@react-three/drei'
import * as React from 'react'
import * as THREE from "three"
import { Text } from "@chakra-ui/react"
import { Grid, GridItem } from "@chakra-ui/react"
import { useState, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { TextureLoader } from 'three'
import { Box } from '@chakra-ui/react'
import { useGLTF } from '@react-three/drei'

function RaspberryPi(props) {
  var { nodes, materials, scene } = useGLTF("models/raspberry_pi/raspberry_pi_3.glb");
  const ref = React.useRef();
  scene = scene.clone()
  var scaleFactor = 0.4

  useFrame(() => {
    ref.current.rotation.y += 0.005
  })
  return <mesh ref={ref} receiveShadow scale={scaleFactor} rotation={[Math.PI, 0, -Math.PI]} position={[0, -2, 2.2]}>
      <primitive object={scene} />
    </mesh>;
}

function PartsShowoff(props) {
  var width = props.width
  const [selectedPart, setSelectedPart] = React.useState("Raspberry Pi");
  return (
    <Grid
      templateColumns={width > 1200 ? "1fr 2fr" : "1fr"}
      gap={"5%"}
      w="90vw"
      alignItems="start"
    >
      <GridItem className="parts-showoff" h={width > 1200 ? "40vh" : "50vh"}>
        <Box w="100%" h="100%" p={0}>
          <Canvas style={{ width: "100%", height: "100%", paddingLeft: (width > 1200 ? "5%" : "")}} camera={{rotation: [-Math.PI/4, 0, 0]}}>
            <ambientLight intensity={1} />
            <RaspberryPi />
            <Environment preset="city" blur={1} />
          </Canvas>
        </Box>
      </GridItem>

      <GridItem pl={"5%"} pr={"5%"}>
        <Text fontSize={{ base: "2xl", md: "3xl" }}>
          {selectedPart}
        </Text>
        <Text fontSize={{ base: "1xl", md: "1.5xl" }}>
          {"A Raspberry Pi is a credit-card-sized, low-cost computer designed to promote computer science education, but it's now used for a wide range of projects from simple computing to complex robotics. It runs an operating system like Raspberry Pi OS (a version of Linux) on an ARM processor, has components similar to a PC, and connects to external devices like monitors, keyboards, and mice. Its GPIO pins make it ideal for physical computing and the Internet of Things (IoT). "}
        </Text>
      </GridItem>
    </Grid>
  )
}


export default PartsShowoff