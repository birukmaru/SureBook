import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State to store messages
  const [isSuccess, setIsSuccess] = useState(false); // State to track success or error
  const navigate = useNavigate();

  // Function to handle registration
  async function registerUser(ev) {
    ev.preventDefault();

    // Basic validation
    if (!name || !email || !password) {
      setMessage("Please fill in all fields");
      setIsSuccess(false);
      return;
    }

    try {
      const response = await axios.post(
        "/register",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Registration response:", response);

      if (response.status === 201 || response.status === 200) {
        setMessage("Registration successful. Redirecting to login...");
        setIsSuccess(true);

        // Delay navigation by 2 seconds to show the success message
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (e) {
      console.error("Registration error:", e.response?.data, e.message);
      const backendMessage =
        e.response?.data?.message ||
        e.response?.data ||
        "Registration failed. Please try again later.";
      setMessage(backendMessage);
      setIsSuccess(false);
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          {/* Conditional rendering of message box */}
          {message && (
            <div
              className={`px-4 py-3 rounded relative mb-4 ${
                isSuccess
                  ? "bg-green-100 border border-green-400 text-green-700"
                  : "bg-red-100 border border-red-400 text-red-700"
              }`}
              role="alert"
            >
              <strong className="font-bold">
                {isSuccess ? "Success: " : "Error: "}
              </strong>
              <span className="block sm:inline">{message}</span>
            </div>
          )}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
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
            Register
          </button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
