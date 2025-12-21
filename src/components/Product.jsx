import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useGLTF } from '@react-three/drei'
import * as THREE from "three"
import * as React from 'react'

function Frame(props) {
  var { scene } = useGLTF("models/frame.glb");

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = props.meshMaterial;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <mesh receiveShadow>
      <primitive receiveShadow object={scene} position={[0.138, 1, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
    </mesh>
  )
}

function BottomHolder(props) {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0.11, 0.1, 0.005]} material={props.meshMaterial}>
      <boxGeometry args={[0.96, 0.2, 0.08]} />
    </mesh>
  )
}

function Stabler(props) {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0.12, 0.18, 0.005]} material={props.meshMaterial}>
      <boxGeometry args={[0.2, 0.1, 0.08]} />
    </mesh>
  )
}

function SideHolder(props) {
  
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={props.position} material={props.meshMaterial}>
      <boxGeometry args={[0.045, 0.2, 1.54]} />
    </mesh>
  )
}

function Seperator(props) {
  var { scene } = useGLTF("models/seperator.glb");

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = props.meshMaterial;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  var s = 0.5;
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, -Math.PI/2, Math.PI / 2]} position={[0.11, 1.7, 0.005]} scale={[s, s, s]}>
      <primitive receiveShadow object={scene} />
    </mesh>
  )
}

function Electronics(props) {
  let meshMaterial = new THREE.MeshStandardMaterial({
    color: 0xbfbfbf,
    transparent: false,   // keep opaque
    opacity: 1,
    roughness: 0.4,
    metalness: 1,
  });

  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0.08, 1, -0.15]} material={meshMaterial}>
      <boxGeometry args={[0.35, 0.06, 0.8]} />
    </mesh>
  )
}

function TwoWayMirror(props) {
  let meshMaterial = new THREE.MeshStandardMaterial({
    color: 0x999999,     // dark gray
    metalness: 0.7,      // very reflective
    roughness: 0.01,     // almost perfectly smooth
    opacity: 0.8,
    transparent: true,
    envMapIntensity: 1.2,
  });

  return (
    <mesh receiveShadow material={meshMaterial} rotation={[0, Math.PI / 2, 0]} position={[0.0, 0.87, 0]}>
      <boxGeometry args={[0.95, 1.62, 0.0125]} />
    </mesh>
  )
}

function Monitor(props) {
  let meshMaterial = new THREE.MeshStandardMaterial({
    color: 0x222222,
    transparent: false,   // keep opaque
    opacity: 1,
    roughness: 0.8,
    metalness: 0,
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
    <mesh receiveShadow material={props.displayToggled ? materialsArray : meshMaterial} rotation={[0, Math.PI / 2, 0]} position={[0.0385, 0.91, 0.01]}>
      <boxGeometry args={[0.85, 1.53, 0.06]} />
    </mesh>
  )
}

function RaspberryPi(props) {
  var { nodes, materials, scene } = useGLTF("models/raspberry_pi/raspberry_pi_3.glb");
  var scaleFactor = 0.045
  return <mesh receiveShadow scale={scaleFactor} rotation={[Math.PI, 0, -Math.PI / 2]} position={[0.072, 1.3, 0.25]}>
    <primitive object={scene} />
  </mesh>;
}

function PiCamera(props) {
  var { nodes, materials, scene } = useGLTF("models/camera/camera.glb");
  var scaleFactor = 0.022
  return <mesh receiveShadow scale={scaleFactor} rotation={[0, -Math.PI / 2, 0]} position={[0.06, 1.84, 0]}>
    <primitive object={scene} />
  </mesh>;
}

const Product = React.memo(function Product(props) {

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

  var colorMap = useLoader(TextureLoader, 'media/frame_veneer/plywood_diff_1k.jpg')
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
  colorMap.repeat.set(8, 8);
  
  let meshMaterial = new THREE.MeshStandardMaterial({
    map: colorMap,       // single color texture
    metalness: 0.0,         // wood is not metallic
    roughness: 0.5,         // adjust for shininess
    envMapIntensity: 0.8,   // mild reflection if using HDRI
  });

  return (
    <group position={props.position} scale={2} ref={ref}>
      <TwoWayMirror meshMaterial={meshMaterial} />
      <Monitor displayToggled={props.displayToggled}/>
      <Frame meshMaterial={meshMaterial} />
      <BottomHolder meshMaterial={meshMaterial}/>
      <Stabler meshMaterial={meshMaterial}/>
      <SideHolder position={[0.11, 0.908, 0.46]}  meshMaterial={meshMaterial}/>
      <SideHolder position={[0.11, 0.908, -0.444]} meshMaterial={meshMaterial}/>
      <Seperator meshMaterial={meshMaterial}/>
      <Electronics/>
      <RaspberryPi />
      <PiCamera />

    </group>
  )
})


export default Product