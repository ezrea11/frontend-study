import { useState } from "react";
import { useNavigate } from "react-router";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>){
      event.preventDefault();
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim();
      
      if(trimmedUsername === "" || trimmedPassword === ""){
        setErrorMessage("Username and password cannot be empty.")
        return;
      }

      if(trimmedUsername !=="admin" || trimmedPassword !== "123456"){
        setErrorMessage("Invalid username or password.");
        return;
      }

      setErrorMessage("");
      navigate("/dashboard");

  }
  
  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Admin Login</h1>

        <label>
          Username
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter username"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
          />
        </label>

        {errorMessage !== "" && <p className="error-text">{errorMessage}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );

  
}

export default Login;