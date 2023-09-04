import { ScrollControls, Scroll, useScroll, useGLTF, MeshReflectorMaterial, Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useControls } from 'leva'

function Composition() {
    
    const scroll = useScroll()
    const mic = useGLTF('./models/microphone.glb')
    console.log(mic);

    const {color} = useControls('reflection', {
        color: '#ffffff'
    })

    useFrame((state, delta) => {
        // const offset = 10 - (scroll.offset * 10)
        // state.camera.position.z = offset
    })
    return <>

        <mesh
            position-y={- 1}
            rotation-x={- Math.PI * 0.5}
            scale={20}
        >
            <planeGeometry />
            <MeshReflectorMaterial 
                resolution={512} 
                blur={[1000, 1000]} 
                mixBlur={0.5} 
                mirror={1}
                color={color}
            />
        </mesh>

        <primitive object={mic.scene} position-y={-1} />
        <Sparkles
            position-y={2}
            size={2}
            scale={ [10, 2, 10] }
            count={40}
        />
    </>
}


export default function ScrollAnim() {
    
    return <>

        <ScrollControls pages={3}>
            <Composition/>
        </ScrollControls>

    </>
}