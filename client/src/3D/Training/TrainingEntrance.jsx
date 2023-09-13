import { Stars, Html, CameraControls, Float } from '@react-three/drei'
import { useRef, useState } from 'react'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { DEG2RAD } from 'three/src/math/MathUtils'

import MusicStudio from './MusicStudio'
import RoomEnv from './RoomEnv'
import { useThree } from '@react-three/fiber'

export default function TrainingEntrance(){
    const camControl = useRef()
    const [showText, setShowText] = useState(true)
    const { camera, gl } = useThree()
    console.log(gl.domElement.height)
    console.log(gl.domElement.width)
    const { skyColor } = useControls('skyColor', {
        skyColor: {
            value: '#010209'
        }
    })

    const { textPosition } = useControls('text', {
        textPosition: {
            value: {
                x: -5,
                y: -2.55,
                z: 5
            },
            min: -5,
            max: 5,
            step: 0.01,
        }
    })

    // Timeout function to make it wait for a bit
    const timeout = (ms)=>{
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    // animating cam using camera control helper
    const animateCam = async ()=>{
        setShowText(false)
        await camControl.current?.rotate(-55 * DEG2RAD, 0, true)
        await camControl.current?.moveTo(0, 0, -10, true)
        await timeout(500)
        await camControl.current?.zoom(camera.zoom / 3, true)
        window.location.assign('/training/main')
    }

    return <>
        <Perf position={'bottom-right'}/>
        <CameraControls ref={camControl} mouseButtons={null} touches={null}/>
        <RoomEnv/>

        <color args={[skyColor]} attach={'background'}/>

        <Stars radius={300} count={2000}/>
        <MusicStudio position={[9, -3, 0]}/>
        {showText && <Float speed={2} floatIntensity={2} rotationIntensity={0.1}><Html position-x={textPosition.x} position-y={textPosition.y} position-z={(textPosition.z / gl.domElement.width)}  rotation={[-0.206, 1.545, 0.168]} transform>
            <div className="buttonGroup">
                <button onClick={animateCam} id="goTrainBtn">Go Train</button>
            </div>
        </Html></Float>}

    </>
}