/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Dani Satellite (https://sketchfab.com/dani-satellite)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/bluetooth-music-boombox-1f4d347445c8431995355b482f1f1a46
Title: Bluetooth music boombox
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function BoomBox(props) {
    const { nodes, materials } = useGLTF("./models/bluetooth_music_boombox/scene.gltf");
    const speaker = useRef()
    const speaker2 = useRef()

    useFrame((state, delta)=>{
        speaker.current.scale.y = -Math.abs(Math.sin(state.clock.elapsedTime * 5)) * 5
    })
    
    return (
        <group {...props} dispose={null}>
            <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                    name="Material2"
                    castShadow
                    receiveShadow
                    geometry={nodes.Material2.geometry}
                    material={materials.Color_M07}
                />
                <mesh
                    name="Material2_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.Material2_1.geometry}
                    material={materials.Color_M06}
                />
                <mesh
                    name="Material2_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.Material2_2.geometry}
                    material={materials.Color_C05}
                />
                <mesh
                    ref={speaker2}
                    name="Material2_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.Material2_3.geometry}
                    material={materials.Color_M08}
                />
                <mesh
                    ref={speaker}
                    name="Material2_4"
                    castShadow
                    receiveShadow
                    geometry={nodes.Material2_4.geometry}
                    material={materials.Color_M01}
                />
                <mesh
                    name="Material2_5"
                    castShadow
                    receiveShadow
                    geometry={nodes.Material2_5.geometry}
                    material={materials.Color_M00}
                />
            </group>
        </group>
    );
}

useGLTF.preload("./models/bluetooth_music_boombox/scene.gltf");