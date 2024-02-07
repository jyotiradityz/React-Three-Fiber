import React from 'react'
import { Text, Html, ContactShadows, Float, useGLTF, Environment, PresentationControls, Stage } from '@react-three/drei'
const Exp = () => {
  const laptop = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')
  console.log(laptop);
  return (
    <>
      <color attach="background" args={['#222222']} />
      <PresentationControls global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1.0, 0.75]}
        config={{
          mass: 2,
          tension: 400,
        }}
        snap={{
          mass: 4,
          tension: 400,
        }}
      >
        <Float ratationIntensity={0.6}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={'#FFFFFF'}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}

          />
          <primitive object={laptop.scene} position-y={-2} scale={2}>
            <Html
              transform
              wrapperClass='htmlScreen'
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe src='https://vivekbhurke.github.io' />
            </Html>
          </primitive>
          <Text
            font='./bangers-v24-latin-regular.woff2'
            position={[4.0, 1.75, 1.75]}
            rotation-y={-1.25}
            children={"Jyotiraditya\rPatil"}
            textAlign='center'
          ></Text>
        </Float>
      </PresentationControls>

      <ContactShadows
        position-y={-1.4}
        opacity={0.4}
        scale={5}
        blur={3.4}
      />

      <Environment preset='city' />
    </>
  )
}

export default Exp
