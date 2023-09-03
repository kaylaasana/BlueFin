import { Canvas } from '@react-three/fiber'
import { Route, Routes } from 'react-router-dom'

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
            position: [ - 4, 3, 6 ]
        } }
    >
        <Experience/>
    </Canvas>
}