import { useTexture, useHelper, SoftShadows, BakeShadows, Text3D, Center } from "@react-three/drei"
import { useControls } from "leva"
import { useRef } from "react"
import { useThree } from "@react-three/fiber"
import * as THREE from 'three'

export default function RoomEnv(){
    const dirLight = useRef()
    const {camera, gl} = useThree()


    const textures = useTexture({
        metalnessMap: '/textures/ceiling/beige_wall_001_arm_1k.jpg',
        map: '/textures/ceiling/beige_wall_001_diff_1k.jpg',
        normalMap: '/textures/ceiling/beige_wall_001_nor_gl_1k.jpg',
    })

    const {ceilingColor} = useControls('room', {
        ceilingColor: {
            value: '#000000'
        }
    })

    const { moonPosition, moonColor } = useControls('Moon', {
        moonPosition: {
            value: [-0.24, 0, 0],
            min: -10,
            max: 10,
            step: 0.01
        },

        moonColor: {
            value: '#151939'
        }
    })

    const { textColor } = useControls('font', {
        textColor: {
            value: '#03e9f4'
        }
    })

    const getCamPos = ()=>{
        console.log(camera)
    }

    return <>
        <ambientLight intensity={0.03}/>
        <directionalLight 
            ref={dirLight} 
            castShadow 
            position={moonPosition} 
            color={moonColor}
            shadow-mapSize={ [1024, 1024] } 
            shadow-camera-near={ 1 }
            shadow-camera-far={ 50 }
        />
        <SoftShadows
            frustum={3.75} 
            size={50} 
            near={9.5} 
            samples={17} 
            rings={11}
        />
        <BakeShadows/>

        {/* <mesh position={[-3, 1, -2]} onClick={getCamPos}>
            <boxGeometry/>
            <meshNormalMaterial/>
        </mesh> */}

        {/* Floor */}
        <mesh position={[0, -5, 0]} rotation-x={ -Math.PI / 2} scale={4.5}>
            <planeGeometry args={[5, 5]}/>
            <meshBasicMaterial/>
        </mesh>

        <mesh position={[-10, -5, 0]} rotation-y={ Math.PI / 2 } scale={[4.5, 1.4, 1]}>
            <planeGeometry args={[5, 5]}/>
            <meshBasicMaterial/>
        </mesh>

        <mesh position={[0.5, 2, -10]} scale={[4.5, 2, 1]}>
            <planeGeometry args={[5, 5]}/>
            <meshBasicMaterial/>
        </mesh>

        {/* Roof */}
        <mesh position={[0, 6.5, 0]} rotation-x={Math.PI / 2} scale={[20, 35, 1]}>
            <planeGeometry/>
            <meshStandardMaterial {...textures} color={ceilingColor}/>
        </mesh>
    </>
}