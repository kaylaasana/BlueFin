import { ScrollControls, Scroll, useScroll, useGLTF, } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function Composition() {
    
    const scroll = useScroll()
    const mic = useGLTF('./models/microphone.glb')
    console.log(mic);

    useFrame((state, delta) => {
        // const offset = 10 - (scroll.offset * 10)
        // state.camera.position.z = offset
    })
    return <>

        <mesh
            position-y={- 1}
            rotation-x={- Math.PI * 0.5}
            scale={10}
        >
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <primitive object={mic.scene} position-y={-1} />
    </>
}


export default function ScrollAnim() {
    
    return <>

        <ScrollControls pages={3}>
            <Composition/>
        </ScrollControls>

    </>
}