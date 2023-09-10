import { Html, OrbitControls, CameraControls } from '@react-three/drei'
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
    
    return <>
        {/* <OrbitControls /> */}
        <CameraControls ref={cameraControl} enabled={cameraControlEnable}/>
        <mesh ref={box}>
            <boxGeometry/>
            <meshNormalMaterial/>
        </mesh>
        <LoginPart occludeObj={ [box] } setCameraControl={setCameraControl} cameraControl={cameraControl}/>
        <SignUpPart occludeObj={ [box] } setCameraControl={setCameraControl} cameraControl={cameraControl}/>
    </>
}