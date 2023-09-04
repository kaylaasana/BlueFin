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
      <form className="roe d-flex justify-content-center">
        <label className="col">
            Username
          <br></br>
          <input className="col"></input>
        </label>
        <label className="col">
            Password
          <br></br>
          <input  className="col"></input>
        </label>
        <button  className="col">Submit</button>
        <button className="col">Sign Up</button>
      </form>
    </div>
  );
};

export default Login;
