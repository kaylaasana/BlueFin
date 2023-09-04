import { OrbitControls, Text, MeshPortalMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { geometry } from 'maath'
import * as THREE from 'three'
extend(geometry)

function Frame({ position, children, bg, text, textPosition=[-0.375, 1, 0.01], rotation=[0, 0, 0], link='/'}){

    const handleClick = (e)=>{
        window.location.href = link
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
                { text }
            </Text>
            <mesh 
                onPointerEnter={()=> {document.body.style.cursor = 'pointer'}} 
                onPointerLeave={()=>{document.body.style.cursor='default'}} 
                onClick={handleClick}
            >
                <roundedPlaneGeometry args={[1.2, 1.61803398875, 0.1]} />
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
        <Frame position={[-2, 0, 0]} bg={'red'} text={'Login'} rotation={[0, Math.PI * 0.2, 0]}>
            <mesh scale={0.5}>
                <boxGeometry/>
                <meshNormalMaterial/>
            </mesh>
        </Frame>

        {/* Middle */}
        <Frame position={[0, 0, 0]} bg={'blue'} text={'Train'}>
            <mesh scale={0.5}>
                <boxGeometry/>
                <meshNormalMaterial/>
            </mesh>
        </Frame>

        {/* Right */}
        <Frame position={[2, 0, 0]} bg={'yellow'} text={'Profile'} textPosition={[-0.425, 1, 0.01]} rotation={[0, -Math.PI * 0.2, 0]}>
            <mesh scale={0.5}>
                <boxGeometry/>
                <meshNormalMaterial/>
            </mesh>
        </Frame>
    </>
}