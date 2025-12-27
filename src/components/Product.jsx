import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useGLTF, Html } from '@react-three/drei'
import * as THREE from 'three'
import * as React from 'react'

// --- HELPER: GLOBAL GEOMETRY CACHE ---
// Geometries are kept outside so they are only created once. 
// We DO NOT dispose of these manually because they are shared constants.
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

// --- HELPER: DISPOSAL FUNCTION ---
const disposeNode = (node) => {
  if (node.geometry) node.geometry.dispose();
  if (node.material) {
    if (Array.isArray(node.material)) {
      node.material.forEach(mat => {
        if (mat.map) mat.map.dispose();
        mat.dispose();
      });
    } else {
      if (node.material.map) node.material.map.dispose();
      node.material.dispose();
    }
  }
};

// --- SUB-COMPONENTS ---

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

function Monitor({ hovered, setHovered, displayToggled }) {
  const screenTexture = useLoader(TextureLoader, 'media/default.png')
  const meshRef = React.useRef()

  const materials = React.useMemo(() => {
    const body = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.8, metalness: 0 })
    const screen = new THREE.MeshBasicMaterial({ map: screenTexture })
    return [body, body, body, body, body, screen]
  }, [screenTexture])

  React.useLayoutEffect(() => {
    if (!meshRef.current) return
    const mats = Array.isArray(meshRef.current.material) ? meshRef.current.material : [meshRef.current.material]
    mats.forEach((mat) => {
      if (mat.type === 'MeshStandardMaterial') {
        mat.emissive.set(hovered === "monitor" ? "#ffbe5c" : "#000000")
        mat.emissiveIntensity = hovered === "monitor" ? 0.2 : 0
      }
    })
  }, [hovered])

  return (
    <mesh
      ref={meshRef}
      geometry={geoMonitor}
      material={displayToggled ? materials : materials[0]}
      rotation={[0, Math.PI / 2, 0]}
      position={[0.0385, 0.91, 0.01]}
      onPointerOver={(e) => (e.stopPropagation(), setHovered("monitor"))}
      onPointerOut={() => setHovered("")}
    />
  )
}

function RaspberryPi({ hovered, setHovered }) {
  const { scene } = useGLTF('models/raspberry_pi/raspberry_pi_3.glb')
  const cloned = React.useMemo(() => scene.clone(true), [scene])

  React.useLayoutEffect(() => {
    cloned.traverse((obj) => {
      if (obj.isMesh) {
        // Clone material to avoid global state pollution
        obj.material = obj.material.clone();
        obj.material.emissive.set(hovered === "pi" ? "#ffbe5c" : "#000000")
        obj.material.emissiveIntensity = hovered === "pi" ? 0.2 : 0
      }
    })
  }, [hovered, cloned])

  return <primitive object={cloned} scale={0.045} rotation={[Math.PI, 0, -Math.PI / 2]} position={[0.072, 1.3, 0.25]}
    onPointerOver={(e) => (e.stopPropagation(), setHovered("pi"))}
    onPointerOut={() => setHovered("")} />
}

function PiCamera({ hovered, setHovered }) {
  const { scene } = useGLTF('models/camera/camera.glb')
  const cloned = React.useMemo(() => scene.clone(true), [scene])

  React.useLayoutEffect(() => {
    cloned.traverse((obj) => {
      if (obj.isMesh) {
        obj.material = obj.material.clone();
        obj.material.emissive.set(hovered === "camera" ? "#ffbe5c" : "#000000")
        obj.material.emissiveIntensity = hovered === "camera" ? 0.2 : 0
      }
    })
  }, [hovered, cloned])

  return <primitive object={cloned} scale={0.022} rotation={[0, -Math.PI / 2, 0]} position={[0.06, 1.84, 0]}
    onPointerOver={(e) => (e.stopPropagation(), setHovered("camera"))}
    onPointerOut={() => setHovered("")} />
}

// --- MAIN PRODUCT COMPONENT ---

const Product = React.memo(function Product(props) {
  const groupRef = React.useRef()
  const [hovered, setHovered] = React.useState("");

  // Load Wood Texture
  const woodTexture = useLoader(TextureLoader, 'media/frame_veneer/plywood_diff_1k.jpg')
  
  // Memoize Materials
  const woodMaterial = React.useMemo(() => {
    woodTexture.colorSpace = THREE.SRGBColorSpace
    woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping
    woodTexture.repeat.set(8, 8)
    return new THREE.MeshStandardMaterial({ map: woodTexture, roughness: 0.5, metalness: 0 })
  }, [woodTexture])

  const electronicsMaterial = React.useMemo(() => (
    new THREE.MeshStandardMaterial({ color: 0xbfbfbf, roughness: 0.4, metalness: 1 })
  ), [])

  const mirrorMaterial = React.useMemo(() => (
    new THREE.MeshStandardMaterial({ 
        color: 0x999999, metalness: 0.7, roughness: 0.01, 
        transparent: true, opacity: 0.8, envMapIntensity: 1.2 
    })
  ), [])

  // --- THE DEFINITIVE CLEANUP ---
  React.useEffect(() => {
    const currentGroup = groupRef.current;
    return () => {
      if (currentGroup) {
        currentGroup.traverse((node) => {
          if (node.isMesh) {
            // Dispose of unique materials/geometries created during clones
            disposeNode(node);
          }
        });
      }
      // Explicitly dispose memoized materials
      woodMaterial.dispose();
      electronicsMaterial.dispose();
      mirrorMaterial.dispose();
    };
  }, [woodMaterial, electronicsMaterial, mirrorMaterial]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (!groupRef.current) return
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.03 + props.position[1]
    groupRef.current.rotation.x = props.rotation[0] + Math.sin(t * 1.2) * 0.01
    groupRef.current.rotation.y = props.rotation[1] + Math.sin(t * 0.8) * 0.015
    groupRef.current.rotation.z = props.rotation[2] + Math.sin(t * 1.1) * 0.01
  })

  return (
    <group ref={groupRef} position={props.position} scale={2}>
      {hovered && (
        <Html distanceFactor={10} position={[0.5, 1.2, 0]} style={{ pointerEvents: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
          <div style={{ background: 'white', color: 'black', padding: '10px 15px', borderRadius: '8px', border: '1px solid #ffbe5c', fontFamily: 'sans-serif', boxShadow: '0px 4px 15px rgba(0,0,0,0.5)' }}>
            <strong style={{ color: '#ffbe5c', display: 'block', marginBottom: '4px' }}>{DESCRIPTIONS[hovered][0]}</strong>
            <span style={{ fontSize: '12px' }}>{DESCRIPTIONS[hovered][1]}</span>
          </div>
        </Html>
      )}
      
      {/* Mesh Components */}
      <mesh geometry={geoMirror} material={mirrorMaterial} rotation={[0, Math.PI / 2, 0]} position={[0.0, 0.87, 0]} 
            onPointerOver={(e) => (e.stopPropagation(), setHovered("mirror"))} onPointerOut={() => setHovered("")} />
      
      <Monitor displayToggled={props.displayToggled} hovered={hovered} setHovered={setHovered} />
      <Frame material={woodMaterial} />
      <mesh geometry={geoBottom} material={woodMaterial} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0.11, 0.1, 0.005]} />
      <mesh geometry={geoStabler} material={woodMaterial} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0.12, 0.18, 0.005]} />
      <mesh geometry={geoSide} material={woodMaterial} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0.11, 0.908, 0.46]} />
      <mesh geometry={geoSide} material={woodMaterial} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0.11, 0.908, -0.444]} />
      <Seperator material={woodMaterial} />
      <mesh geometry={geoElectronics} material={electronicsMaterial} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0.08, 1, -0.15]} />
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