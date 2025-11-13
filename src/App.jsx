import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CameraControls, useProgress, Html, Environment, Text, ContactShadows } from '@react-three/drei'
import * as React from 'react'
import Product from './Product'
import './App.css'

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>
    <h1 style={{ fontFamily: "sans-serif" }}>{progress} % loaded</h1>
  </Html>;
}

function App() {
  const [displayToggled, setDisplayToggled] = React.useState(false);
  return (
    <body>
      <button className='toggle-button' onClick={() => {setDisplayToggled(!displayToggled)}}>Toggle display</button>
      <div id="canvas-container">
        <Canvas shadows camera={{ fov: 75 }}>
          <Suspense fallback={<Loader />}>
            <ambientLight intensity={1} />
            <Text font={"fonts/Poppins-Black.ttf"} color={"#FFA500"} position={[-2.5, 0, 1]} strokeColor={"black"} strokeWidth={0.002} rotation={[0, Math.PI / 6, 0]}>
              LIGHT {"\n"}CARE
            </Text>
            <Product displayToggled={displayToggled}/>
            <CameraControls />
            <ContactShadows resolution={512} position={[0, -2.5, 0]} opacity={1} scale={10} blur={2} far={8} />
            <Environment preset="city" background blur={1} />
          </Suspense>
        </Canvas>
      </div>
    </body>
  )
}


export default App
