import { OrbitControls, useHelper, useGLTF, useTexture, Center, Sparkles, shaderMaterial, useFBO, Sky } from '@react-three/drei';
import * as THREE from 'three';
import { Perf } from 'r3f-perf';
import portalVShader from '../shaders/portal/vertex.js'
import portalFShader from '../shaders/portal/fragment.js'
import { extend, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#A020F0'),
        uColorEnd: new THREE.Color('#000000'),
    }, portalVShader, portalFShader
)

extend({ PortalMaterial: PortalMaterial })

const Portal2 = () => {
    // const { nodes1 } = useGLTF('./Portal/portal-2.glb')
    const { nodes } = useGLTF('./Portal/portall.glb')
    console.log(nodes);
    const bakedTexture = useTexture('./Portal/real_baked.jpeg')
    const portalMaterial = useRef()
    useFrame((state, delta) => {
        portalMaterial.current.uniforms.uTime.value += delta
    })
    return (
        <>
            <OrbitControls />
            <color args={['#000000']} attach="background" />
            <group dispose={null}>
                <mesh geometry={nodes.portalCircle.geometry} position={[0, 0.78, 1.6]} rotation={[-Math.PI / 2, 0, 0]}>
                    <portalMaterial ref={portalMaterial}  uColorStart="hotpink" uColorEnd="white" />
                </mesh>
                <mesh geometry={nodes.lampLightL.geometry} material-color="#f0bf94" position={[0.89, 1.07, -0.14]} scale={[0.07, 0.11, 0.07]} />
                <mesh geometry={nodes.lampLightR.geometry} material-color="#f0bf94" position={[-0.98, 1.07, -0.14]} scale={[-0.07, 0.11, 0.07]} />
                <mesh geometry={nodes.baked.geometry} position={[0.9, 0.34, -1.47]} rotation={[0, 0.14, 0]}>
                    <meshBasicMaterial map={bakedTexture} map-flipY={false} />
                </mesh>
            </group>
            
        </>
    )
}

export default Portal2
