import { ScrollControls, Scroll, useScroll, useGLTF, MeshReflectorMaterial, Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { useControls } from 'leva'
import * as THREE from 'three'

/**
 * Sub component for scroll animation
 */
function Composition({clicked}) {
    
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
        if(clicked){
            state.camera.position.x -= delta * 3
            state.camera.position.z -= delta * 3
            if(state.camera.position.z < -0.75){
                window.location.assign('/portal')
            }

        }else {
            // offset calculated from scroll
            const offset = 10 - (scroll.offset * 5)
            state.camera.position.z = offset
    
            // making camera lookat certain position
            state.camera.lookAt(new THREE.Vector3(-3, 0.5, 0))
    
            // animating mic
            micObj.current.rotation.y = offset + 1
        }

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

    const [clicked, setClicked] = useState(false)

    // debug panel
    const {textColor} = useControls('text', {
        textColor: '#eeb868'
    })
    
    return <>

        {/* Putting Scroll components inside scroll controls */}
        <ScrollControls pages={3} damping={0.1}>
            <Composition clicked={clicked}/>
            <Scroll html>
                { !clicked &&
                    <>
                        <div className="intro-container" style={ { left: '5vw' } }>
                            <h1 className="intro mx-3" style={{ top: '30vh', color: textColor }}>Welcome</h1>
                            <img className="logo-img" src="./logo-no-background.png" alt="logo" style={ {top: '46vh', width: '23vw', position: 'absolute'} } />
                            <h1 className="intro mx-3" style={{ top: '140vh', color: textColor, width: '40vw' }}>Start your musical journey</h1>
                            <h1 className="intro mx-3" style={{ top: '240vh', color: textColor}}>Ready?</h1>
                            <button className="px-4 mx-3 go-btn" style={{ top: '255vh'}} onClick={()=> setClicked(true)} >Play</button>
                        </div>
                    </>
                }
            </Scroll>
        </ScrollControls>


    </>
}