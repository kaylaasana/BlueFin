import { OrbitControls, Text, MeshPortalMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { geometry } from 'maath'
import * as THREE from 'three'
extend(geometry)
function Frame({ position, children, bg, text, textPosition=[-0.375, 1, 0.01] }){
    return (
        <group position={position}>
            <Text fontSize={0.3} anchorY="top" anchorX="left" lineHeight={0.8} position={textPosition} material-toneMapped={false}>
                { text }
            </Text>
            <mesh>
                <roundedPlaneGeometry args={[1, 1.61803398875, 0.1]} />
                <MeshPortalMaterial side={THREE.DoubleSide}>
                    <color attach={'background'} args={ [bg] }/>
                    {children}
                </MeshPortalMaterial>
            </mesh>
        </group>
    )
}

export default function Portal(){
    return <>
        <OrbitControls/>

        {/* Left */}
        <Frame position={[-2, 0, 0]} bg={'red'} text={'Login'}>
            <mesh scale={0.5}>
                <boxGeometry/>
                <meshNormalMaterial/>
            </mesh>
        </Frame>

        {/* Middle */}
        <Frame position={[0, 0, 0]} bg={'red'} text={'Train'}>
            <mesh scale={0.5}>
                <boxGeometry/>
                <meshNormalMaterial/>
            </mesh>
        </Frame>

        {/* Right */}
        <Frame position={[2, 0, 0]} bg={'red'} text={'Profile'} textPosition={[-0.425, 1, 0.01]}>
            <mesh scale={0.5}>
                <boxGeometry/>
                <meshNormalMaterial/>
            </mesh>
        </Frame>
    </>
}