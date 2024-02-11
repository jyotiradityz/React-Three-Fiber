import { Center, OrbitControls, Text3D, useMatcapTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import React, { useEffect, useRef, useState } from 'react'
import { TorusGeometry } from 'three'
import * as THREE from 'three'

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()

const ThreeD = () => {

    const [matCap] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)
    const donutGroup = useRef()
    useEffect(() => {
        matCap.encoding = THREE.sRGBEncoding
        matCap.needsUpdate = true
        material.matcap = matCap
        material.needsUpdate = true
    })

    useFrame((state, delta) => {
        for (const donut of donutGroup.current.children) {
            donut.rotation.y += 0.01
        }
    })

    return <>
        <Perf position='top-left' />
        {/* <OrbitControls makeDefault /> */}

        <Center>
            <group position={[0,10,-15]}>
                <Text3D
                    font='./Fonts/helvetiker_bold.typeface.json'
                    material={material}
                    size={0.75}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                >

                    METAMORPHOSIS
                </Text3D>
                <Text3D
                    position={[3, -1, 0]}
                    font='./Fonts/helvetiker_bold.typeface.json'
                    material={material}
                    size={0.75}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    2K24
                </Text3D>
            </group>
        </Center>
        <group ref={donutGroup}>
            {
                [...Array(10)].map((value, index) =>
                    <mesh
                        key={index}
                        geometry={torusGeometry}
                        material={material}
                        position={[
                            (Math.random() - 0.5) * 15,
                            (Math.random() - 0.5) * 15,
                            (Math.random() - 0.5) * 15,
                        ]}
                        scale={0.2 + Math.random() * 0.2}
                        rotation={[
                            (Math.random() - 0.5) * 10,
                            (Math.random() - 0.5) * 10,
                            (Math.random() - 0.5) * 10,
                        ]}
                    />)
            }
        </group>

    </>

}

export default ThreeD
