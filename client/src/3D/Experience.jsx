
import { OrbitControls,} from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'

import ScrollAnim from './ScrollAnim'

export default function Experience()
{
    

    return <>

        {/* <OrbitControls makeDefault enableZoom={false} /> */}

        <Perf position={'top-left'}/>

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <ScrollAnim/>

    </>
}