import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutation";
import Auth from "../utils/auth";
import { validateEmail } from "../utils/helpers";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [createUser, { error, data }] = useMutation(CREATE_USER);
  // const [userMessage, setUserErrorMessage] = useState("");
  // const [emailMessage, setEmailErrorMessage] = useState("");
  // const [passwordMessage, setPasswordErrorMessage] = useState("");
  // const [formMessage, setFormErrorMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  // update the state based on the form input changes
  const handleChange = (event) => {
    // const { name, value } = event.target;
    const { target } = event;
    const inputType = target.name;
    const inputValue = target.value;

    //set form state based on the value
    // setFormState({
    //   ...formState,
    //   [name]: value,
    // });

    // check input type
    if (inputType === "email") {
      setEmail(inputValue);
    } else if (inputType === "username") {
      setUsername(inputValue);
    } else {
      setPassword(inputValue);
    }
  };

  //form submit
  const handleFormSubmit = async (event) => {
    // check if email input is a valid email
    event.preventDefault();
    const errors = [];
    if (email && !validateEmail(email)) {
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
    } catch (error) {
      console.error(error);
      throw new Error("Sign-up failed");
    }

    // reset input fields on submission
    setFormState({
      username: "",
      email: "",
      password: "",
    });

    setErrorMessages([]);

  };

  //  alert the user if there is no input
  // const noInput = (event) => {
  //   event.preventDefault();
  //   if (!username && !email && !password){
  //     setFormErrorMessage("username, email and password required")
  //   }
  //   if (!username) {
  //     setUserErrorMessage("username required");
  //     return;
  //   }
  //   if (!email) {
  //     setEmailErrorMessage("email required");
  //     return;
  //   }
  //   if (!password) {
  //     setPasswordErrorMessage("password required");
  //     return;
  //   }
  // };

  const noInput = (event) => {
    event.preventDefault();
    const errors = [];

    if (!username) {
      errors.push("Username is required");
    }
    if (!email) {
      errors.push("Email is required");
    }
    if (!password) {
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
              value={username}
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
              value={email}
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
              value={password}
              onChange={handleChange}
              onBlur={noInput}
            />
          </label>
          <button type="submit">Submit</button>
        </form>

        {/* {[userMessage, passwordMessage, emailMessage, formMessage] && (
          <div>
            <p className="error-text">{[userMessage, passwordMessage, emailMessage, formMessage]}</p>
          </div>
        )} */}
      </div>
      {errorMessages.length > 0 && (
        <div>
          <ul className="error-list row p-3">
            {errorMessages.map((message, index) => (
              <li key={index} className="error-text d-flex justify-content-center">
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
