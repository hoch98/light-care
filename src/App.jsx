import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CameraControls, useProgress, Html, Environment, Text, ContactShadows } from '@react-three/drei'
import * as React from 'react'
import Product from './components/Product'
import Button from './components/Button'
import './App.css'

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>
    <h1 style={{ fontFamily: "sans-serif" }}>{Math.round(progress)} % loaded</h1>
  </Html>;
}

function App() {
  const [displayToggled, setDisplayToggled] = React.useState(false);
  return (
    <body style={{cursor: "default"}}>
      <button className='toggle-button' onClick={() => {setDisplayToggled(!displayToggled)}}>Toggle display</button>
      <div id="canvas-container">
        <Canvas shadows camera={{ fov: 75}}>
          <Suspense fallback={<Loader />}>
            <ambientLight intensity={1} />
            <Text font={"fonts/Poppins-Black.ttf"} color={"#FFA500"} position={[-2.25, 0.25, 1]} strokeColor={"black"} strokeWidth={0.002} rotation={[0, Math.PI / 6, 0]} lineHeight={1}>
              LIGHT {"\n"}CARE
            </Text>
            <Button/>
            <Product displayToggled={displayToggled}/>
            <CameraControls />
            <ContactShadows resolution={512} position={[0.25, -3, 0]} opacity={1} scale={10} blur={2} far={8} />
            <Environment preset="city" background blur={1} />
          </Suspense>
        </Canvas>
      </div>
    </body>
  )
}


export default App
