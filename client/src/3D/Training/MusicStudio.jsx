/*
Author: Creap (https://sketchfab.com/ccreap21)
License: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
Source: https://sketchfab.com/3d-models/music-studio-at-home-d4bcb0a0536f49929694768ba5a1d771
Title: Music Studio at Home
*/

import { useRef } from "react";
import { useGLTF, Text3D, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function MusicStudio(props) {
  const { nodes, materials } = useGLTF('/models/music_studio_at_home/scene.gltf');
  const screenLight = useRef()
  const lampLight = useRef()

  useFrame((state, delta)=>{
    screenLight.current.intensity = 0.4 + Math.abs(Math.sin(state.clock.elapsedTime))
    lampLight.current.intensity = Math.abs(Math.sin(state.clock.elapsedTime) / 10)
  })

  return (
    <group {...props} dispose={null}>
      <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
        <group name="Room" position={[-6.762, -6, 0]}>
          <group
            name="Room-4"
            position={[6, -6, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.1}
          >
            <mesh
              name="Room-4_0"
              castShadow
              receiveShadow
              geometry={nodes["Room-4_0"].geometry}
              material={materials["palette.008"]}
            />
            <mesh
              name="Room-4_1"
              castShadow
              receiveShadow
              geometry={nodes["Room-4_1"].geometry}
              material={materials["palette.004"]}
            />
          </group>
          <mesh
            name="SecondWall001_0"
            castShadow
            receiveShadow
            geometry={nodes.SecondWall001_0.geometry}
            material={materials["palette.033"]}
            position={[7.043, -6.006, 4.786]}
            rotation={[Math.PI / 2, -Math.PI / 2, 0]}
            scale={0.1}
          />
          <mesh
            name="SecondWall000_0"
            castShadow
            receiveShadow
            geometry={nodes.SecondWall000_0.geometry}
            material={materials["palette.033"]}
            position={[7.043, 5.994, 4.786]}
            rotation={[Math.PI / 2, -Math.PI / 2, 0]}
            scale={0.1}
          />
          <mesh
            name="Room32_0"
            castShadow
            receiveShadow
            geometry={nodes.Room32_0.geometry}
            material={materials["palette.018"]}
            position={[-6, -6, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.1}
          />
          <mesh
            name="SecondWall003_0"
            castShadow
            receiveShadow
            geometry={nodes.SecondWall003_0.geometry}
            material={materials["palette.033"]}
            position={[6.033, -11.852, 4.786]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={0.1}
          />
          <mesh
            name="SecondWall002_0"
            castShadow
            receiveShadow
            geometry={nodes.SecondWall002_0.geometry}
            material={materials["palette.033"]}
            position={[-5.967, -11.852, 4.786]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={0.1}
          />
          <mesh
            name="Room-1_0"
            castShadow
            receiveShadow
            geometry={nodes["Room-1_0"].geometry}
            material={materials["palette.003"]}
            position={[-6, 6, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.1}
          />
        </group>
        <group
          name="BigPlant001"
          position={[-16.388, 4.388, 1.134]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.088}
        >
          <mesh
            name="BigPlant001_0"
            castShadow
            receiveShadow
            geometry={nodes.BigPlant001_0.geometry}
            material={materials["palette.024"]}
          />
          <mesh
            name="Plant_02T_0"
            castShadow
            receiveShadow
            geometry={nodes.Plant_02T_0.geometry}
            material={materials.SM_Plant_02T_material}
            position={[2.152, 15.308, 2.746]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.897}
          />
        </group>
        <mesh
          name="Hotel_0"
          castShadow
          receiveShadow
          geometry={nodes.Hotel_0.geometry}
          material={materials["palette.005"]}
          position={[-22.446, 4.332, -4.407]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          scale={0.135}
        />
        <mesh
          name="Piano_0"
          castShadow
          receiveShadow
          geometry={nodes.Piano_0.geometry}
          material={materials["palette.002"]}
          position={[-9.121, 4.026, 2.962]}
          rotation={[Math.PI / 2, 0.026, 0]}
          scale={0.025}
        />
        <mesh
          name="Screen_0"
          castShadow
          receiveShadow
          geometry={nodes.Screen_0.geometry}
          material={materials.Screen}
          position={[-8.817, 5.337, 3.326]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.025}
        />
        <pointLight ref={screenLight} name="screenLight" castShadow shadow-normalBias={0.04} position={[-8.817, 5.337, 3.326]} intensity={1.01} color={'green'}/>
        <mesh
          name="Sofa_0"
          castShadow
          receiveShadow
          geometry={nodes.Sofa_0.geometry}
          material={materials["palette.009"]}
          position={[-7.379, -11.168, 0.198]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.1}
        />
        <mesh
          name="Venils001_0"
          castShadow
          receiveShadow
          geometry={nodes.Venils001_0.geometry}
          material={materials["palette.012"]}
          position={[-18.472, -8.338, 6.313]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          scale={0.1}
        />
        <mesh
          name="Venils000_0"
          castShadow
          receiveShadow
          geometry={nodes.Venils000_0.geometry}
          material={materials["palette.012"]}
          position={[-18.472, -6.909, 6.313]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          scale={0.1}
        />
        <mesh
          name="Venils004_0"
          castShadow
          receiveShadow
          geometry={nodes.Venils004_0.geometry}
          material={materials["palette.012"]}
          position={[-18.472, -9.82, 6.313]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          scale={0.1}
        />
        <mesh
          name="Venils_double001_0"
          castShadow
          receiveShadow
          geometry={nodes.Venils_double001_0.geometry}
          material={materials["palette.014"]}
          position={[-17.199, 5.504, 6.128]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.1}
        />
        <Center position={[-8.996, 5.455, 6.686]} rotation={[Math.PI / 2, 0, 0]}>
            <Text3D 
                font={'/3d-fonts/Autumn.json'}
                size={0.75}
                height={0.2}
                curveSegments={15}
                material-color={'#03e9f4'}
            >
                BLUEFIN
                
            </Text3D>
        </Center>
        <mesh
          name="TeaTable_0"
          castShadow
          receiveShadow
          geometry={nodes.TeaTable_0.geometry}
          material={materials["palette.016"]}
          position={[-7.425, -7.195, 0.078]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.1}
        />
        <mesh
          name="Carpet_0"
          castShadow
          receiveShadow
          geometry={nodes.Carpet_0.geometry}
          material={materials["palette.017"]}
          position={[-7.332, -8.755, 0.087]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={0.121}
        />
        <mesh
          name="Pictures_0"
          castShadow
          receiveShadow
          geometry={nodes.Pictures_0.geometry}
          material={materials["palette.019"]}
          position={[-18.463, -13.095, 6.615]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          scale={0.1}
        />
        <mesh
          name="Phone_0"
          castShadow
          receiveShadow
          geometry={nodes.Phone_0.geometry}
          material={materials["Phone.001"]}
          position={[-6.636, 3.92, 2.955]}
          rotation={[Math.PI / 2, 0.335, 0]}
          scale={0.006}
        />
        <mesh
          name="AIK_0"
          castShadow
          receiveShadow
          geometry={nodes.AIK_0.geometry}
          material={materials["palette.021"]}
          position={[-11.457, 3.95, 2.758]}
          rotation={[Math.PI / 2, 0.274, 0]}
          scale={0.015}
        />
        <mesh
          name="Mouse_0"
          castShadow
          receiveShadow
          geometry={nodes.Mouse_0.geometry}
          material={materials["palette.022"]}
          position={[-7.105, 4.379, 2.955]}
          rotation={[Math.PI / 2, 0.271, 0]}
          scale={0.03}
        />
        <mesh
          name="Keyboard_0"
          castShadow
          receiveShadow
          geometry={nodes.Keyboard_0.geometry}
          material={materials["palette.023"]}
          position={[-10.037, 5.06, 3.33]}
          rotation={[Math.PI / 2, 0.098, 0]}
          scale={0.03}
        />
        <mesh
          name="BigPlant_0"
          castShadow
          receiveShadow
          geometry={nodes.BigPlant_0.geometry}
          material={materials["palette.024"]}
          position={[-0.835, 4.546, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.088}
        />
        <mesh
          name="Plintus_0"
          castShadow
          receiveShadow
          geometry={nodes.Plintus_0.geometry}
          material={materials["palette.028"]}
          position={[-1.312, 5.741, 0.308]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.1}
        />
        <mesh
          name="Plintus001_0"
          castShadow
          receiveShadow
          geometry={nodes.Plintus001_0.geometry}
          material={materials["palette.028"]}
          position={[-18.536, -0.55, 0.308]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          scale={0.1}
        />
        <mesh
          name="Speaker_Black001_0"
          castShadow
          receiveShadow
          geometry={nodes.Speaker_Black001_0.geometry}
          material={materials["palette.006"]}
          position={[-13.926, 4.824, 3.884]}
          rotation={[Math.PI / 2, 0.341, 0]}
          scale={0.02}
        />
        <mesh
          name="Ashtray_0"
          castShadow
          receiveShadow
          geometry={nodes.Ashtray_0.geometry}
          material={materials.palette}
          position={[-7.263, -7.407, 1.478]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.1}
        />
        <mesh
          name="Speaker_Black000_0"
          castShadow
          receiveShadow
          geometry={nodes.Speaker_Black000_0.geometry}
          material={materials["palette.006"]}
          position={[-3.936, 5.033, 3.673]}
          rotation={[Math.PI / 2, -0.394, 0]}
          scale={0.02}
        />
        <mesh
          name="BigSpeaker_0"
          castShadow
          receiveShadow
          geometry={nodes.BigSpeaker_0.geometry}
          material={materials["palette.007"]}
          position={[-17.111, -10.502, 1.542]}
          rotation={[Math.PI / 2, 1.542, 0]}
          scale={0.046}
        />
        <mesh
          name="Guitar_0"
          castShadow
          receiveShadow
          geometry={nodes.Guitar_0.geometry}
          material={materials["palette.011"]}
          position={[-18.353, -5.712, 2.892]}
          rotation={[3.046, 0.198, -1.117]}
          scale={0.055}
        />
        <mesh
          name="Guitar2001_0"
          castShadow
          receiveShadow
          geometry={nodes.Guitar2001_0.geometry}
          material={materials["palette.020"]}
          position={[-18.166, -7.553, 1.793]}
          rotation={[-Math.PI, 0.195, -Math.PI / 2]}
          scale={0.067}
        />
        <mesh
          name="Gaming_PC_on_Desktop_0"
          castShadow
          receiveShadow
          geometry={nodes.Gaming_PC_on_Desktop_0.geometry}
          material={materials["palette.010"]}
          position={[-14.057, 4.322, 0.419]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[-0.038, 0.038, 0.038]}
        />
        <mesh
          name="Plintus002_0"
          castShadow
          receiveShadow
          geometry={nodes.Plintus002_0.geometry}
          material={materials["palette.028"]}
          position={[-13.31, 5.741, 0.308]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.1}
        />
        <mesh
          name="turntable_0"
          castShadow
          receiveShadow
          geometry={nodes.turntable_0.geometry}
          material={materials["palette.025"]}
          position={[-17.739, -10.01, 3.162]}
          rotation={[Math.PI / 2, 1.367, 0]}
          scale={0.03}
        />
        <mesh
          name="Coffee_0"
          castShadow
          receiveShadow
          geometry={nodes.Coffee_0.geometry}
          material={materials["palette.026"]}
          position={[-4.792, -7.906, 1.478]}
          rotation={[-Math.PI / 2, -0.042, -Math.PI]}
          scale={0.03}
        />
        <mesh
          name="Mini_table_0"
          castShadow
          receiveShadow
          geometry={nodes.Mini_table_0.geometry}
          material={materials["palette.027"]}
          position={[-1.676, -11.311, 0.067]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.151}
        />
        <mesh
          name="Chair_0"
          castShadow
          receiveShadow
          geometry={nodes.Chair_0.geometry}
          material={materials["palette.029"]}
          position={[-1.426, -7.212, 0]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          scale={0.076}
        />
        <mesh
          name="SWall_0"
          castShadow
          receiveShadow
          geometry={nodes.SWall_0.geometry}
          material={materials["palette.030"]}
          position={[-9.134, 5.613, 2.548]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={[0.127, 0.06, 0.06]}
        />
        <mesh
          name="Desk_2001_0"
          castShadow
          receiveShadow
          geometry={nodes.Desk_2001_0.geometry}
          material={materials["palette.035"]}
          position={[-9.106, 4.393, 1.403]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.075}
        />
        <mesh
          name="Screen2001_0"
          castShadow
          receiveShadow
          geometry={nodes.Screen2001_0.geometry}
          material={materials["palette.038"]}
          position={[-11.344, 5.386, 4.364]}
          rotation={[-Math.PI / 2, -0.198, Math.PI]}
          scale={[0.028, 0.029, 0.028]}
        />
        <mesh
          name="MalaTumba002_0"
          castShadow
          receiveShadow
          geometry={nodes.MalaTumba002_0.geometry}
          material={materials["palette.042"]}
          position={[-13.61, 4.507, 1.071]}
          rotation={[Math.PI / 2, 0.058, 0]}
          scale={[0.056, 0.056, 0.076]}
        />
        <mesh
          name="Ghostbusters_Building_0"
          castShadow
          receiveShadow
          geometry={nodes.Ghostbusters_Building_0.geometry}
          material={materials["palette.043"]}
          position={[-31.716, 15.019, -3.425]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          scale={0.1}
        />
        <mesh
          name="Cube001_0"
          castShadow
          receiveShadow
          geometry={nodes.Cube001_0.geometry}
          material={materials.Ground}
          position={[-16.977, 6.117, -4.294]}
          scale={[18.28, 26.749, 1]}
        />
        <mesh
          name="JakasKorobka_0"
          castShadow
          receiveShadow
          geometry={nodes.JakasKorobka_0.geometry}
          material={materials["palette.013"]}
          position={[-13.584, 4.597, 3.266]}
          rotation={[Math.PI / 2, 0.26, 0]}
          scale={0.025}
        />
        <mesh
          name="PC_Chair001_0"
          castShadow
          receiveShadow
          geometry={nodes.PC_Chair001_0.geometry}
          material={materials["palette.045"]}
          position={[-7.257, 2.52, 2.311]}
          rotation={[-Math.PI / 2, 0.759, -Math.PI]}
          scale={0.1}
        />
        <mesh
          name="LavaLamp_0"
          castShadow
          receiveShadow
          geometry={nodes.LavaLamp_0.geometry}
          material={materials["palette.046"]}
          position={[-5.262, 4.804, 4.26]}
          rotation={[Math.PI / 2, -1.532, 0]}
          scale={[0.04, 0.049, 0.04]}
        />
        <pointLight ref={lampLight} name="lampLight" castShadow shadow-normalBias={0.04} position={[-5.262, 4.804, 4.26]} color={'orange'} intensity={0.08}/>
        <mesh
          name="LavaLamp001_0"
          castShadow
          receiveShadow
          geometry={nodes.LavaLamp001_0.geometry}
          material={materials["palette.046"]}
          position={[-5.262, 4.81, 5.043]}
          rotation={[Math.PI / 2, -1.532, 0]}
          scale={[0.04, 0.049, 0.04]}
        />
        <mesh
          name="Cone_0"
          castShadow
          receiveShadow
          geometry={nodes.Cone_0.geometry}
          material={materials.LavaGlass}
          position={[-5.26, 4.81, 4.399]}
          scale={[0.267, 0.267, 0.329]}
        />
        <mesh
          name="Headphones_0"
          castShadow
          receiveShadow
          geometry={nodes.Headphones_0.geometry}
          material={materials["palette.047"]}
          position={[-13.04, 4.692, 4.127]}
          rotation={[1.584, 0.21, 0.647]}
          scale={0.046}
        />
        <mesh
          name="Cube002_0"
          castShadow
          receiveShadow
          geometry={nodes.Cube002_0.geometry}
          material={materials.LavaGlass}
          position={[-13.583, 4.48, 1.447]}
          scale={[0.012, 0.967, 1]}
        />
        <mesh
          name="Coke_0"
          castShadow
          receiveShadow
          geometry={nodes.Coke_0.geometry}
          material={materials["Material.001"]}
          position={[-5.73, 5.177, 4.247]}
          rotation={[-Math.PI / 2, 1.206, -Math.PI]}
          scale={0.088}
        />
        <mesh
          name="Water_0"
          castShadow
          receiveShadow
          geometry={nodes.Water_0.geometry}
          material={materials["Material.001"]}
          position={[-10.014, -6.397, 2.136]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.1}
        />
        <mesh
          name="Mini_lamp_0"
          castShadow
          receiveShadow
          geometry={nodes.Mini_lamp_0.geometry}
          material={materials["palette.048"]}
          position={[-0.876, -11.909, 1.879]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.043}
        />
        <mesh
          name="Papers_0"
          castShadow
          receiveShadow
          geometry={nodes.Papers_0.geometry}
          material={materials["palette.049"]}
          position={[-6.517, 5.003, 3.367]}
          rotation={[Math.PI / 2, -0.264, 0]}
          scale={0.06}
        />
        <mesh
          name="Papers001_0"
          castShadow
          receiveShadow
          geometry={nodes.Papers001_0.geometry}
          material={materials["palette.049"]}
          position={[-6.296, -8.062, 1.472]}
          rotation={[Math.PI / 2, 0.309, 0]}
          scale={0.08}
        />
        <mesh
          name="Papers002_0"
          castShadow
          receiveShadow
          geometry={nodes.Papers002_0.geometry}
          material={materials["palette.049"]}
          position={[-5.857, -7.947, 1.46]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.08}
        />
        <mesh
          name="Papers003_0"
          castShadow
          receiveShadow
          geometry={nodes.Papers003_0.geometry}
          material={materials["palette.049"]}
          position={[-5.057, 4.132, 3.706]}
          rotation={[Math.PI / 2, -1.432, 0]}
          scale={0.06}
        />
        <mesh
          name="MorePapers_0"
          castShadow
          receiveShadow
          geometry={nodes.MorePapers_0.geometry}
          material={materials["palette.050"]}
          position={[-0.861, -10.665, 1.878]}
          rotation={[Math.PI / 2, -1.165, 0]}
          scale={0.015}
        />
        <mesh
          name="VelykaTumba001_0"
          castShadow
          receiveShadow
          geometry={nodes.VelykaTumba001_0.geometry}
          material={materials["palette.051"]}
          position={[-4.766, 4.289, 1.624]}
          rotation={[Math.PI / 2, -0.074, 0]}
          scale={[0.073, 0.079, 0.091]}
        />
        <mesh
          name="Door_0"
          castShadow
          receiveShadow
          geometry={nodes.Door_0.geometry}
          material={materials["palette.052"]}
          position={[-14.441, -17.581, 0]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={[0.097, 0.1, 0.1]}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/models/music_studio_at_home/scene.gltf');
