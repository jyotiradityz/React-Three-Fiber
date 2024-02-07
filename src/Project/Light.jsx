import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
export default function Light() {
    const light = useRef()
    useFrame((state, delta) => {
        light.current.position.z = state.camera.position.z + 1
        light.current.target.position.z = state.camera.position.z
        light.current.target.updateMatrixWorld()

    })
    return <>
        <directionalLight
            ref={light}
            intensity={1.5}
            castShadow
            position={[4, 4, 1]}
            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={10}
            shadow-camera-right={10}
            shadow-camera-bottom={-10}
            shadow-camera-left={-10}
        />
        <ambientLight intensity={.5} />
    </>
}