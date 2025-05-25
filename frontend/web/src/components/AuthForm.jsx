import { useState } from "react";
import axios from "../api/axiosConfig";

export default function AuthForm({ setToken }) {
  const [authForm, setAuthForm] = useState({ username: "", password: "" });
  const [showLogin, setShowLogin] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleAuth = async () => {
    setError(null);
    setSuccessMessage(null);

    try {
      const endpoint = showLogin ? "/login" : "/register";
      const res = await axios.post(endpoint, authForm);

      if (showLogin) {
        const jwt = res.data.access_token.token;
        localStorage.setItem("jwt_token", jwt);
        setToken(jwt);
      } else {
        setSuccessMessage('Registration successful. You can log in now!');
        setShowLogin(true);
        setAuthForm({ username: "", password: "" });
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.detail || "Authentication failed. Please try again.");
      } else {
        setError("Network error or server is unreachable.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-sm mx-auto border p-8 rounded-lg shadow-md bg-white dark:bg-gray-800 w-full transition-colors duration-500"> {/* Fondo oscuro para el formulario */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100 transition-colors duration-500">
          {showLogin ? "Login" : "Register"}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center transition-colors duration-300">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center transition-colors duration-300">
            {successMessage}
          </div>
        )}

        <input
          type="text"
          placeholder="Username"
          value={authForm.username}
          onChange={e => setAuthForm({ ...authForm, username: e.target.value })}
          className="block w-full mb-4 p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 transition-colors duration-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={authForm.password}
          onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
          className="block w-full mb-6 p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 transition-colors duration-300"
        />
        <div className="flex justify-between items-center">
          <button onClick={handleAuth} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200">
            {showLogin ? "Login" : "Register"}
          </button>
          <button
            onClick={() => {
              setShowLogin(!showLogin);
              setError(null);
              setSuccessMessage(null);
              setAuthForm({ username: "", password: "" });
            }}
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition duration-200 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {showLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}