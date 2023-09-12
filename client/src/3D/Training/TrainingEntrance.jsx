import { OrbitControls, Stars, useTexture } from '@react-three/drei'
import { useControls } from 'leva'

import MusicStudio from './MusicStudio'

export default function TrainingEntrance(){
    const textures = useTexture({
        metalnessMap: '/textures/ceiling/beige_wall_001_arm_1k.jpg',
        map: '/textures/ceiling/beige_wall_001_diff_1k.jpg',
        normalMap: '/textures/ceiling/beige_wall_001_nor_gl_1k.jpg',
    })

    const { moonPosition } = useControls('Moon', {
        moonPosition: {
            value: [1, 2, 3],
            min: -10,
            max: 10,
            step: 0.01
        }
    })

    const { skyColor } = useControls('skyColor', {
        skyColor: {
            value: '#010209'
        }
    })

    const {ceilingColor} = useControls('room', {
        ceilingColor: {
            value: '#000000'
        }
    })
    

    return <>
        <OrbitControls/>
        <ambientLight intensity={0.1}/>
        <color args={[skyColor]} attach={'background'}/>
        <Stars radius={300} count={2000}/>
        <MusicStudio position={[9, -3, 0]}/>

        {/* Floor */}
        <mesh position={[0, -5, 0]} rotation-x={ -Math.PI / 2} scale={4.5}>
            <planeGeometry args={[5, 5]}/>
            <meshBasicMaterial/>
        </mesh>

        <mesh position={[-10, -5, 0]} rotation-y={ Math.PI / 2 } scale={[4.5, 1.4, 1]}>
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