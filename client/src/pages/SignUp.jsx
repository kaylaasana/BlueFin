import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";
import { CREATE_USER } from "../utils/mutation";
import { CHECK_USERNAME_EXISTS, CHECK_EMAIL_EXISTS } from "../utils/queries";
import Auth from "../utils/auth";
import { validateEmail } from "../utils/helpers";

const SignUp = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [checkUsernameExists, { loading: usernameLoading }] = useLazyQuery(
    CHECK_USERNAME_EXISTS,
    {
      // await the response of the query
      onCompleted: (data) => {
        // Set the state based on the response
        setUsernameExists(data.checkUsernameExists);
      },
    }
  );
  const [checkEmailExists, { loading: emailLoading }] = useLazyQuery(
    CHECK_EMAIL_EXISTS,
    {
      // await the response of the query
      onCompleted: (data) => {
        // Set the state based on the response
        setEmailExists(data.checkEmailExists);
      },
    }
  );
  const [createUser, { error: createUserError, data: createUserData }] =
    useMutation(CREATE_USER);
  const [errorMessages, setErrorMessages] = useState([]);

  // update the state based on the form input changes
  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });

    // check if username and/or email exists in database
    if (name === "username") {
      checkUsernameExists({ variables: { username: value } });
    } else if (name === "email") {
      checkEmailExists({ variables: { email: value } });
    }
  };

  //  alert the user if there is no input
  const noInput = () => {
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

  //form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const errors = [];

    // check if email input is a valid email
    if (formState.email && !validateEmail(formState.email)) {
      errors.push("Email is invalid");
      setErrorMessages(errors);
      return;
    }

    if (usernameExists) {
      errors.push("Username already exists");
      setErrorMessages(errors);
      return;
    }

    if(formState.username.length <= 4 || formState.username.length >= 10) {
      errors.push("Username must be between 4-10 characters long");
      setErrorMessages(errors);
      return;
    }

    if (emailExists) {
      errors.push("Email already exists");
      setErrorMessages(errors);
      return;
    }

    if(formState.password.length < 8) {
      errors.push("Password must be at least 8 characters long");
      setErrorMessages(errors);
      return;
    }

    if (errors.length > 0) {
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
          {usernameExists && (
            <div className="error-text d-flex justify-content-center">
              Username already exists
            </div>
          )}
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
          {emailExists && (
            <div className="error-text d-flex justify-content-center">
              Email already exists
            </div>
          )}
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
          <div className="p-2">
            <button type="submit">Submit</button>
          </div>
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
