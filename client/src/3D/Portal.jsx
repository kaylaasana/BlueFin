import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, MeshPortalMaterial, MeshReflectorMaterial, Float } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { geometry } from 'maath'
import { useRef, useState } from 'react'
import { useControls } from 'leva'
import * as THREE from 'three'
extend(geometry)

function Frame({ position, children, bg, text, textPosition = [-0.375, 1, 0.01], rotation = [0, 0, 0], link = '/' }) {
    const [isClicked, setClicked] = useState(false)
    
    const [x, y, z] = position

    const obj = useRef()

    

    const handleClick = (e) => {
        e.stopPropagation()
        // window.location.href = link
        setClicked(true)
        console.log(e)
    }

    

    return (

            <group position={position} rotation={rotation}>
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
                <mesh
                    ref={obj}
                    onPointerEnter={() => { document.body.style.cursor = 'pointer' }}
                    onPointerLeave={() => { document.body.style.cursor = 'default' }}
                    onDoubleClick={handleClick}
                >
                    <roundedPlaneGeometry args={[1.2, 1.61803398875, 0.1]} />
                    <MeshPortalMaterial side={THREE.DoubleSide}>
                        <color attach={'background'} args={[bg]} />
                        {children}
                    </MeshPortalMaterial>
                </mesh>
            </group>
    )
}

export default function Portal() {
    const [isPositioned, setPositioned] = useState(false)
    const floatSpeed = 2
    const floatRotation = 0.05

    useFrame((state, delta) => {
        if(state.camera.position.z > 5 && !isPositioned){
            state.camera.position.z -= delta * 15
        }else{
            setPositioned(true)
        }
    })

    const {lightColor} = useControls('light', {
        lightColor: '#ACBFA4'
    })

    return <>
        <OrbitControls enablePan={false}/>

        <directionalLight color={lightColor}/>

        {/* Left */}
        <Float speed={floatSpeed} rotationIntensity={floatRotation}>
            <Frame position={[-2, 0, 0]} bg={'#E2E8CE'} text={'Login'} rotation={[0, Math.PI * 0.2, 0]}>
                <mesh scale={0.5}>
                    <boxGeometry />
                    <meshNormalMaterial />
                </mesh>
            </Frame>
        </Float>

        {/* Middle */}
        <Float speed={floatSpeed} rotationIntensity={floatRotation}>
            <Frame position={[0, 0, 0]} bg={'#ACBFA4'} text={'Train'}>
                <mesh scale={0.5}>
                    <boxGeometry />
                    <meshNormalMaterial />
                </mesh>
            </Frame>
        </Float>

        {/* Right */}
        <Float speed={floatSpeed} rotationIntensity={floatRotation}>
            <Frame position={[2, 0, 0]} bg={'#7180AC'} text={'Profile'} textPosition={[-0.425, 1, 0.01]} rotation={[0, -Math.PI * 0.2, 0]}>
                <mesh scale={0.5}>
                    <boxGeometry />
                    <meshNormalMaterial />
                </mesh>
            </Frame>
        </Float>

        <mesh
            position-y={-1.4}
            rotation-x={- Math.PI * 0.5}
            scale={10}
            
        >
            <planeGeometry />
            <MeshReflectorMaterial 
                resolution={512} 
                blur={[1000, 1000]} 
                mixBlur={0.5} 
                mirror={0.5}
                color={'white'}
            />
        </mesh>
        
    </>
}