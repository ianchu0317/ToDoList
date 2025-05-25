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
        setSuccessMessage('Registro exitoso. ¡Ahora puedes iniciar sesión!');
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-sm mx-auto border p-8 rounded-lg shadow-md bg-white w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          {showLogin ? "Iniciar Sesión" : "Registrarse"}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
            {successMessage}
          </div>
        )}

        <input
          type="text"
          placeholder="Usuario"
          value={authForm.username}
          onChange={e => setAuthForm({ ...authForm, username: e.target.value })}
          className="block w-full mb-4 p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={authForm.password}
          onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
          className="block w-full mb-6 p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="flex justify-between items-center">
          <button onClick={handleAuth} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200">
            {showLogin ? "Login" : "Registrar"}
          </button>
          <button
            onClick={() => {
              setShowLogin(!showLogin);
              setError(null);
              setSuccessMessage(null);
              setAuthForm({ username: "", password: "" });
            }}
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition duration-200"
          >
            {showLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia Sesión"}
          </button>
        </div>
      </div>
    </div>
  );
}