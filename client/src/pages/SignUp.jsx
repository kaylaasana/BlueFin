import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutation";
import Auth from "../utils/auth";
import { validateEmail } from "../utils/helpers";

const SignUp = () => {
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [createUser, { error, data }] = useMutation(CREATE_USER);
  const [errorMessages, setErrorMessages] = useState([]);

  // update the state based on the form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    // const { target } = event;
    // const inputType = target.name;
    // const inputValue = target.value;

    // check input type
    // if (inputType === "email") {
    //   setEmail(inputValue);
    // } else if (inputType === "username") {
    //   setUsername(inputValue);
    // } else {
    //   setPassword(inputValue);
    // }
    if (name === "email") {
      setFormState({ ...formState, [name]: value });
    } else if (name === "username") {
      setFormState({ ...formState, [name]: value });
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

  //form submit
  const handleFormSubmit = async (event) => {
    // check if email input is a valid email
    event.preventDefault();
    const errors = [];
    if (formState.email && !validateEmail(formState.email)) {
      errors.push("email is invalid");
      return;
    }

    // assign formState to data
    try {
      const { data } = await createUser({
        variables: { ...formState },
      });

      // assign token to user data at login
      Auth.login(data.createUser.token);

      // reset input fields on submission
      setFormState({
        username: "",
        email: "",
        password: "",
      });
      setErrorMessages([]);
    } catch (error) {
      console.error(error);
      throw new Error("Sign-up failed");
    }
  };

  //  alert the user if there is no input
  const noInput = (event) => {
    event.preventDefault();
    const errors = [];

    if (!formState.username) {
      errors.push("Username is required");
    }
    if (!formState.email) {
      errors.push("Email is required");
    }
    if (!formState.password) {
      errors.push("Password is required");
    }

    setErrorMessages(errors);
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <Link to="/">
          <button>Homepage</button>
        </Link>
        <Link to="/login">
          <button>Log In</button>
        </Link>
      </div>
      <div className="col d-flex justify-content-center">
        <form onSubmit={handleFormSubmit} onBlur={noInput}>
          <label className="row text">
            Username
            <br></br>
            <input
              className="row"
              placeholder="username"
              name="username"
              type="username"
              value={formState.username}
              onChange={handleChange}
              onBlur={noInput}
            />
          </label>
          <label className="row">
            Email
            <br></br>
            <input
              className="row"
              placeholder="your email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              onBlur={noInput}
            />
          </label>
          <label className="row">
            Password
            <br></br>
            <input
              className="row"
              placeholder="********"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              onBlur={noInput}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      {errorMessages.length > 0 && (
        <div>
          <ul className="error-list row p-3">
            {errorMessages.map((message, index) => (
              <li
                key={index}
                className="error-text d-flex justify-content-center"
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SignUp;
