import React from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useGLTF, Environment, Lightformer, ContactShadows, AdaptiveDpr } from '@react-three/drei'
import { TextureLoader } from 'three'

const GOLD = '#FFB200'

// --- GEOMETRIES ---
// Mirrors the part layout in Product.jsx, minus the Raspberry Pi and Pi Camera
// GLBs (2.7MB / 32MB) — neither is legible at hero scale behind the blur overlay.
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

  return <primitive object={cloned} position={[0.138, 1, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
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

  return <primitive object={cloned} position={[0.11, 1.7, 0.005]} rotation={[-Math.PI / 2, -Math.PI / 2, Math.PI / 2]} scale={0.5} />
}

// --- DEVICE ---

function Device({ reducedMotion }) {
  const spinRef = React.useRef()
  const bobRef = React.useRef()

  const woodTexture = useLoader(TextureLoader, 'media/frame_veneer/plywood_diff_1k.jpg')
  const woodMaterial = React.useMemo(() => {
    // clone before configuring — useLoader caches globally, so mutating the
    // shared texture would also change how Product.jsx renders it
    const tex = woodTexture.clone()
    tex.colorSpace = THREE.SRGBColorSpace
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(8, 8)
    tex.needsUpdate = true
    return new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, metalness: 0 })
  }, [woodTexture])

  useFrame(({ clock, camera }, delta) => {
    if (reducedMotion) return
    const t = clock.elapsedTime

    // Continuous slow revolution — ~28s per full turn.
    if (spinRef.current) spinRef.current.rotation.y += delta * 0.22

    // Float + a gentle tilt drift so the turn never reads mechanical.
    if (bobRef.current) {
      bobRef.current.position.y = -1.55 + Math.sin(t * 0.9) * 0.06
      bobRef.current.rotation.x = Math.sin(t * 0.5) * 0.045
      bobRef.current.rotation.z = Math.sin(t * 0.37) * 0.02
    }

    // Slow dolly — breathes between 6.6 and 5.4 on a ~26s cycle.
    camera.position.z = 6.0 + Math.sin(t * 0.24) * 0.6
    camera.position.y = Math.sin(t * 0.19) * 0.25
    camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={bobRef} position={[0, -1.55, 0]} scale={1.7}>
      <group ref={spinRef} rotation={[0, Math.PI / 4, 0]}>
        {/* offset so the device turns about its own axis, not the world origin */}
        <group position={[-0.08, 0, 0]}>
          <mesh geometry={geoMirror} material={mirrorMaterial} rotation={[0, Math.PI / 2, 0]} position={[0.0, 0.87, 0]} />
          <mesh geometry={geoMonitor} material={monitorMaterial} rotation={[0, Math.PI / 2, 0]} position={[0.0385, 0.91, 0.01]} />

          <Frame material={woodMaterial} />
          <Seperator material={woodMaterial} />
          <mesh geometry={geoBottom} material={woodMaterial} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0.11, 0.1, 0.005]} castShadow receiveShadow />
          <mesh geometry={geoStabler} material={woodMaterial} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0.12, 0.18, 0.005]} castShadow receiveShadow />
          <mesh geometry={geoSide} material={woodMaterial} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0.11, 0.908, 0.46]} castShadow receiveShadow />
          <mesh geometry={geoSide} material={woodMaterial} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0.11, 0.908, -0.444]} castShadow receiveShadow />
          <mesh geometry={geoElectronics} material={electronicsMaterial} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0.08, 1, -0.15]} castShadow receiveShadow />
        </group>
      </group>
    </group>
  )
}

// --- CANVAS ---

export default function HeroCanvas({ active = true }) {
  const reducedMotion = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  return (
    <Canvas
      camera={{ fov: 45, position: [0, 0, 6] }}
      dpr={[1, 1.75]}
      frameloop={active && !reducedMotion ? 'always' : 'demand'}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <React.Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 6, 4]} intensity={1.1} />
        {/* gold key from the left, cool rim from behind — keyed to #FFB200 on #0A0B0E */}
        <pointLight position={[-3, 2, 3]} intensity={22} color={GOLD} distance={14} />
        <pointLight position={[3, 1, -4]} intensity={14} color="#62daff" distance={14} />

        <Device reducedMotion={reducedMotion} />

        <ContactShadows position={[0, -1.6, 0]} opacity={0.45} blur={2.8} scale={9} far={4} />

        {/* Inline environment — generated in-scene, no CDN fetch. Gives the
            two-way mirror something to reflect. */}
        <Environment resolution={64}>
          <Lightformer form="rect" intensity={2.4} color={GOLD} position={[-4, 2, 2]} scale={[6, 6, 1]} target={[0, 0, 0]} />
          <Lightformer form="rect" intensity={1.2} color="#ffffff" position={[4, 3, -2]} scale={[5, 5, 1]} target={[0, 0, 0]} />
          <Lightformer form="circle" intensity={1.6} color="#62daff" position={[0, -2, 3]} scale={[4, 4, 1]} target={[0, 0, 0]} />
        </Environment>

        <AdaptiveDpr pixelated />
      </React.Suspense>
    </Canvas>
  )
}

useGLTF.preload('models/frame.glb')
useGLTF.preload('models/seperator.glb')
