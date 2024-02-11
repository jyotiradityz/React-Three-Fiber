import { OrbitControls, useHelper, useGLTF, useTexture, Center, Sparkles, shaderMaterial, useFBO, Sky, Stars } from '@react-three/drei';
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

const Portal = () => {
    // const { nodes1 } = useGLTF('./Portal/portal-2.glb')
    const { nodes } = useGLTF('./Portal/portal.glb')
    console.log(nodes);
    const bakedTexture = useTexture('./Portal/canva_baked3.png')
    const portalMaterial = useRef()
    useFrame((state, delta) => {
        portalMaterial.current.uniforms.uTime.value += delta
    })
    return (
        <>
            <OrbitControls />
            <color args={['#000000']} attach="background" />
            {/* <Stars /> */}
            {/* <group dispose={null}>
                <mesh geometry={nodes.portalCircle.geometry} position={[0, 0.78, 1.6]} rotation={[-Math.PI / 2, 0, 0]}>
                    <portalMaterial ref={portalMaterial}  uColorStart="hotpink" uColorEnd="white" />
                </mesh>
                <mesh geometry={nodes.lampLightL.geometry} material-color="#f0bf94" position={[0.89, 1.07, -0.14]} scale={[0.07, 0.11, 0.07]} />
                <mesh geometry={nodes.lampLightR.geometry} material-color="#f0bf94" position={[-0.98, 1.07, -0.14]} scale={[-0.07, 0.11, 0.07]} />
                <mesh geometry={nodes.baked.geometry} position={[0.9, 0.34, -1.47]} rotation={[0, 0.14, 0]}>
                    <meshBasicMaterial map={bakedTexture} map-flipY={false} />
                </mesh>
            </group> */}
            <color args={['#000000']} attach="background" />
            <Perf position='top-left'/>
            {/* <OrbitControls /> */}
            <group position={[0, 0, -7]}>
                <mesh geometry={nodes.baked.geometry}>
                    <meshBasicMaterial map={bakedTexture} map-flipY={false} />
                </mesh>
                <mesh geometry={nodes.poleLightA.geometry}
                    position={nodes.poleLightA.position}
                />
                <mesh geometry={nodes.poleLightB.geometry}
                    position={nodes.poleLightB.position}
                />
                <mesh
                    geometry={nodes.portalLight.geometry}
                    position={nodes.portalLight.position}
                    rotation={nodes.portalLight.rotation}
                >
                    <portalMaterial ref={portalMaterial} />
                </mesh>
                <Sparkles size={6} scale={[4, 2, 4]} position-y={1} speed={0.5} />
            </group>

        </>
    )
}

export default Portal
