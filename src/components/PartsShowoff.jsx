import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as React from 'react'
import { useState } from 'react'
import { useFrame } from '@react-three/fiber'
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

function PartsShowoff({ width }) {
  const [selectedPart, setSelectedPart] = useState("Raspberry Pi");
  const canvasHeight = width > 1200 ? '40vh' : '30vh';

  return (
    <Canvas style={{ height: canvasHeight }} camera={{ rotation: [-Math.PI / 4, 0, 0] }}>
      <ambientLight intensity={1} />
      <RaspberryPi />
      <Environment preset="city" blur={1} />
    </Canvas>
  );
}


export default PartsShowoff