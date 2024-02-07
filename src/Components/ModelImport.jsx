import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Stage, ContactShadows, SoftShadows, OrbitControls, useHelper, Sky, Environment, Lightformer, Stars } from '@react-three/drei';
import { Leva, useControls } from 'leva';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';
import Hambaurger from './Hambaurger';
import Fox from './Fox';

const Exp2 = () => {

    const directionalLight = useRef();
    useHelper(directionalLight, THREE.DirectionalLightHelper, 2);
    return (
        <>
            {/* <Perf position='top-left' /> */}
            <OrbitControls />
            <directionalLight position={[2, 2, 1]}
                ref={directionalLight}
                intensity={6}
            />
            <mesh receiveShadow rotation-x={-Math.PI * 0.5} scale={10} position={[0, 0, 0]}>
                <planeGeometry />
                <meshStandardMaterial color={'green'} />
            </mesh>
            <Suspense
                fallback={
                    <mesh position={[0, 1, 0]}>
                        <boxGeometry args={[2, 2, 2]} />
                        <meshStandardMaterial color={'red'} />
                    </mesh>
                }
            >
                <Hambaurger />
                {/* <Fox /> */}
            </Suspense>

        </>
    )
}

export default Exp2
