import React from "react";
import * as THREE from "three"
import { useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { Text } from "@react-three/drei";

function Body(props) {
  const obj = useLoader(OBJLoader, "/models/switch/body.obj").clone()

  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: "rgba(114, 114, 114, 1)1)",
    metalness: 0.2,
    roughness: 0.2,
    transmission: 0.1,
    reflectivity: 1,
    ior: 1.52,
    envMapIntensity: 1.2,
  })

  obj.traverse((child) => {
    if (child.isMesh) {
      child.material = bodyMaterial
      child.castShadow = true
      child.receiveShadow = true
    }
  })
  return (
    <mesh receiveShadow position={props.position} rotation={[-Math.PI/2, 0, 0]}>
      <primitive receiveShadow object={obj} />
    </mesh>
  )
}

function Knob(props) {
  const ref = React.useRef();
  const obj = useLoader(OBJLoader, "/models/switch/knob.obj").clone()

  useFrame(() => {
    if (ref.current) {
      const target = props.toggled ? new THREE.Vector3(2.99, 0, 0) : new THREE.Vector3(0, 0, 0);
      ref.current.position.lerp(target, 0.2);
    }
  })

  const knobMaterial = new THREE.MeshPhysicalMaterial({
    color: "rgba(255, 255, 255, 1)1)",
    metalness: 0.2,
    roughness: 0.2,
    transmission: 0.1,
    reflectivity: 1,
    ior: 1.52,
    envMapIntensity: 1.2,
  })

  obj.traverse((child) => {
    if (child.isMesh) {
      child.material = knobMaterial
      child.castShadow = true
      child.receiveShadow = true
      child.onClick = () => {}
    }
  })
  return (
    <mesh 
      ref={ref} 
      receiveShadow 
      position={props.position} 
      rotation={[-Math.PI/2, 0, 0]} 
      onClick={props.toggleDisplay}
      onPointerEnter={() => {document.body.style.cursor="pointer"}}
      onPointerLeave={() => {document.body.style.cursor="default"}}
    >
      <primitive receiveShadow object={obj} />
    </mesh>
  )
}



function Switch(props) {

  const [toggled, toggleDisplay] = [props.displayToggled, props.toggleDisplay]

  return (
    <mesh
      rotation={props.rotation}
      position={props.position}
      scale={0.21}
    >
      <Body/>
      <Knob toggled={toggled} toggleDisplay={toggleDisplay}/>
    </mesh>
  );
}

export default Switch