import { ScrollControls, Scroll, useScroll, useGLTF, MeshReflectorMaterial, Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useControls } from 'leva'
import * as THREE from 'three'

/**
 * Sub component for scroll animation
 */
function Composition() {
    
    // useScroll method returns variety of values related with scroll such as offset, range etc
    const scroll = useScroll()

    // Loading Models
    const mic = useGLTF('./models/microphone.glb')

    // Using reference for later to use in animation
    const micObj = useRef()

    // Debug pannel
    const {color} = useControls('reflection', {
        color: '#ffffff'
    })

    

    // For animating the scene
    useFrame((state, delta) => {

        // offset calculated from scroll
        const offset = 10 - (scroll.offset * 5)
        state.camera.position.z = offset

        // making camera lookat certain position
        state.camera.lookAt(new THREE.Vector3(-3, 0.5, 0))

        // animating mic
        micObj.current.rotation.y = offset + 1
    })

    return <>

        {/* Creating a mesh for reflection on floor */}
        <mesh
            position-y={- 1}
            rotation-x={- Math.PI * 0.5}
            scale={16}
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

        {/* Primitive for the model */}
        <primitive ref={micObj} object={mic.scene} position-y={-1} />

        {/* adding sparkles to the scene around the mic */}
        <Sparkles
            position-y={2}
            size={2}
            scale={ [10, 4, 10] }
            count={40}
        />
    </>
}

/**
 * Constructing Scroll animation
 */
export default function ScrollAnim() {

    // debug panel
    const {textColor} = useControls('text', {
        textColor: '#912F40'
    })
    
    return <>

        {/* Putting Scroll components inside scroll controls */}
        <ScrollControls pages={3} damping={0.1}>
            <Composition/>
            <Scroll html>
                <h1 className="intro mx-3" style={{ top: '30vh', color: textColor }} >Welcome</h1>
                <h1 className="intro mx-3" style={{ top: '140vh', color: textColor }}>To This</h1>
                <h1 className="intro mx-3" style={{ top: '240vh', color: textColor }}>Ready?</h1>
                <button className="intro p-2 mx-3 go-btn" style={{ top: '250vh', color: textColor }}>GO!</button>
            </Scroll>
        </ScrollControls>


    </>
}