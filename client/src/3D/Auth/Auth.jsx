import { CameraControls } from '@react-three/drei'
import { DEG2RAD } from 'three/src/math/MathUtils';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing'


import LoginPart from './LoginPart';
import SignUpPart from './SignUpPart';

// Helper function that converts regular rgb to normalized value
// normalized value = any number between 0 and 1
// the reason of it is it makes it easier to add the glowing effect to the cube
function getNormalizedColor(r, g, b, multiplierR = 1, multiplierG = 1, multiplierB = 1){
    const newR = (r / 255) * multiplierR
    const newG = (g / 255) * multiplierG
    const newB = (b / 255) * multiplierB
    return {newR, newG, newB}
}

export default function Auth3D() {
    /**
     * Setting the state
     */
    const [cameraControlEnable, setCameraControl] = useState(false)
    const [colorMultiplier, setColorMultiplier] = useState(1)
    const [loginText, setLoginText] = useState('Login')
    const [signUpText, setSignUpText] = useState('')

    // to animate box and camera
    const box = useRef()
    const cameraControl = useRef()

    // getting normalized color value
    const {newR, newG, newB} = getNormalizedColor(243, 167, 18, 1, 1, 1)

    /**
     * Animation
     */
    useFrame((state, delta)=>{
        box.current.rotation.y += delta
        box.current.rotation.x += delta
        setColorMultiplier(1 + Math.abs(Math.sin(state.clock.elapsedTime) * 2))
    })

    // Camera rotation
    const rotateCamera = async (e)=>{
        const { id } = e.target

        // if the button was clicked to switch to sign up
        if(id == 'toSignUp'){
            // empty the login text
            setLoginText('')

            // populate sign up text 
            setSignUpText('SignUp')

        }else { // other wise

            // do the opposite
            setSignUpText('')
            setLoginText('Login')
        }
        setCameraControl(true)

        // rotate the camera
        await cameraControl.current.rotate(180 * DEG2RAD, 0, true)
    }
    return <>
        {/* Adding effect (glow) */}
        <EffectComposer>
            <Bloom
                mipmapBlur
                intensity={ 0.1 }
                luminanceThreshold={ 0 }
            />
        </EffectComposer>

        {/* To rotate the camera */}
        <CameraControls ref={cameraControl} enabled={cameraControlEnable} mouseButtons-left={null}/>

        {/* Cube */}
        <mesh ref={box}>
            <boxGeometry/>
            <meshBasicMaterial
                color={ [ newR * colorMultiplier, newG * colorMultiplier, newB * colorMultiplier ] }
                toneMapped={ false }
            />
        </mesh>

        {/* Login and sign up component */}
        <LoginPart occludeObj={ [box] } handleRotate={rotateCamera} text={loginText}/>
        <SignUpPart occludeObj={ [box] } handleRotate={rotateCamera} text={signUpText} />
    </>
}