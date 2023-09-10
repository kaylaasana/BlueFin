import { Html, OrbitControls, CameraControls } from '@react-three/drei'
import { DEG2RAD } from 'three/src/math/MathUtils';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing'


import LoginPart from './LoginPart';
import SignUpPart from './SignUpPart';

function getNormalizedColor(r, g, b, multiplierR = 1, multiplierG = 1, multiplierB = 1){
    const newR = (r / 255) * multiplierR
    const newG = (g / 255) * multiplierG
    const newB = (b / 255) * multiplierB
    return {newR, newG, newB}
}

export default function Auth3D() {
    const [cameraControlEnable, setCameraControl] = useState(false)
    const [colorMultiplier, setColorMultiplier] = useState(1)
    const box = useRef()
    const cameraControl = useRef()
    const {newR, newG, newB} = getNormalizedColor(243, 167, 18, 1, 1, 1)

    useFrame((state, delta)=>{
        box.current.rotation.y += delta
        box.current.rotation.x += delta
        setColorMultiplier(1 + Math.abs(Math.sin(state.clock.elapsedTime) * 2))
    })

    const rotateCamera = async ()=>{
        console.log('rotate now')
        setCameraControl(true)
        await cameraControl.current.rotate(180 * DEG2RAD, 0, true)
    }
    return <>
        <EffectComposer>
            <Bloom
                mipmapBlur
                intensity={ 0.1 }
                luminanceThreshold={ 0 }
            />
        </EffectComposer>
        <CameraControls ref={cameraControl} enabled={cameraControlEnable}/>
        <mesh ref={box}>
            <boxGeometry/>
            <meshBasicMaterial
                color={ [ newR * colorMultiplier, newG * colorMultiplier, newB * colorMultiplier ] }
                toneMapped={ false }
            />
        </mesh>
        <LoginPart occludeObj={ [box] } handleRotate={rotateCamera}/>
        <SignUpPart occludeObj={ [box] } handleRotate={rotateCamera} />
    </>
}