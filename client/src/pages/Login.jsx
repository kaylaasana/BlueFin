import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutation";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

// create login page component
const Login = (props) => {
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

  // build page layout
  return (
    <div>
      <div className="d-flex justify-content-start">
        <Link to="/">
          <button>Homepage</button>
        </Link>
      </div>
      <div className="col d-flex justify-content-center">
        <form onSubmit={handleFormSubmit}>
          <label className="row text">
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
          <Link to='/sign-up'><button>Sign Up</button></Link>
        </form>

        {error && (
          <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
        )}
      </div>
    </div>
  );
};

export default Login;
