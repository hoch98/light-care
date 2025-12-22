import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import * as React from 'react'

const geoBottom = new THREE.BoxGeometry(0.96, 0.2, 0.08)
const geoStabler = new THREE.BoxGeometry(0.2, 0.1, 0.08)
const geoSide = new THREE.BoxGeometry(0.045, 0.2, 1.54)
const geoElectronics = new THREE.BoxGeometry(0.35, 0.06, 0.8)
const geoMirror = new THREE.BoxGeometry(0.95, 1.62, 0.0125)
const geoMonitor = new THREE.BoxGeometry(0.85, 1.53, 0.06)

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
    />
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

function TwoWayMirror() {
  return (
    <mesh
      geometry={geoMirror}
      material={mirrorMaterial}
      rotation={[0, Math.PI / 2, 0]}
      position={[0.0, 0.87, 0]}
      receiveShadow
    />
  )
}

function Monitor({ displayToggled }) {
  const screenTexture = useLoader(TextureLoader, 'media/default.png')

  const materials = React.useMemo(() => {
    const screen = new THREE.MeshBasicMaterial({ map: screenTexture })
    return [
      monitorBodyMaterial,
      monitorBodyMaterial,
      monitorBodyMaterial,
      monitorBodyMaterial,
      monitorBodyMaterial,
      screen,
    ]
  }, [screenTexture])

  return (
    <mesh
      geometry={geoMonitor}
      material={displayToggled ? materials : monitorBodyMaterial}
      rotation={[0, Math.PI / 2, 0]}
      position={[0.0385, 0.91, 0.01]}
      receiveShadow
    />
  )
}

function RaspberryPi() {
  const { scene } = useGLTF('models/raspberry_pi/raspberry_pi_3.glb')
  const cloned = React.useMemo(() => scene.clone(true), [scene])

  return (
    <primitive
      object={cloned}
      scale={0.045}
      rotation={[Math.PI, 0, -Math.PI / 2]}
      position={[0.072, 1.3, 0.25]}
    />
  )
}

function PiCamera() {
  const { scene } = useGLTF('models/camera/camera.glb')
  const cloned = React.useMemo(() => scene.clone(true), [scene])

  return (
    <primitive
      object={cloned}
      scale={0.022}
      rotation={[0, -Math.PI / 2, 0]}
      position={[0.06, 1.84, 0]}
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

  return (
    <group ref={ref} position={props.position} scale={2}>
      <TwoWayMirror />
      <Monitor displayToggled={props.displayToggled} />
      <Frame material={woodMaterial} />
      <BottomHolder material={woodMaterial} />
      <Stabler material={woodMaterial} />
      <SideHolder material={woodMaterial} position={[0.11, 0.908, 0.46]} />
      <SideHolder material={woodMaterial} position={[0.11, 0.908, -0.444]} />
      <Seperator material={woodMaterial} />
      <Electronics />
      <RaspberryPi />
      <PiCamera />
    </group>
  )
})

export default Product


useGLTF.preload('models/frame.glb')
useGLTF.preload('models/seperator.glb')
useGLTF.preload('models/raspberry_pi/raspberry_pi_3.glb')
useGLTF.preload('models/camera/camera.glb')
