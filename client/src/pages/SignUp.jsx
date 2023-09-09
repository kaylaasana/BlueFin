import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutation";
import Auth from "../utils/auth";
import { validateEmail } from "../utils/helpers";

const SignUp = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [createUser, { error, data }] = useMutation(CREATE_USER);
  const [errorMessage, setErrorMessage] = useState("");

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
    // check if email input is a valid email
    event.preventDefault();
    if (email && !validateEmail(email)) {
      setErrorMessage("email is invalid");
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
      username:"",
      email: "",
      password: "",
    });
  };

  //  alert the user if there is no input
  const noInput = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setErrorMessage("all fields required");
      return;
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <Link to="/">
          <button>Homepage</button>
        </Link>
        <Link to='/login'><button>Log In</button></Link>
      </div>
      <div className="col d-flex justify-content-center">
        <form onSubmit={handleFormSubmit}>
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
            />
          </label>
          <button type="submit">Submit</button>
        </form>

        {errorMessage && (
        <div>
          <p className="error-text">{errorMessage}</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default SignUp;
