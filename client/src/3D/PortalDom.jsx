import { Canvas } from '@react-three/fiber'


import Portal from './Portal'

/**
 * Setting canvas
 */
export default function PortalDom(){
    return <Canvas
        camera={ {
            fov: 45,
            near: 0.1,
            far: 30,
            position: [0, 0, 35]
        } }
    >
        <Portal/>
    </Canvas>
}