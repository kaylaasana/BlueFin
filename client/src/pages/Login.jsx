import { useState } from "react";

// create login page component
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // build page layout
  return (
    <div>
      <div className="d-flex justify-content-start">
        <button>Homepage</button>
      </div>
      <div className="col d-flex justify-content-center">
        <form>
          <label className="row text">
            Username
            <br></br>
            <input className="row"></input>
          </label>
          <label className="row">
            Password
            <br></br>
            <input className="row"></input>
          </label>
            <button>Submit</button>
            <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
