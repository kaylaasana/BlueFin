
import { Environment } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useControls } from 'leva'

import ScrollAnim from './ScrollAnim'

/**
 * Setting 3D environment
 */
export default function Experience()
{
    const {displayPerform} = useControls('Perf', {
        displayPerform: true
    })

    return <>

        {/* Setting environment map */}
        <Environment
            files={'./envMap/blender-2k.hdr'}
            resolution={216}
        />

        {/* Displaying performance pannel */}

        { displayPerform && <Perf position={'bottom-right'}/>}

        <ScrollAnim/>

    </>
}