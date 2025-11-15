import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CameraControls, useProgress, Html, Environment, Text, ContactShadows } from '@react-three/drei'
import { Loader } from "@/components/retroui/Loader";
import * as React from 'react'
import Product from './components/Product'
import Button from './components/Button'
import Switch from './components/Switch'
import './App.css'

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
    <Html center>
      <Loader/>
    </Html>
  );
}


function App() {
  const [displayToggled, setDisplayToggled] = React.useState(false);

  function toggleDisplay() {
    setDisplayToggled(!displayToggled)
  }
  return (
    <div id='body' style={{cursor: "default"}}>
      <div id="canvas-container">
        <Canvas shadows camera={{ fov: 75}}>
          <Suspense fallback={<LoadingScreen />}>
            <ambientLight intensity={1} />
            <Switch position={[-2.25, 1.7, 1]} rotation={[0, Math.PI / 6, 0]} displayToggled={displayToggled} toggleDisplay={toggleDisplay}/>
            <Text font={"fonts/Poppins-Black.ttf"} color={"#FFA500"} position={[-2.25, 0.25, 1]} strokeColor={"black"} strokeWidth={0.002} rotation={[0, Math.PI / 6, 0]} lineHeight={1}>
              LIGHT {"\n"}CARE
            </Text>
            <Button position={[-2.25, -1.25, 1]} rotation={[0, Math.PI / 6, 0]}/>
            <Product position={[1.5, -2, 1.5]} displayToggled={displayToggled}/>
            <CameraControls />
            <ContactShadows resolution={512} position={[0.25, -3, 0]} opacity={1} scale={10} blur={2} far={8} />
            <Environment preset="city" background blur={1} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}


export default App
