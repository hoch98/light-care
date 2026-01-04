import React, { Suspense, useState, useEffect } from 'react';
import * as THREE from "three";
import { Canvas } from '@react-three/fiber';
import { 
  useProgress, 
  Html, 
  Environment, 
  ContactShadows, 
  OrbitControls, 
  Preload, 
  Text, 
  useGLTF 
} from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

import useWindowDimensions from '../hooks/useWindowDimensions.jsx';
import Product from '../components/Product';
import Button from '../components/Button';
import Switch from '../components/Switch';
import { Loader } from "@/components/retroui/Loader";

function LoadingScreen() {
  const { active } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
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
    <Html center style={{ maxHeight: "100vh" }}>
      <Loader />
    </Html>
  );
}

function Starter() {
  const [displayToggled, setDisplayToggled] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  function toggleDisplay() {
    setDisplayToggled(!displayToggled);
  }

  const { width } = useWindowDimensions();
  const isMobile = width <= 1200;

  const { rotation: animatedRotation } = useSpring({
    rotation: isRotated ? [0, Math.PI * 1.5, 0] : [0, Math.PI / 2, 0],
    config: { mass: 1, tension: 170, friction: 26 }
  });

  // Cleanup to help with the memory spike when leaving the page
  useEffect(() => {
    return () => {
      useGLTF.clear("models/raspberry_pi/raspberry_pi_3.glb");
    };
  }, []);

  return (
    <div id="canvas-container" style={{ position: 'relative', width: '100%', height: '100vh' }}>
      
      {/* CLEAN OVERLAY: 
          Replaced the dark 0.4 opacity black with a light 0.15 glass effect.
          This prevents the "dirty" film over the 3D scene.
      */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.26)',
        backdropFilter: 'blur(1px)',
        pointerEvents: 'none',
        zIndex: -1,
      }} />

      <Canvas shadows camera={{ fov: 80 }} style={{ backgroundColor: "transparent" }}>
        <Suspense fallback={<LoadingScreen />}>
          {/* REFINED LIGHTING: 
              Increased intensity and added a neutral white balance to clean the shadows.
          */}
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
          <pointLight position={[-5, 5, -5]} intensity={0.5} color="#ffbe5c" />

          <group position={!isMobile ? [0, -0.3, 0] : [2.5, 2, -1]} rotation={!isMobile ? [0, 0, 0] : [0, -Math.PI / 6, 0]}>
            <Switch position={[-2.2, 2.4, 1.1]} rotation={[0, Math.PI / 6, 0]} displayToggled={displayToggled} toggleDisplay={toggleDisplay} />
            <Text 
              font={"fonts/Poppins-Black.ttf"} 
              color={"#FFB200"} 
              position={[-2.25, 1, 1]} 
              strokeColor={"black"} 
              strokeWidth={0.002} 
              rotation={[0, Math.PI / 6, 0]} 
              lineHeight={0.95}
            >
              LIGHT {"\n"}CARE
            </Text>
            <Text 
              font={"fonts/Poppins-Black.ttf"} 
              color={"#E0E0E0"} 
              strokeWidth={0.004} 
              position={[-2.25, -0.25, 1]} 
              rotation={[0, Math.PI / 6, 0]} 
              lineHeight={1} 
              fontSize={0.25}
            >
              A Brighter Wellness
            </Text>
            <Button position={[-2.25, -0.95, 1]} rotation={[0, Math.PI / 6, 0]} />
          </group>

          {isMobile ? (
            <animated.group position={[0, -4, -1]} rotation={animatedRotation}>
              <Product position={[0, 0, 0]} rotation={[0, 0, 0]} displayToggled={displayToggled} />
            </animated.group>
          ) : (
            <Product position={[1.5, -1.8, 1.5]} rotation={[0, Math.PI / 4, -Math.PI / 36]} displayToggled={displayToggled} />
          )}

          {!isMobile && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              mouseButtons={{ LEFT: THREE.MOUSE.ROTATE, MIDDLE: null, RIGHT: null }}
            />
          )}

          {/* LIGHTER SHADOWS: 
              Lowered opacity from 1 to 0.4 to prevent "dirty" black spots under the model.
          */}
          {!isMobile && (
            <ContactShadows resolution={512} position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={5} />
          )}

          {/* CLEAN ENVIRONMENT: 
              Using 'city' preset for neutral, crisp studio reflections.
          */}
          <Environment preset="city" />
          <Preload all />
        </Suspense>
      </Canvas>

      {isMobile && (
        <div style={{
          position: 'absolute', bottom: '8%', width: '100%',
          display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 10
        }}>
          <button
            onClick={() => setIsRotated(!isRotated)}
            style={{
              pointerEvents: 'auto',
              padding: '12px 28px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              color: '#333',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '30px',
              fontSize: '14px',
              fontWeight: 'bold',
              boxShadow: '0px 8px 20px rgba(0,0,0,0.1)',
              cursor: 'pointer',
            }}
          >
            FLIP VIEW
          </button>
        </div>
      )}
    </div>
  );
}

export default Starter;