import { Canvas } from '@react-three/fiber'

/**
 * Setting canvas
 */
export default function CanvasDom(){
    <Canvas
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ - 4, 3, 6 ]
        } }
    >

    </Canvas>
}