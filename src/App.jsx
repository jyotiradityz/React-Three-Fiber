import './App.css'
import Light from './Project/Light'
import { Level } from './Project/Level'
import { Debug, Physics } from '@react-three/rapier'
import Player from './Project/Player'
import { KeyboardControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Interface from './Project/Interface'
import useGame from './Project/store/useGame'
import Portal from './Components/Portal'
import ThreeD from './Components/ThreeD'
function App() {

  const blocksCount = useGame((state) => state.blocksCount)

  return (
    // <>
    //   <KeyboardControls
    //     map={[
    //       { name: 'jump', keys: ['Space'] },
    //       { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
    //       { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
    //       { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    //       { name: 'downword', keys: ['ArrowDown', 'KeyS'] }
    //     ]
    //     }
    //   >
    //     <Canvas shadows
    //       camera={{
    //         fov: 45,
    //         near: 0.1,
    //         far: 200,
    //         position: [2.5, 4, 6]
    //       }}
    //     >
    //       <axesHelper args={[5]} />
    //       <Physics>
    //         <Light />
    //         <Level count={ blocksCount } />
    //         <Player />
    //       </Physics>
    //     </Canvas>
    //     <Interface />
    //   </KeyboardControls>
    // </>
    <Canvas>
      <Portal />
      <ThreeD />
      <Portal2 />
    // </Canvas>
    
  )
}

export default App





{/* <Physics />  */ }


// import ModelImport from './Components/ModelImport'
// import ThreeD from './Components/ThreeD'
// import Portal from './Components/Portal'
// import MouseEvents from './Components/MouseEvents'
// import Port from './PortFolio/Port'
// import Physics from './Components/Physics'
import Portal2 from './Components/Portal2';


{/* <Portal/> */ }
{/* <ModelImport/> */ }
{/* <ThreeD/> */ }
{/* <MouseEvents /> */ }
{/* <Port /> */ }
{/* <Physics>
            <Debug />
            <Light />
            <Level count={5}/>
            <Player />
        </Physics> */}

