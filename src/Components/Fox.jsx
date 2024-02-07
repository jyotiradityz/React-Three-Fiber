import { useAnimations,useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import React, { useEffect, useRef } from 'react'

const Fox = () => {
    const foxRef=useRef()    
    const foxRotationSpeed = 1
    const foxRadius = 2.5

    useFrame((state, delta) => {
        const currentTime = state.clock.getElapsedTime()
        const newX = Math.cos(currentTime * foxRotationSpeed) * foxRadius
        const newZ = Math.sin(currentTime * foxRotationSpeed) * foxRadius

        foxRef.current.position.x = newX
        foxRef.current.position.z = newZ
        foxRef.current.rotation.y = -currentTime * foxRotationSpeed
    })
        

    const fox = useGLTF('./Fox/glTF/Fox.gltf')
    console.log(fox);
    const animations = useAnimations(fox.animations, fox.scene)
    const {animationName} = useControls({
        animationName : { options: animations.names }
    }) 
    useEffect(() => { 
        const action = animations.actions[animationName]
        action.reset().fadeIn(0.5).play() 
        
        return () => {
            action.fadeOut(0.5)
        }
        // window.setTimeout(()=>{
        //     animations.actions.Walk.play()
        //     animations.actions.Walk.crossFadeFrom(animations.actions.Run,1)

        // },2000)
    } , [ animationName ])


  return (
    <>
        <primitive object={fox.scene} scale={0.02} position={[-2.5,0,2.5]} 
        rotation-y={0.3} ref={foxRef}
        />
    </>
  )
}

export default Fox
