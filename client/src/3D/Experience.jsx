
import { OrbitControls, Environment} from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import {useControls} from 'leva'

import ScrollAnim from './ScrollAnim'

export default function Experience()
{
    const {lightPosition, intensity} = useControls('light', {
        lightPosition: {
            value: {
                x: 1,
                y: 2,
                z: 3
            },
            min: -5,
            max: 5,
            step: 0.1
        },
        intensity: {
            value: 1.5,
            min: 0,
            max: 10,
            step: 0.01
        }
    })

    return <>

        <OrbitControls makeDefault  />

        <Perf position={'top-left'}/>

        <directionalLight position={ [ lightPosition.x, lightPosition.y, lightPosition.z ] } intensity={ intensity } />
        <ambientLight intensity={ 0.5 } />

        <ScrollAnim/>

    </>
}