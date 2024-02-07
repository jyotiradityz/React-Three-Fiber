import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RigidBody, useRapier } from '@react-three/rapier'
import React, { useEffect, useRef, useState } from 'react'
import * as RAPIER from '@dimforge/rapier3d-compat'
import * as THREE from 'three'
import useGame from './store/useGame.jsx'

const Player = () => {

  const [smoothCameraPosition] = useState(() => new THREE.Vector3(100, 100, 100))
  const [smoothCameraTarget] = useState(() => new THREE.Vector3())
  const body = useRef()

  const [subscribeKeys, getKeys] = useKeyboardControls()
  const { rapier, world } = useRapier()

  const rapierWorld = world.raw()

  const start = useGame((state) => state.start)
  const end = useGame((state) => state.end)
  const bloacksCount = useGame((state) => state.blocksCount)
  const restart = useGame((state) => state.restart)




  const jump = () => {
    const origin = body.current.translation()
    origin.y -= 0.31
    const direction = { x: 0, y: 1, z: 0 }
    const ray = new RAPIER.Ray(origin, direction)
    const hit = rapierWorld.castRay(ray)
    // console.log(hit.toi);
    try {
      if (hit.toi < 0.15)
        body.current.applyImpulse({ x: 0, y: 0.4, z: 0 })
    } catch (error) {
      console.log(error);
    }
  }

  const reset = () => {
    console.log('reset');
  }

  useEffect(() => {

    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (phase) => {
        console.log(phase);
      },
      console.log('unsubscribed')
    );

    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          jump();
        }
      }
    );

    const unsubscribeAny = subscribeKeys(() => {
      start();
    });

    return () => {
      unsubscribeReset();
      unsubscribeJump();
      unsubscribeAny();
    };
  }, []);

  useFrame((state, delta) => {
    const { forward, leftward, downword, rightward } = getKeys()

    const impulse = { x: 0, y: 0, z: 0 }
    const torque = { x: 0, y: 0, z: 0 }

    const impulseStrength = 1 * delta
    const torqueStrength = 1 * delta
    if (forward) {
      impulse.z -= impulseStrength
    }
    if (downword) {
      impulse.z += impulseStrength
    }
    if (leftward) {
      impulse.x -= impulseStrength
    }
    if (rightward) {
      impulse.x += impulseStrength
    }


    body.current.applyImpulse(impulse)
    body.current.applyTorqueImpulse(torque)


    const bodyPosition = body.current.translation()
    const cameraPostion = new THREE.Vector3()
    cameraPostion.copy(bodyPosition)
    cameraPostion.z += 2.25
    cameraPostion.y += 0.65

    const cameraTarget = new THREE.Vector3()
    cameraTarget.copy(bodyPosition)
    cameraTarget.y += 0.25

    smoothCameraPosition.lerp(cameraPostion, 3 * delta)
    smoothCameraTarget.lerp(cameraTarget, 3 * delta)

    state.camera.position.copy(smoothCameraPosition)
    state.camera.lookAt(smoothCameraTarget)

    if (bodyPosition.z < -1 * (bloacksCount * 4 + 2)) {
      end()
    }
    if (bodyPosition.y < -4) {
      restart()
    }


  })
  return (
    <RigidBody
      ref={body}
      colliders='ball'
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
      position={[0, 1, 0]}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color='mediumpurple' />
      </mesh>
    </RigidBody>
  )
}

export default Player
