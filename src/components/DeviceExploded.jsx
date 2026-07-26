import React from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useGLTF, Environment, Lightformer } from '@react-three/drei'
import { TextureLoader } from 'three'

const GOLD = '#FFB200'

// --- GEOMETRIES --- (same part layout the hero render used)
const geoBottom = new THREE.BoxGeometry(0.96, 0.2, 0.08)
const geoStabler = new THREE.BoxGeometry(0.2, 0.1, 0.08)
const geoSide = new THREE.BoxGeometry(0.045, 0.2, 1.54)
const geoElectronics = new THREE.BoxGeometry(0.35, 0.06, 0.8)
const geoMirror = new THREE.BoxGeometry(0.95, 1.62, 0.0125)
const geoMonitor = new THREE.BoxGeometry(0.85, 1.53, 0.06)

// --- MATERIALS ---
const electronicsMaterial = new THREE.MeshStandardMaterial({
  color: 0xbfbfbf,
  roughness: 0.4,
  metalness: 1,
})

const mirrorMaterial = new THREE.MeshStandardMaterial({
  color: 0x9aa0a6,
  metalness: 0.6,
  roughness: 0.08,
  transparent: true,
  opacity: 0.78,
  envMapIntensity: 1.4,
})

const monitorMaterial = new THREE.MeshStandardMaterial({
  color: 0x121316,
  roughness: 0.55,
  metalness: 0.2,
  emissive: new THREE.Color(GOLD),
  emissiveIntensity: 0.06,
})

// --- PARTS ---

function Frame({ material }) {
  const { scene } = useGLTF('/models/frame.glb')
  const cloned = React.useMemo(() => {
    const c = scene.clone(true)
    c.traverse(o => {
      if (o.isMesh) o.material = material
    })
    return c
  }, [scene, material])

  return <primitive object={cloned} position={[0.138, 1, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
}

function Seperator({ material }) {
  const { scene } = useGLTF('/models/seperator.glb')
  const cloned = React.useMemo(() => {
    const c = scene.clone(true)
    c.traverse(o => {
      if (o.isMesh) o.material = material
    })
    return c
  }, [scene, material])

  return <primitive object={cloned} position={[0.11, 1.7, 0.005]} rotation={[-Math.PI / 2, -Math.PI / 2, Math.PI / 2]} scale={0.5} />
}

// --- DEVICE ---

function Device() {
  const bobRef = React.useRef()
  const swayRef = React.useRef()
  const mirrorRef = React.useRef()
  const monitorRef = React.useRef()
  const seperatorRef = React.useRef()
  const electronicsRef = React.useRef()

  const woodTexture = useLoader(TextureLoader, '/media/frame_veneer/plywood_diff_1k.jpg')
  const woodMaterial = React.useMemo(() => {
    const tex = woodTexture.clone()
    tex.colorSpace = THREE.SRGBColorSpace
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(8, 8)
    tex.needsUpdate = true
    return new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, metalness: 0 })
  }, [woodTexture])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    // Separation loop — layers ease apart along the mirror's normal and back.
    const sep = (Math.sin(t * 0.9 - Math.PI / 2) + 1) / 2
    if (mirrorRef.current) mirrorRef.current.position.x = sep * 0.9
    if (monitorRef.current) monitorRef.current.position.x = sep * 0.42
    if (seperatorRef.current) seperatorRef.current.position.x = -sep * 0.3
    if (electronicsRef.current) electronicsRef.current.position.x = -sep * 0.68

    // Bounce + gentle sway so the object stays alive.
    if (bobRef.current) bobRef.current.position.y = -1.5 + Math.sin(t * 1.4) * 0.06
    if (swayRef.current) swayRef.current.rotation.y = Math.PI / 4 + Math.sin(t * 0.3) * 0.18
  })

  return (
    <group ref={bobRef} position={[0, -1.5, 0]} scale={1.55}>
      <group ref={swayRef} rotation={[0, Math.PI / 4, 0]}>
        <group position={[-0.08, 0, 0]}>
          <group ref={mirrorRef}>
            <mesh geometry={geoMirror} material={mirrorMaterial} rotation={[0, Math.PI / 2, 0]} position={[0.0, 0.87, 0]} />
          </group>
          <group ref={monitorRef}>
            <mesh geometry={geoMonitor} material={monitorMaterial} rotation={[0, Math.PI / 2, 0]} position={[0.0385, 0.91, 0.01]} />
          </group>

          <Frame material={woodMaterial} />
          <mesh geometry={geoBottom} material={woodMaterial} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0.11, 0.1, 0.005]} />
          <mesh geometry={geoStabler} material={woodMaterial} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0.12, 0.18, 0.005]} />
          <mesh geometry={geoSide} material={woodMaterial} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0.11, 0.908, 0.46]} />
          <mesh geometry={geoSide} material={woodMaterial} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0.11, 0.908, -0.444]} />

          <group ref={seperatorRef}>
            <Seperator material={woodMaterial} />
          </group>
          <group ref={electronicsRef}>
            <mesh geometry={geoElectronics} material={electronicsMaterial} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0.08, 1, -0.15]} />
          </group>
        </group>
      </group>
    </group>
  )
}

// --- CANVAS ---

// Looping "separation" exploded view of the device, on a transparent canvas.
export default function DeviceExploded() {
  return (
    <Canvas
      camera={{ fov: 45, position: [0, 0, 5] }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <React.Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 6, 4]} intensity={1.1} />
        <pointLight position={[-3, 2, 3]} intensity={22} color={GOLD} distance={14} />
        <pointLight position={[3, 1, -4]} intensity={14} color="#62daff" distance={14} />

        <Device />

        <Environment resolution={64}>
          <Lightformer form="rect" intensity={2.4} color={GOLD} position={[-4, 2, 2]} scale={[6, 6, 1]} target={[0, 0, 0]} />
          <Lightformer form="rect" intensity={1.2} color="#ffffff" position={[4, 3, -2]} scale={[5, 5, 1]} target={[0, 0, 0]} />
          <Lightformer form="circle" intensity={1.6} color="#62daff" position={[0, -2, 3]} scale={[4, 4, 1]} target={[0, 0, 0]} />
        </Environment>
      </React.Suspense>
    </Canvas>
  )
}

useGLTF.preload('/models/frame.glb')
useGLTF.preload('/models/seperator.glb')
