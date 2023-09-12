import { OrbitControls, Stars } from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'

import MusicStudio from './MusicStudio'
import RoomEnv from './RoomEnv'

export default function TrainingEntrance(){


    const { skyColor } = useControls('skyColor', {
        skyColor: {
            value: '#010209'
        }
    })

    

    return <>
        <Perf position={'bottom-right'}/>
        <OrbitControls/>
        <RoomEnv/>

        <color args={[skyColor]} attach={'background'}/>

        <Stars radius={300} count={2000}/>
        <MusicStudio position={[9, -3, 0]}/>
    </>
}