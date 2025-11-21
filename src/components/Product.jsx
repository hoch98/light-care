import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useGLTF } from '@react-three/drei'
import * as THREE from "three"
import * as React from 'react'

function Frame(props) {
  const colorMap = useLoader(TextureLoader, 'media/frame_veneer/plywood_diff_1k.jpg')
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
  var { scene } = useGLTF("models/frame.glb");
  let meshMaterial = new THREE.MeshStandardMaterial({
    map: colorMap,       // single color texture
    metalness: 0.0,         // wood is not metallic
    roughness: 0.5,         // adjust for shininess
    envMapIntensity: 0.8,   // mild reflection if using HDRI
  });

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = meshMaterial;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <mesh receiveShadow>
      <primitive receiveShadow object={scene} rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
    </mesh>
  )
}

function BottomHolder(props) {
  const colorMap = useLoader(TextureLoader, 'media/holder_veneer/wood_table_001_diff_1k.jpg')
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
  const {scene} = useGLTF("models/bottom_holder.glb");
  let meshMaterial = new THREE.MeshStandardMaterial({
    map: colorMap,       // single color texture
    metalness: 0.0,         // wood is not metallic
    roughness: 0.5,         // adjust for shininess
    envMapIntensity: 0.8,   // mild reflection if using HDRI
  });

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = meshMaterial
      child.castShadow = true
      child.receiveShadow = true
    }
  })
  return (
    <mesh receiveShadow>
      <primitive receiveShadow object={scene} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0.1425, 0.05, 0]} />
    </mesh>
  )
}

function SideHolder({ position }) {
  const colorMap = useLoader(TextureLoader, 'media/holder_veneer/wood_table_001_diff_1k.jpg')
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
  const {scene} = useGLTF("models/side_holder.glb");
  let meshMaterial = new THREE.MeshStandardMaterial({
    map: colorMap,       // single color texture
    metalness: 0.0,         // wood is not metallic
    roughness: 0.5,         // adjust for shininess
    envMapIntensity: 0.8,   // mild reflection if using HDRI
  });

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = meshMaterial
      child.castShadow = true
      child.receiveShadow = true
    }
  })
  return (
    <mesh receiveShadow position={position}>
      <primitive receiveShadow object={scene} rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
    </mesh>
  )
}

function TwoWayMirror(props) {
  let meshMaterial = new THREE.MeshStandardMaterial({
    color: 0x999999,     // dark gray
    metalness: 0.7,      // very reflective
    roughness: 0.01,     // almost perfectly smooth
    transmission: 0.9,   // mostly reflecting, partially see-through
    reflectivity: 0.3,
    ior: 1.52,
    opacity: 0.8,
    transparent: true,
    envMapIntensity: 1.2,
  });

  return (
    <mesh receiveShadow material={meshMaterial} rotation={[0, Math.PI / 2, 0]} position={[0.025, 0.95, 0]}>
      <boxGeometry args={[0.9, 1.6, 0.0125]} />
    </mesh>
  )
}

function Monitor(props) {
  let meshMaterial = new THREE.MeshStandardMaterial({
    color: 0xAAAAAA,
    transparent: false,   // keep opaque
    opacity: 1,
    roughness: 0.8,
    metalness: 0,
    transmission: 0,      // no transmission, fully solid
  });

  let materialsArray;

  try {
    const image = useLoader(TextureLoader, 'media/default.png')

    const screenMaterial = new THREE.MeshBasicMaterial({
      map: image
    });

    materialsArray = [
      meshMaterial,
      meshMaterial,
      meshMaterial,
      meshMaterial,
      meshMaterial,   // Front
      screenMaterial  // Back
    ];
  } catch {
    materialsArray = [
      meshMaterial,
      meshMaterial,
      meshMaterial,
      meshMaterial,
      meshMaterial,   // Front
      meshMaterial  // Back
    ];
  }


  return (
    <mesh receiveShadow material={props.displayToggled ? materialsArray : meshMaterial} rotation={[0, Math.PI / 2, 0]} position={[0.041, 0.95, 0]}>
      <boxGeometry args={[0.9, 1.6, 0.0125]} />
    </mesh>
  )
}

function RaspberryPi(props) {
  var { nodes, materials, scene } = useGLTF("models/raspberry_pi/raspberry_pi_3.glb");
  var scaleFactor = 0.045
  return <mesh receiveShadow scale={scaleFactor} rotation={[Math.PI, 0, -Math.PI / 2]} position={[0.054, 1.53, 0.25]}>
    <primitive object={scene} />
  </mesh>;
}

function PiCamera(props) {
  var { nodes, materials, scene } = useGLTF("models/camera/camera.glb");
  var scaleFactor = 0.022
  return <mesh receiveShadow scale={scaleFactor} rotation={[Math.PI, -Math.PI / 2, 0]} position={[0.04, 1.8625, 0]}>
    <primitive object={scene} />
  </mesh>;
}

function Product(props) {

  const ref = React.useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (ref.current) {
      // Base rotation (fixed)
      const baseX = props.rotation[0]
      const baseY = props.rotation[1]
      const baseZ = props.rotation[2]

      // Gentle bobbing
      ref.current.position.y = Math.sin(t * 1.5) * 0.03 + props.position[1]

      // Gentle rocking around base rotation
      ref.current.rotation.x = baseX + Math.sin(t * 1.2) * 0.01
      ref.current.rotation.y = baseY + Math.sin(t * 0.8) * 0.015
      ref.current.rotation.z = baseZ + Math.sin(t * 1.1) * 0.01
    }
  })


  return (
    <group position={props.position} scale={2} ref={ref}>
      <TwoWayMirror />
      <Monitor displayToggled={props.displayToggled} />
      <Frame />
      <BottomHolder />
      <SideHolder position={[0.099, 0.9, 0]} />
      <RaspberryPi />
      <PiCamera />

    </group>
  )
}

export default Product