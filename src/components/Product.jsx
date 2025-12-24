import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import * as React from 'react'
import { Html } from '@react-three/drei'

const geoBottom = new THREE.BoxGeometry(0.96, 0.2, 0.08)
const geoStabler = new THREE.BoxGeometry(0.2, 0.1, 0.08)
const geoSide = new THREE.BoxGeometry(0.045, 0.2, 1.54)
const geoElectronics = new THREE.BoxGeometry(0.35, 0.06, 0.8)
const geoMirror = new THREE.BoxGeometry(0.95, 1.62, 0.0125)
const geoMonitor = new THREE.BoxGeometry(0.85, 1.53, 0.06)

const DESCRIPTIONS = {
  mirror: ["Two-Way Mirror", "Optimized for 70% reflection and 30% light transmission."],
  monitor: ["Monitor", "High-brightness panel for visibility through mirror glass."],
  pi: ["Raspberry Pi 4", "The brain of the system, processing real-time sensor data."],
  camera: ["Pi Camera", "Optical sensor for computer vision input."],
};

const electronicsMaterial = new THREE.MeshStandardMaterial({
  color: 0xbfbfbf,
  roughness: 0.4,
  metalness: 1,
})

const mirrorMaterial = new THREE.MeshStandardMaterial({
  color: 0x999999,
  metalness: 0.7,
  roughness: 0.01,
  transparent: true,
  opacity: 0.8,
  envMapIntensity: 1.2,
})

const monitorBodyMaterial = new THREE.MeshStandardMaterial({
  color: 0x222222,
  roughness: 0.8,
  metalness: 0,
})

function Frame({ material }) {
  const { scene } = useGLTF('models/frame.glb')

  const cloned = React.useMemo(() => {
    const c = scene.clone(true)
    c.traverse(o => {
      if (o.isMesh) {
        o.material = material
        o.castShadow = o.receiveShadow = true
      }
    })
    return c
  }, [scene, material])

  return (
    <primitive
      object={cloned}
      position={[0.138, 1, 0]}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
    />
  )
}

function Seperator({ material }) {
  const { scene } = useGLTF('models/seperator.glb')

  const cloned = React.useMemo(() => {
    const c = scene.clone(true)
    c.traverse(o => {
      if (o.isMesh) {
        o.material = material
        o.castShadow = o.receiveShadow = true
      }
    })
    return c
  }, [scene, material])

  return (
    <primitive
      object={cloned}
      position={[0.11, 1.7, 0.005]}
      rotation={[-Math.PI / 2, -Math.PI / 2, Math.PI / 2]}
      scale={0.5}
    />
  )
}

function BottomHolder({ material }) {
  return (
    <mesh
      geometry={geoBottom}
      material={material}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      position={[0.11, 0.1, 0.005]}
      receiveShadow
    />
  )
}

function Stabler({ material }) {
  return (
    <mesh
      geometry={geoStabler}
      material={material}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      position={[0.12, 0.18, 0.005]}
      receiveShadow
    />
  )
}

function SideHolder({ material, position }) {

  return (
    <mesh
      geometry={geoSide}
      material={material}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      position={position}
      receiveShadow
    >
    </mesh>
  )
}

function Electronics() {
  return (
    <mesh
      geometry={geoElectronics}
      material={electronicsMaterial}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      position={[0.08, 1, -0.15]}
      receiveShadow
    />
  )
}

function TwoWayMirror(props) {
  return (
    <mesh
      geometry={geoMirror}
      material={mirrorMaterial}
      rotation={[0, Math.PI / 2, 0]}
      position={[0.0, 0.87, 0]}
      receiveShadow
      onPointerOver={(e) => (e.stopPropagation(), props.setHovered("mirror"))}
      onPointerOut={() => props.setHovered("")}
    >
      <meshStandardMaterial
        attach="material"
        {...mirrorMaterial}
        emissive={props.hovered == "mirror" ? "#ffbe5c" : "#000000"}
        emissiveIntensity={props.hovered == "mirror" ? 0.2 : 0}
      />
    </mesh>
  )
}

function Monitor(props) {
  const screenTexture = useLoader(TextureLoader, 'media/default.png')
  const meshRef = React.useRef()

  // 1. Create the base materials
  const materials = React.useMemo(() => {
    const screen = new THREE.MeshBasicMaterial({ map: screenTexture })
    return [
      monitorBodyMaterial, // Right
      monitorBodyMaterial, // Left
      monitorBodyMaterial, // Top
      monitorBodyMaterial, // Bottom
      monitorBodyMaterial, // Front
      screen,              // Back (the screen face)
    ]
  }, [screenTexture])

  // 2. Apply highlight via emissive property directly to the materials
  React.useLayoutEffect(() => {
    if (!meshRef.current) return

    // If material is an array (which it is here), we loop through it
    const activeMaterials = Array.isArray(meshRef.current.material)
      ? meshRef.current.material
      : [meshRef.current.material]

    activeMaterials.forEach((mat) => {
      // Only set emissive if the material supports it (MeshStandardMaterial)
      // Note: MeshBasicMaterial (the screen) doesn't support emissive, 
      // so it will naturally stay bright/unchanged which usually looks better.
      if (mat.type === 'MeshStandardMaterial') {
        mat.emissive.set(props.hovered === "monitor" ? "#ffbe5c" : "#000000")
        mat.emissiveIntensity = props.hovered === "monitor" ? 0.2 : 0
      }
    })
  }, [props.hovered, props.displayToggled]) // Re-run when hovered OR toggled

  return (
    <mesh
      ref={meshRef}
      geometry={geoMonitor}
      // Use the logic: if toggled, use screen array, otherwise use body material
      material={props.displayToggled ? materials : monitorBodyMaterial}
      rotation={[0, Math.PI / 2, 0]}
      position={[0.0385, 0.91, 0.01]}
      receiveShadow
      onPointerOver={(e) => (e.stopPropagation(), props.setHovered("monitor"))}
      onPointerOut={() => props.setHovered("")}
    />
  )
}

function RaspberryPi(props) {
  const { scene } = useGLTF('models/raspberry_pi/raspberry_pi_3.glb')
  const cloned = React.useMemo(() => scene.clone(true), [scene])

  React.useLayoutEffect(() => {
    cloned.traverse((obj) => {
      if (obj.isMesh) {
        // We ensure the material can handle emissive properties
        obj.material.emissive = new THREE.Color(props.hovered == "pi" ? "#ffbe5c" : "#000000")
        obj.material.emissiveIntensity = props.hovered == "pi" ? 0.2 : 0
      }
    })
  }, [props.hovered, cloned])

  return (
    <primitive
      object={cloned}
      scale={0.045}
      rotation={[Math.PI, 0, -Math.PI / 2]}
      position={[0.072, 1.3, 0.25]}
      onPointerOver={(e) => (e.stopPropagation(), props.setHovered("pi"))}
      onPointerOut={() => props.setHovered("")}
    >
    </primitive>
  )
}

function PiCamera(props) {
  const { scene } = useGLTF('models/camera/camera.glb')
  const cloned = React.useMemo(() => scene.clone(true), [scene])

  React.useLayoutEffect(() => {
    cloned.traverse((obj) => {
      if (obj.isMesh) {
        // We ensure the material can handle emissive properties
        obj.material.emissive = new THREE.Color(props.hovered == "camera" ? "#ffbe5c" : "#000000")
        obj.material.emissiveIntensity = props.hovered == "camera" ? 0.2 : 0
      }
    })
  }, [props.hovered, cloned])

  return (
    <primitive
      object={cloned}
      scale={0.022}
      rotation={[0, -Math.PI / 2, 0]}
      position={[0.06, 1.84, 0]}
      onPointerOver={(e) => (e.stopPropagation(), props.setHovered("camera"))}
      onPointerOut={() => props.setHovered("")}
    />
  )
}


const Product = React.memo(function Product(props) {
  const ref = React.useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (!ref.current) return

    ref.current.position.y = Math.sin(t * 1.5) * 0.03 + props.position[1]

    ref.current.rotation.x = props.rotation[0] + Math.sin(t * 1.2) * 0.01
    ref.current.rotation.y = props.rotation[1] + Math.sin(t * 0.8) * 0.015
    ref.current.rotation.z = props.rotation[2] + Math.sin(t * 1.1) * 0.01
  })

  const woodTexture = useLoader(
    TextureLoader,
    'media/frame_veneer/plywood_diff_1k.jpg'
  )

  const woodMaterial = React.useMemo(() => {
    woodTexture.colorSpace = THREE.SRGBColorSpace
    woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping
    woodTexture.repeat.set(8, 8)

    return new THREE.MeshStandardMaterial({
      map: woodTexture,
      roughness: 0.5,
      metalness: 0,
    })
  }, [woodTexture])

  const [hovered, setHovered] = React.useState("");

  return (
    <group ref={ref} position={props.position} scale={2}>
      {hovered && (
        <Html
          distanceFactor={10}
          position={[0.5, 1.2, 0]}
          style={{
            pointerEvents: 'none',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap'
          }}
        >
          <div style={{
            background: 'white',
            color: 'black',
            padding: '10px 15px',
            borderRadius: '8px',
            border: '1px solid #ffbe5c',
            fontFamily: 'sans-serif',
            boxShadow: '0px 4px 15px rgba(0,0,0,0.5)'
          }}>
            <strong style={{ color: '#ffbe5c', display: 'block', marginBottom: '4px' }}>
              {DESCRIPTIONS[hovered][0]}
            </strong>
            <span style={{ fontSize: '12px' }}>{DESCRIPTIONS[hovered][1]}</span>
          </div>
        </Html>
      )}
      <TwoWayMirror hovered={hovered} setHovered={setHovered} />
      <Monitor displayToggled={props.displayToggled} hovered={hovered} setHovered={setHovered} />
      <Frame material={woodMaterial} />
      <BottomHolder material={woodMaterial} />
      <Stabler material={woodMaterial} />
      <SideHolder material={woodMaterial} position={[0.11, 0.908, 0.46]} />
      <SideHolder material={woodMaterial} position={[0.11, 0.908, -0.444]} />
      <Seperator material={woodMaterial} />
      <Electronics />
      <RaspberryPi hovered={hovered} setHovered={setHovered} />
      <PiCamera hovered={hovered} setHovered={setHovered} />
    </group>
  )
})

export default Product


useGLTF.preload('models/frame.glb')
useGLTF.preload('models/seperator.glb')
useGLTF.preload('models/raspberry_pi/raspberry_pi_3.glb')
useGLTF.preload('models/camera/camera.glb')
