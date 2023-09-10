import { Html, OrbitControls } from '@react-three/drei'


import LoginPart from './LoginPart';
import SignUpPart from './SignUpPart';

export default function Auth3D() {
    
    return <>
        <OrbitControls />
        <LoginPart/>
        <SignUpPart/>
    </>
}