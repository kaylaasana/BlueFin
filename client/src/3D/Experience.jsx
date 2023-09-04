
import { OrbitControls, Environment} from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import {useControls} from 'leva'

import ScrollAnim from './ScrollAnim'

export default function Experience()
{
    const {displayPerform} = useControls('Perf', {
        displayPerform: true
    })

    return <>

        <Environment
            files={'./envMap/blender-2k.hdr'}
            resolution={216}
        />

        {/* <OrbitControls makeDefault  /> */}

        { displayPerform && <Perf position={'bottom-right'}/>}

        {/* <directionalLight position={ [ lightPosition.x, lightPosition.y, lightPosition.z ] } intensity={ intensity } />
        <ambientLight intensity={ 0.5 } /> */}

        <ScrollAnim/>

    </>
}