import { Canvas } from '@react-three/fiber'

import TrainingEntrance from '../Training/TrainingEntrance'

export default function TrainingCanvas(){
    return <>
        <Canvas shadows>
            <TrainingEntrance/>
        </Canvas>
    </>
}