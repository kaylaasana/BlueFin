import { Canvas } from '@react-three/fiber'

import Auth from '../Auth/Auth'

export default function AuthCanvas(){
    return<>
    <Canvas camera={ { fov: 45, far: 200, near: 0.1, position: [0, 0, 11] } }>
        <Auth/>
    </Canvas>
    </> 
}