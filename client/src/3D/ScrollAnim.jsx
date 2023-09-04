import { ScrollControls, Scroll, useScroll, useGLTF, MeshReflectorMaterial, Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useControls } from 'leva'
import * as THREE from 'three'

function Composition() {
    
    const scroll = useScroll()
    const mic = useGLTF('./models/microphone.glb')
    const micObj = useRef()

    const {color} = useControls('reflection', {
        color: '#ffffff'
    })

    useFrame((state, delta) => {
        const {elapsedTime} = state.clock
        const offset = 10 - (scroll.offset * 5)
        state.camera.position.z = offset
        state.camera.lookAt(new THREE.Vector3(-3, 0.5, 0))
        micObj.current.rotation.y = offset + 1
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

        <primitive ref={micObj} object={mic.scene} position-y={-1} />
        <Sparkles
            position-y={2}
            size={2}
            scale={ [10, 4, 10] }
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