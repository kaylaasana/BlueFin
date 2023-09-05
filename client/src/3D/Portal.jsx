import { useThree, useFrame } from '@react-three/fiber'
import { 
    OrbitControls, 
    Text, 
    MeshPortalMaterial, 
    MeshReflectorMaterial, 
    Float, 
    Gltf, 
    Environment, 
    CameraControls
} from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { geometry } from 'maath'
import { useRef, useState } from 'react'
import { useControls } from 'leva'
import * as THREE from 'three'

/**
 * Extending the geometry to add
 */
extend(geometry)

/**
 * Setting Frame for portal
 */
function Frame({ 
    position, 
    children, 
    bg, 
    text, 
    textPosition = [-0.375, 1, 0.01], 
    rotation = [0, 0, 0], 
    link='/',
    setOrbit 
}) {
    const [isClicked, setClicked] = useState(false)
    const [positioned , setPositioned] = useState(false)
    const [x, y, z] = position

    const vector = new THREE.Vector3(x, y, z)

    const obj = useRef()
    

    // redirects the user to another page (default to homepage if you don't provide any props)
    const handleClick = (e) => {
        e.stopPropagation()
        // window.location.href = link
        setOrbit(false)
        setClicked(true)
        console.log(e)
    }

    /** 
     * Animating 'Getting into the portal'
     */
    useFrame((state, delta)=>{
        // check if it's clicked
        if(isClicked){
            // check if it's positioned
            if(!positioned){
                state.camera.position.set(0, 0, 5)
                state.camera.lookAt(new THREE.Vector3(x, y, z))
                setPositioned(true)
            }

            // sets fov for lightning effect
            if(state.camera.fov < 147){
                state.camera.fov += delta * 80
                state.camera.updateProjectionMatrix()
            }else {

                // after setting fov, zoom in
                if(state.camera.position.z > -5){
                    state.camera.position.z -= delta * 15
                    state.camera.position.x += delta * (x * 3)
                    console.log(state.camera.position.z);
                }else {
                    // after zooming in enough, redirect the user to different page
                    window.location.href = link
                }
            }
            
        }
    })


    // Returning groups for a portal object 
    return (
        <group position={position} rotation={rotation}>
            {/* Contructing text that hovers on the portal */}
            <Text
                fontSize={0.3}
                anchorY="top"
                anchorX="left"
                lineHeight={0.8}
                position={textPosition}
                material-toneMapped={false}
            >
                {text}
            </Text>

            {/* Portal */}
            <mesh
                ref={obj}
                onPointerEnter={() => { document.body.style.cursor = 'pointer' }}
                onPointerLeave={() => { document.body.style.cursor = 'default' }}
                onClick={handleClick}
            >
                {/* rounded geometry coming from maath package */}
                <roundedPlaneGeometry args={[1.2, 1.61803398875, 0.1]} />
                <MeshPortalMaterial side={THREE.DoubleSide}>
                    <color attach={'background'} args={[bg]} />
                    {/* Passing children that would rendered in the portal */}
                    {children}
                </MeshPortalMaterial>
            </mesh>
        </group>
    )
}

/**
 * Constructing Portal with multiple portals
 */
export default function Portal() {
    const [isPositioned, setPositioned] = useState(false)
    const floatSpeed = 2
    const floatRotation = 0.05
    const [enableOrbit, setOrbit] = useState(true)
    /**
     * Animation at the start
     */
    useFrame((state, delta) => {
        if (state.camera.position.z > 5 && !isPositioned) {
            state.camera.position.z -= delta * 15
        } else {
            setPositioned(true)
            
        }
    })

    /**
     * Debug UI
     */
    const { lightColor } = useControls('light', {
        lightColor: '#7c7571'
    })

    const {middleColor, leftColor, rightColor} = useControls('portalBackground', {
        middleColor: '#E49273',
        leftColor: '#E2E8CE',
        rightColor: '#7180AC',
    })

    return <>
        <OrbitControls enablePan={false} enabled={enableOrbit} />

        <directionalLight color={lightColor} />

        {/* Left */}
        <Float speed={floatSpeed} rotationIntensity={floatRotation}>
            <Frame 
                position={[-2, 0, 0]} 
                bg={leftColor} 
                text={'Login'} 
                rotation={[0, Math.PI * 0.2, 0]}
                setOrbit={setOrbit}
                link='/login'
            >
                <mesh scale={0.5}>
                    <boxGeometry />
                    <meshNormalMaterial />
                </mesh>
            </Frame>
        </Float>

        {/* Middle */}
        <Float speed={floatSpeed} rotationIntensity={floatRotation} >
            <Frame 
                position={[0, 0, 0]} 
                bg={middleColor} 
                text={'Train'} 
                link={'/training'}
                setOrbit={setOrbit}
            >
                <Environment
                    files={'./envMap/blender-2k.hdr'}
                    resolution={16}
                />
                <Gltf src="./models/bluetooth_music_boombox/scene.gltf" scale={0.05} position={[-0.4, -0.25, -1]} rotation-z={Math.PI * 0.1} />
            </Frame>
        </Float>

        {/* Right Profile*/}
        <Float speed={floatSpeed} rotationIntensity={floatRotation}>
            <Frame 
                position={[2, 0, 0]} 
                bg={rightColor} 
                text={'Profile'} 
                textPosition={[-0.425, 1, 0.01]} 
                rotation={[0, -Math.PI * 0.2, 0]}
                setOrbit={setOrbit}
                link={"/profile"}
            >
                <mesh scale={0.3}>
                    <torusGeometry />
                    <meshNormalMaterial />
                </mesh>
            </Frame>
        </Float>

        <mesh
            position-y={-1.4}
            rotation-x={- Math.PI * 0.5}
            scale={15}

        >
            <planeGeometry />
            <MeshReflectorMaterial
                resolution={512}
                blur={[1000, 1000]}
                mixBlur={0.6}
                mirror={0.9}
                color={'white'}
            />
        </mesh>

    </>
}