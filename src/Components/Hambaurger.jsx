import React from 'react'
import { Clone, useGLTF } from '@react-three/drei';

const Hambaurger = () => {
    const hamburger = useGLTF('/hamburger.glb')
    console.log(hamburger);
    return <>
        {/* <Clone object={hamburger.scene} position={[-5,2,0]}/> */}
        <Clone object={hamburger.scene} position={[0,0.75,0]} scale={0.5} castShadow/>
        {/* <Clone object={hamburger.scene} position={[5,2,0]}/> */}
    </>
    
}
useGLTF.preload('/hamburger.glb')   
export default Hambaurger
