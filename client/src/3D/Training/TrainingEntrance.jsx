import { OrbitControls, Stars, Html, CameraControls } from '@react-three/drei'
import { useRef, useState } from 'react'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { DEG2RAD } from 'three/src/math/MathUtils'
import * as THREE from 'three'

import MusicStudio from './MusicStudio'
import RoomEnv from './RoomEnv'
import { useThree } from '@react-three/fiber'

export default function TrainingEntrance(){
    const camControl = useRef()
    const [showText, setShowText] = useState(true)
    const { camera } = useThree()

    const { skyColor } = useControls('skyColor', {
        skyColor: {
            value: '#010209'
        }
    })

    const { textPosition } = useControls('text', {
        textPosition: {
            value: {
                x: -5,
                y: 2.62,
                z: 5
            },
            min: -5,
            max: 5,
            step: 0.01,
        }
    })

    const timeout = (ms)=>{
        return new Promise(resolve => setTimeout(resolve, ms))
    }

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
        {showText && <Html position-x={textPosition.x} position-y={textPosition.y} position-z={textPosition.z}  rotation={[-0.206, 0.945, 0.168]} transform>
            <div className="buttonGroup">
                <button onClick={animateCam} style={{ backgroundColor: '#E2E8CE', color: 'black' }}>Go Train</button>
            </div>
        </Html>}

    </>
}