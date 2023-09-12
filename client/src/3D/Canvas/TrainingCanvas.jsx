import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import { Suspense } from 'react'

import Loading from '../Loading'
import TrainingEntrance from '../Training/TrainingEntrance'

export default function TrainingCanvas(){
    return <>
        <Leva collapsed/>
        <Canvas shadows 
            camera={{
                fov: 45,
                near: 0.1,
                far: 1000,
                position: [8.836, 1.306, 6.239],
                rotation: [-0.206, 0.945, 0.168]
            }}
        >
            <Suspense fallback={<Loading/>}>
                <TrainingEntrance/>
            </Suspense>
        </Canvas>
    </>
}