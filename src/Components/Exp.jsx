import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stage,ContactShadows, SoftShadows, OrbitControls, useHelper, Sky, Environment, Lightformer, Stars } from '@react-three/drei';
import { Leva, useControls } from 'leva';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';

const Exp = () => {

  const {sunPosition}=useControls('sky',{
    sunPosition: { value: [1,2,3] }
  })
  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 2);
  
  const { envMapvisibiity, envMapHeight,envMapRadius,envMapScale } = useControls('env',{
    envMapvisibiity: { value : 1 , min: 0, max: 12 },
    envMapHeight: { value : 7 , min: 0, max: 100 },
    envMapRadius: { value : 20 , min: 0, max: 1000 },
    envMapScale: { value : 100 , min: 10, max: 1000 }
  });

  const { Perfvisiblity } = useControls({
    Perfvisiblity: true
  });


  const { position, color } = useControls({
    position: {
      value: { x: -2, y: 0 },
      step: 0.1,
      joystick: "invertY"
    },
    color: '#90c700'
  });

  return (
    <>

      {/* <Environment
        // background
        
        preset='sunset'
        ground={
          {
            height:envMapHeight,
            radius:envMapRadius ,
            scale:envMapScale
          }
        }
        // files={'../public/envMaps/hehe.hdr' }
      > */}
            {/* <color args={['black']} attach="background" /> 
            <Lightformer
              position-z={-5}
              scale={10}
              intensity={1} 
              color={'red'}
            /> */}

        {/* <mesh position-z={-5} scale={2  }>
          <sphereGeometry/>
          <meshBasicMaterial  color={[12,0,0]} />
        </mesh> */}
      {/* </Environment> */}

      


      {Perfvisiblity && <Perf position='top-left' />}
      <OrbitControls />

      <ContactShadows position={[0,-0.99,0]}/>
      <Sky sunPosition={sunPosition}/>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <directionalLight
        ref={directionalLight}
        // castShadow
        // shadow-mapSize={[1024, 1024]}
        // shadow-camera-near={1}
        // shadow-camera-far={10}
        // shadow-camera-left={-2}
        // shadow-camera-top={2}
        // shadow-camera-right={2}
        // shadow-camera-bottom={-2}
        position={sunPosition}
        intensity={3.5}
      />
      {/* <Stage ContactShadows={{opacity:0.2,blur:5}} environment="sunset">

      <mesh castShadow position={[-2,1,0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={'orange'}  envMapIntensity={envMapvisibiity}/>
      </mesh>

      <mesh castShadow rotation-y={Math.PI * 0.25} position={[2,1,0]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color={'mediumpurple'}  envMapIntensity={envMapvisibiity}/>
      </mesh>
      </Stage> */}
      
     
    </>
  );
};

export default Exp;
