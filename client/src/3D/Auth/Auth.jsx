import { Html, OrbitControls, CameraControls } from '@react-three/drei'
import { DEG2RAD } from 'three/src/math/MathUtils';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';


import LoginPart from './LoginPart';
import SignUpPart from './SignUpPart';

export default function Auth3D() {
    const [cameraControlEnable, setCameraControl] = useState(false)
    const box = useRef()
    const cameraControl = useRef()

    useFrame((state, delta)=>{
        box.current.rotation.y += delta
        box.current.rotation.x += delta
    })

    const rotateCamera = ()=>{
        console.log('rotate now')
        setCameraControl(true)
        cameraControl.current.rotate(180 * DEG2RAD, 0, true)
        // setCameraControl(false)
      }
    return <>
        {/* <OrbitControls /> */}
        <CameraControls ref={cameraControl} enabled={cameraControlEnable}/>
        <mesh ref={box}>
            <boxGeometry/>
            <meshNormalMaterial/>
        </mesh>
        <LoginPart occludeObj={ [box] } handleRotate={rotateCamera}/>
        <SignUpPart occludeObj={ [box] } handleRotate={rotateCamera} />
    </>
}