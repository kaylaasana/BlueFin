import { Canvas } from '@react-three/fiber'

import Auth from '../Auth'

export default function AuthCanvas(){
    return <Canvas camera={ { fov: 45, far: 200, near: 0.1 } }>
        <Auth/>
    </Canvas>
}