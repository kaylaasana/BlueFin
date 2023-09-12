import { useTexture } from "@react-three/drei"
import { useControls } from "leva"

export default function RoomEnv(){
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

    const { moonPosition } = useControls('Moon', {
        moonPosition: {
            value: [1, 2, 3],
            min: -10,
            max: 10,
            step: 0.01
        }
    })

    return <>
        <ambientLight intensity={0.05}/>

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