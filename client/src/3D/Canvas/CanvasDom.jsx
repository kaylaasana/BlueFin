import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

import Experience from '../Home/Experience'
import Loading from '../Loading'

/**
 * Setting canvas
 */
export default function CanvasDom(){
    return <Canvas
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 3, 0, 6 ]
        } }
    >
        <Suspense fallback={<Loading/>}>
            <Experience/>
        </Suspense>
    </Canvas>
}