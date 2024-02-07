import { useKeyboardControls } from '@react-three/drei'
import React from 'react'

const Interface = () => {
    const forward = useKeyboardControls((state)=>state.forward)
    const downword = useKeyboardControls((state)=>state.downword)
    const leftward = useKeyboardControls((state)=>state.leftward)
    const rightward = useKeyboardControls((state)=>state.rightward)
    const jump = useKeyboardControls((state)=>state.jump)
    // console.log(jump, forward, downword, leftward, rightward);
  return (
    <div className='interface'>
        {/* Time */}
        <div className="time">
            00:00
        </div>
        {/* Restart */}
        <div className="restart">
            Restart
        </div>


        {/* Controls */}
        <div className="controls">
            <div className="raw">
                <div className={`key ${ forward ? 'active': ''}`}></div>
            </div>
            <div className="raw">
                <div className={`key ${ leftward ? 'active': ''}`}></div>
                <div className={`key ${ downword ? 'active': ''}`}></div>
                <div className={`key ${ rightward ? 'active': ''}`}></div>
            </div>
            <div className="raw">
                <div className={`key large ${ jump ? 'active': ''}`}></div>
            </div>
        </div>


    </div>
  )
}

export default Interface
