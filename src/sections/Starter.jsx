import useWindowDimensions from '../hooks/useWindowDimensions.jsx';
import Product from '../components/Product';
import Button from '../components/Button';
import Switch from '../components/Switch';
import * as THREE from "three";
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useProgress, Html, Environment, Text as Text3d, ContactShadows, OrbitControls } from '@react-three/drei';
import { Loader } from "@/components/retroui/Loader";

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
    <Html center style={{maxHeight: "100vh"}}>
      <Loader />
    </Html>
  );
}


function Starter() {
  const [displayToggled, setDisplayToggled] = React.useState(false);
  
  function toggleDisplay() {
    setDisplayToggled(!displayToggled)
  }

  const { height, width } = useWindowDimensions();
  
  return (
    <div id="canvas-container">
      <Canvas shadows camera={{ fov: 80 }}

        style={{ backgroundColor: "transparent" }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <ambientLight intensity={1} />
          <group position={width > 1200 ? [0, -0.3, 0] : [2.5, 2, -1]} rotation={width > 1200 ? [0, 0, 0] : [0, -Math.PI / 6, 0]}>
            <Switch position={[-2.25, 2.2, 1]} rotation={[0, Math.PI / 6, 0]} displayToggled={displayToggled} toggleDisplay={toggleDisplay} />
            <Text3d font={"fonts/Poppins-Black.ttf"} color={"#FFA500"} position={[-2.25, 0.75, 1]} strokeColor={"black"} strokeWidth={0.002} rotation={[0, Math.PI / 6, 0]} lineHeight={1}>
              LIGHT {"\n"}CARE
            </Text3d>
            <Button position={[-2.25, -0.75, 1]} rotation={[0, Math.PI / 6, 0]} />
          </group>
          <Product position={width > 1200 ? [1.5, -1.8, 1.5] : [0, -4, -1]} rotation={width > 1200 ? [0, Math.PI / 4, -Math.PI / 36] : [0, Math.PI / 2, 0]} displayToggled={displayToggled} />
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
  )
}

export default Starter