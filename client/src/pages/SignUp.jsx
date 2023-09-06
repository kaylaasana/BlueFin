import { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const SingUp = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [createUser, { error, data }] = useMutation(CREATE_USER);

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
      const { data } = await createUser({
        variables: { ...formState },
      });

      // assign token to user data at login
      Auth.login(data.createUser.token);
    } catch (error) {
      console.error(error);
      throw new Error("Sign-up failed");
    }

    // reset input fields on submission
    setFormState({
      email: "",
      password: "",
    });
  };
};

export default SignUp;
