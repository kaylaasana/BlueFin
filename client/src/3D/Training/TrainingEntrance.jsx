import { OrbitControls, Stars } from '@react-three/drei'
import { useControls } from 'leva'

import MusicStudio from './MusicStudio'
import RoomEnv from './RoomEnv'

export default function TrainingEntrance(){


    const { skyColor } = useControls('skyColor', {
        skyColor: {
            value: '#010209'
        }
    })

    

    return <>
        <OrbitControls/>
        <RoomEnv/>

        <color args={[skyColor]} attach={'background'}/>

        <Stars radius={300} count={2000}/>
        <MusicStudio position={[9, -3, 0]}/>
    </>
}