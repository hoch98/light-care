import useWindowDimensions from '../hooks/useWindowDimensions.jsx';
import Product from '../components/Product';
import Button from '../components/Button';
import Switch from '../components/Switch';
import * as THREE from "three";
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useProgress, Html, Environment, Text3D, ContactShadows, OrbitControls, Preload, Text } from '@react-three/drei';
import { Loader } from "@/components/retroui/Loader";
import { useSpring, animated } from '@react-spring/three';

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
    <Html center style={{ maxHeight: "100vh" }}>
      <Loader />
    </Html>
  );
}

function Starter() {
  const [displayToggled, setDisplayToggled] = React.useState(false);
  const [isRotated, setIsRotated] = React.useState(false);

  function toggleDisplay() {
    setDisplayToggled(!displayToggled)
  }

  const { height, width } = useWindowDimensions();
  const isMobile = width <= 1200;

  const { rotation: animatedRotation } = useSpring({
    rotation: isRotated ? [0, Math.PI * 1.5, 0] : [0, Math.PI / 2, 0],
    config: { mass: 1, tension: 170, friction: 26 }
  });

  return (
    <div id="canvas-container" style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Canvas shadows camera={{ fov: 80 }} style={{ backgroundColor: "transparent" }}>
        <Suspense fallback={<LoadingScreen />}>
          <ambientLight intensity={1} />
          <group position={!isMobile ? [0, -0.3, 0] : [2.5, 2, -1]} rotation={!isMobile ? [0, 0, 0] : [0, -Math.PI / 6, 0]}>
            <Switch position={[-2.2, 2.4, 1.1]} rotation={[0, Math.PI / 6, 0]} displayToggled={displayToggled} toggleDisplay={toggleDisplay} />
            <Text font={"fonts/Poppins-Black.ttf"} color={"#FFA500"} position={[-2.25, 1, 1]} strokeColor={"black"} strokeWidth={0.002} rotation={[0, Math.PI / 6, 0]} lineHeight={0.95}>
              LIGHT {"\n"}CARE
            </Text>
            <Text font={"fonts/Poppins-Black.ttf"} color={"#7FA99B"} strokeWidth={0.004} position={[-2.25, -0.25, 1]} rotation={[0, Math.PI / 6, 0]} lineHeight={1} fontSize={0.25}>
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

          {!isMobile && (
            <ContactShadows resolution={512} position={[0, -2, 0]} opacity={1} scale={10} blur={2} far={5} />
          )}

          <Environment files="media/modern_evening_street_1k.exr" blur={0} />
          <Preload all />
        </Suspense>
      </Canvas>

      {isMobile && (
        <div style={{
          position: 'absolute', bottom: '0', width: '100%',
          display: 'flex', justifyContent: 'center', pointerEvents: 'none'
        }}>
          <button
            onClick={() => setIsRotated(!isRotated)}
            style={{
              pointerEvents: 'auto',
              padding: '12px 24px',
              backgroundColor: '#FFA500',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
              cursor: 'pointer',
              transition: 'transform 0.1s ease',
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Flip
          </button>
        </div>
      )}
    </div>
  )
}

export default Starter;