import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to handle error messages
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    try {
      const { data } = await axios.post("/login", { email, password });

      if (data && data.email) {
        setUser(data);
        setErrorMessage(""); // Clear error message on successful login
        navigate("/"); // Redirect to index page after successful login
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (e) {
      // Handle different errors based on the error response
      if (e.response && e.response.status === 404) {
        setErrorMessage("No account found with this email.");
      } else if (e.response && e.response.status === 401) {
        setErrorMessage("Incorrect password. Please try again.");
      } else {
        setErrorMessage("Login failed. Please try again later.");
      }
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary" type="submit">
            Login
          </button>
          {errorMessage && (
            <div className="text-red-500 text-center mt-2">{errorMessage}</div>
          )}
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
