import React, { useMemo, useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// --- HELPER: DISPOSAL FUNCTION ---
const disposeNode = (node) => {
  if (node.geometry) node.geometry.dispose();
  if (node.material) {
    if (Array.isArray(node.material)) {
      node.material.forEach(mat => mat.dispose());
    } else {
      node.material.dispose();
    }
  }
};

function Body(props) {
  const { scene } = useGLTF("models/switch/body.glb");
  
  // Memoize material so it's not recreated on every render
  const bodyMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#727272",
    metalness: 0.2,
    roughness: 0.2,
    envMapIntensity: 1.2,
  }), []);

  // Use useMemo for the cloned scene to prevent re-traversing every render
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.material = bodyMaterial;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene, bodyMaterial]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clonedScene.traverse(disposeNode);
      bodyMaterial.dispose();
    };
  }, [clonedScene, bodyMaterial]);

  return (
    <mesh receiveShadow position={props.position} rotation={[-Math.PI / 2, 0, 0]}>
      <primitive object={clonedScene} />
    </mesh>
  );
}

function Knob(props) {
  const ref = useRef();
  const { scene } = useGLTF("models/switch/knob.glb");

  const knobMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#ffffff",
    metalness: 0.2,
    roughness: 0.2,
    envMapIntensity: 1.2,
  }), []);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.material = knobMaterial;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene, knobMaterial]);

  useFrame(() => {
    if (ref.current) {
      // Lerp position based on toggle state
      const targetX = props.toggled ? 2.99 : 0;
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, 0.2);
    }
  });

  useEffect(() => {
    return () => {
      clonedScene.traverse(disposeNode);
      knobMaterial.dispose();
    };
  }, [clonedScene, knobMaterial]);

  return (
    <mesh
      ref={ref}
      receiveShadow
      position={props.position}
      rotation={[-Math.PI / 2, 0, 0]}
      onClick={props.toggleDisplay}
      onPointerEnter={() => { document.body.style.cursor = "pointer" }}
      onPointerLeave={() => { document.body.style.cursor = "default" }}
    >
      <primitive object={clonedScene} />
    </mesh>
  );
}

const Switch = React.memo(function Switch(props) {
  return (
    <group
      rotation={props.rotation}
      position={props.position}
      scale={0.2}
    >
      <Body />
      <Knob toggled={props.displayToggled} toggleDisplay={props.toggleDisplay} />
    </group>
  );
});

export default Switch;

useGLTF.preload("models/switch/body.glb");
useGLTF.preload("models/switch/knob.glb");