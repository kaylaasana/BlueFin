
import { Environment, SpotLight } from '@react-three/drei'
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

    const {lightPosition} = useControls('light', {
        lightPosition: {
            value:{
                x: 1,
                y: 5,
                z: 1
            },
            min: 0,
            max: 5,
            step: 0.1
        }
    })

    return <>

        {/* Setting environment map */}
        <Environment
            files={'./envMap/blender-2k.hdr'}
            resolution={216}
        />
        <SpotLight position={[lightPosition.x, lightPosition.y, lightPosition.z]} distance={5}/>
        {/* Displaying performance pannel */}

        { displayPerform && <Perf position={'bottom-right'}/>}

        <ScrollAnim/>

    </>
}