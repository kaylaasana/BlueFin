import { ScrollControls, Scroll, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function Composition() {
    const cube = useRef()
    const scroll = useScroll()
    console.log(scroll);
    useFrame((state, delta) => {
        cube.current.rotation.y += delta * 0.2
        const offset = 6 - (scroll.offset * 10)
        state.camera.position.z = offset
    })
    return <>
        <mesh position-x={- 2}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh ref={cube} position-x={2} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh
            position-y={- 1}
            rotation-x={- Math.PI * 0.5}
            scale={10}
        >
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>
    </>
}


export default function ScrollAnim() {
    
    return <>

        <ScrollControls pages={3}>
            <Composition/>
        </ScrollControls>

    </>
}