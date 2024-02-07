import { CuboidCollider, RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useGLTF } from '@react-three/drei'
import Light from './Light';


THREE.ColorManagement.legacyMode = false
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' })
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' })
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' })
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' })


export function BlockStart({ position = [0, 0, 0], }) {
    return (
        <group position={position}>
            <mesh geometry={boxGeometry} position={[0, -0.1, 0]} receiveShadow scale={[4, 0.2, 4]} material={floor1Material} />
        </group>
    )
}

export function BloackSpinner({ position = [0, 0, 0], }) {
    const [speed] = useState(() => (Math.random() + 2.5) * (Math.random() < 0.5 ? -1 : 1))
    const obstacle = useRef()
    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime()
        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(0, speed * time, 0))
        obstacle.current.setNextKinematicRotation(rotation)
    })
    return (
        <group position={position}>
            <mesh geometry={boxGeometry} position={[0, -0.1, 0]} receiveShadow scale={[4, 0.2, 4]} material={floor2Material} />
            <RigidBody ref={obstacle} type='kinematicPosition' position={[0, 0.3, 0]} friction={0}>
                <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[3.5, 0.3, 0.3]} />
            </RigidBody>
        </group>
    )
}

export function BloackLimbo({ position = [0, 0, 0], }) {
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2)
    const obstacle = useRef()
    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime()
        const y = Math.sin(time + timeOffset) + 1.15
        obstacle.current.setNextKinematicTranslation({ x: position[0], y: y + position[1], z: position[2] })
    })

    return (
        <group position={position}>
            <mesh geometry={boxGeometry} position={[0, -0.1, 0]} receiveShadow scale={[4, 0.2, 4]} material={floor2Material} />
            <RigidBody ref={obstacle} type='kinematicPosition' position={[0, 0.3, 0]} friction={0}>
                <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[3.5, 0.3, 0.3]} />
            </RigidBody>
        </group>
    )
}

export function BloackAxe({ position = [0, 0, 0], }) {
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2)
    const obstacle = useRef()
    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime()
        const x = Math.sin(time + timeOffset) * 1.25
        //    console.log(x);
        obstacle.current.setNextKinematicTranslation({ x: x + position[0], y: position[1] + 0.75, z: position[2] })
    })

    return (
        <group position={position}>
            <mesh geometry={boxGeometry} position={[0, -0.1, 0]} receiveShadow scale={[4, 0.2, 4]} material={floor2Material} />
            <RigidBody ref={obstacle} type='kinematicPosition' position={[0, 0.3, 0]} friction={0}>
                <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[1.5, 1.5, 0.3]} castShadow />
            </RigidBody>
        </group>
    )
}

export function BlockEnd({ position = [0, 0, 0], }) {
    const hamburger = useGLTF('/hamburger.glb')
    hamburger.scene.children.forEach((child) => {
        child.castShadow = true
        child.receiveShadow = true
    })
    return (
        <group position={position}>
            <mesh geometry={boxGeometry} position={[0, 0, 0]} receiveShadow scale={[4, 0.2, 4]} material={floor1Material} />
            <RigidBody type="fixed" collidreceiveShadowcasers='hull' restitution={0.2} friction={0} position={[0, 0.25, 0]}>
                <primitive object={hamburger.scene} scale={0.5} position={[0, 0.5, 0]} castShadow/>
            </RigidBody>
        </group>
    )
}

function Bounds({ count = 1 }) {
    return (
        <>
            
            <RigidBody type='fixed' restitution={0.2} friction={0}>
                <mesh
                    position={[2.15, 0.75, -(count * 2) - 2]}
                    geometry={boxGeometry}
                    material={wallMaterial}
                    scale={[0.3, 1.5, 4 * (count + 2)]}
                    castShadow
                />
                <mesh
                    position={[-2.15, 0.75, -(count * 2) - 2]}
                    geometry={boxGeometry}
                    material={wallMaterial}
                    scale={[0.3, 1.5, 4 * (count + 2)]}
                    receiveShadow
                />
                <mesh
                    position={[0, 0.75, -2 - (count + 1) * 4]}
                    geometry={boxGeometry}
                    material={wallMaterial}
                    scale={[4, 1.5, 0.3]}
                    castShadow
                />
                <CuboidCollider
                    restitution={0.2}
                    friction={1}
                    args={[2, .1, 2 * (count+2)]}
                    position={[0, -0.1, -(count * 2)-2]}
                />
            </RigidBody>
        </>
    )
}

export function Level({
    count = 50,
    types = [BloackAxe, BloackLimbo, BloackSpinner]
}) {
    const blocks = useMemo(() => {
        const blocks = []
        for (let i = 0; i < count; i++) {
            const type = types[Math.floor(Math.random() * types.length)]
            blocks.push(type)
        }
        return blocks
    }, [count, types])
    return (
        <>

            <Perf position='top-left' />
           
            <BlockStart position={[0, 0, 0]} />
            {
                blocks.map((Block, index) => {
                    return <Block key={index} position={[0, 0, -(index + 1) * 4]} />
                })
            }
            <BlockEnd position={[0, 0, -(blocks.length + 1) * 4]} />
            <Bounds count={count} />
        </>
    )
}