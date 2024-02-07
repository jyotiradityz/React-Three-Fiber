import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import React from 'react'

const Physics = () => {
  return (
    <>
      <Perf position='top-left' scale={0.8} />
      <ambientLight intensity={1} />
      <OrbitControls />
      <directionalLight position={[1, 2, 3]} intensity={1} />
      <mesh position={[-2,2,0]}>
        <sphereGeometry attach="geometry" />
        <meshStandardMaterial attach="material" color='orange' />
      </mesh>

      <mesh position={[2, 2, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={'red'} />
      </mesh>
      <mesh receiveShadow rotation-x={-Math.PI * 0.5} scale={10} position={[0, 0, 0]}>
        <planeGeometry />
        <meshStandardMaterial color={'lightgreen'} />
      </mesh>

    </>
  )
}

export default Physics
