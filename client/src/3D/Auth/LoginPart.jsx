import { Html, Text, Float } from "@react-three/drei"
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutation";
import Auth from "../../utils/auth";

export default function LoginPart({ occludeObj, handleRotate, text = 'Login' }) {
    /**
     * Everything not related with 3D
     */
    const [formState, setFormState] = useState({ email: "", password: "" });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    // update the state based on the form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        //set form state based on the value
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    //form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // assign formState to data
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            // assign token to user data at login
            Auth.login(data.login.token);
        } catch (error) {
            console.error(error);
            throw new Error("Login failed");
        }

        // reset input fields on submission
        setFormState({
            email: "",
            password: "",
        });
    };

    /**
     * 3D
     */

    return <group position={[0, 0, 4]}>
        <Html
            transform
            distanceFactor={5}
            
            // set occlude so that anything behind this object doesn't get rendered
            occlude={occludeObj}
        >
            <div className="container">
                <div className="d-flex justify-content-between">
                    <button>Homepage</button>
                    <button id="toSignUp" onClick={handleRotate}>Sign Up Instead</button>
                </div>
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <form onSubmit={handleFormSubmit}>
                            <label className="row text">
                                Email
                                <br />
                                <input
                                    className="row"
                                    placeholder="your email"
                                    name="email"
                                    type="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="row">
                                Password
                                <br />
                                <input
                                    className="row"
                                    placeholder="********"
                                    name="password"
                                    type="password"
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                            </label>
                            <div className="p-2">
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        {error && <div className="error-text p-3">{error.message}</div>}
                    </div>
                </div>
            </div>
        </Html>
        <Float>
            <Text
                fontSize={0.5}
                anchorY="top"
                anchorX="left"
                lineHeight={0.8}
                position={[0, 2, 0]}
            >
                {text}
            </Text>
        </Float>
    </group>
}