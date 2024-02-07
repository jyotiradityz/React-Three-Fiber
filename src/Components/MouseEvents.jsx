import { Clone, OrbitControls, useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import React, { useRef } from 'react'

const MouseEvents = () => {
    const Hamburger = useGLTF('/hamburger.glb')
    console.log(Hamburger);
    const cube = useRef()
    const handleclick = (e) => {
        console.log(e);
        cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
    }
    return (
        <>
            <OrbitControls makeDefault />
            <directionalLight position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            {/* <mesh
                ref={cube}
                rotation-Y={2}
                position-x={2}
                scale={1.5}
                onClick={handleclick}
                onPointerEnter={() => {
                    document.body.style.cursor = 'pointer'
                }}
                onPointerLeave={() => {
                    document.body.style.cursor = 'def'
                }}
            >
                <boxGeometry />
                <meshStandardMaterial color="purple" />
            </mesh> */}

            {/* <mesh position-x={-2} onClick={(e) => e.stopPropagation()}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh> */}

            <mesh position-y={-1} scale={10} rotation-x={- Math.PI * 0.5}>
                <planeGeometry />
                <meshStandardMaterial color="green" />
            </mesh>

            <mesh>
                <primitive
                    object={Hamburger.scene}
                    position={[0, 2, 0]}
                    scale={2}
                />
            </mesh>
        </>
    )
}

export default MouseEvents
