import { useState } from "react";
import axios from "../api/axiosConfig";

export default function AuthForm({ setToken }) {
  const [authForm, setAuthForm] = useState({ username: "", password: "" });
  const [showLogin, setShowLogin] = useState(true);
  const [error, setError] = useState(null);

  const handleAuth = async () => {
    try {
      const endpoint = showLogin ? "/login" : "/register";
      const res = await axios.post(endpoint, authForm);
      const jwt = res.data.token;
      localStorage.setItem("token", jwt);
      setToken(jwt);
    } catch {
      setError("Authentication failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto border p-4 rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">
        {showLogin ? "Login" : "Register"}
      </h2>
      <input
        type="text"
        placeholder="Username"
        value={authForm.username}
        onChange={e => setAuthForm({ ...authForm, username: e.target.value })}
        className="block w-full mb-2 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={authForm.password}
        onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
        className="block w-full mb-2 p-2 border rounded"
      />
      <div className="flex gap-2">
        <button onClick={handleAuth} className="bg-blue-500 text-white px-4 py-2 rounded">
          {showLogin ? "Login" : "Register"}
        </button>
        <button onClick={() => setShowLogin(!showLogin)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">
          {showLogin ? "Switch to Register" : "Switch to Login"}
        </button>
      </div>
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
}
