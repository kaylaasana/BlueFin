import { Canvas } from '@react-three/fiber'

import Experience from './Experience'

/**
 * Setting canvas
 */
export default function CanvasDom(){
    return <Canvas
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 0, 0, 6 ]
        } }
    >
        <Experience/>
    </Canvas>
}