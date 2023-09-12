import { Canvas } from '@react-three/fiber'

import TrainingEntrance from '../Training/TrainingEntrance'

export default function TrainingCanvas(){
    return <>
        <Canvas shadows 
            camera={{
                fov: 45,
                near: 0.1,
                far: 1000,
                position: [8.836, 1.306, 6.239],
                rotation: [-0.206, 0.945, 0.168]
            }}
        >
            <TrainingEntrance/>
        </Canvas>
    </>
}