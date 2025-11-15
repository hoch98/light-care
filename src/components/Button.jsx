import React from "react";
import * as THREE from "three"
import { useFrame } from "@react-three/fiber";
import { RoundedBoxGeometry } from "@react-three/drei";
import { Text } from "@react-three/drei";
import { useNavigate } from "react-router";

function Button(props) {
  const navigate = useNavigate();

  const material = React.useMemo(
    () => new THREE.MeshPhysicalMaterial({
      color: "#FFA500",
      metalness: 0.2,
      roughness: 0.2,
      transmission: 0.1,
      reflectivity: 1,
      ior: 1.52,
      envMapIntensity: 1.2,
    }),
    []
  );

  const ref = React.useRef();
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const targetScale = React.useRef(new THREE.Vector3(1, 1, 1));

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // --- Hover pulse (base scale) ---
    const pulse = hovered ? 1 + Math.sin(t * 5) * 0.02 : 1;

    // --- Press logic ---
    if (pressed) {
      targetScale.current.set(pulse, pulse, pulse * 0.5);
      setTimeout(() => {
        navigate("/about")
      }, 250)
    } else {
      targetScale.current.set(pulse, pulse, pulse);
    }

    ref.current.scale.lerp(targetScale.current, 0.25);
  });

  return (
    <mesh
      ref={ref}
      material={material}
      rotation={props.rotation}
      position={props.position}

      onPointerEnter={() => {
        setHovered(true)
        document.body.style.cursor = "pointer"
      }}
      onPointerLeave={() => {
        setHovered(false);
        setPressed(false);
        document.body.style.cursor = "default"
      }}

      onPointerDown={() => { setPressed(true); }}
      onPointerUp={() => setPressed(false)}
    >
      <RoundedBoxGeometry
        args={[1.5, 0.5, 0.25]}
        radius={0.05}
        steps={1}
        smoothness={4}
        bevelSegments={4}
        creaseAngle={0.4}
      />
      <Text font={"fonts/Poppins-Black.ttf"} fontSize={0.2} position={[0, 0, 0.13]} color={"white"} lineHeight={1}>
        Learn More
      </Text>
    </mesh>
  );
}

export default Button