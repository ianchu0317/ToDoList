import { useState, useEffect } from "react";
import axios from "./api/axiosConfig";
import AuthForm from "./components/AuthForm";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwt_token") || "");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light"); // <--- Nuevo estado para el tema

  // Aplica la clase 'dark' al <html> cuando el tema cambia
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (token) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [token]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks");
      setTasks(res.data);
      setError(null);
    } catch (err) {
      setError("Unable to load tasks. Your session might have expired.");
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt_token");
    setToken("");
    setTasks([]);
    setError(null);
  };

  const handleCreateTask = async () => {
    if (!newTask.title.trim()) {
      setError("Task title cannot be empty.");
      return;
    }
    try {
      const res = await axios.post("/task", {
        ...newTask,
        done: false,
      });
      setTasks(prev => [...prev, res.data.task]);
      setNewTask({ title: "", description: "" });
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError("Unable to create task.");
    }
  };

  const handleUpdateTask = async () => {
    if (!newTask.title.trim()) {
      setError("Task title cannot be empty.");
      return;
    }
    try {
      const updatedTask = { ...editingTask, ...newTask };
      updatedTask.done = updatedTask.done === true || updatedTask.done === "true";

      const res = await axios.put(`/tasks/${editingTask.id}`, updatedTask);
      setTasks(prev => prev.map(t => (t.id === editingTask.id ? res.data.task : t)));
      setEditingTask(null);
      setShowForm(false);
      setNewTask({ title: "", description: "" });
      setError(null);
    } catch (err) {
      setError("Unable to update task.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(task => task.id !== id));
      setError(null);
    } catch (err) {
      setError("Unable to delete task.");
    }
  };

  const handleToggleDone = async (task) => {
    try {
      const updatedTask = {
        ...task,
        done: !(task.done === true || task.done === "true"),
      };
      const res = await axios.put(`/tasks/${task.id}`, updatedTask);
      setTasks(prev => prev.map(t => (t.id === task.id ? res.data.task : t)));
      setError(null);
    } catch (err) {
      setError("Unable to update task status.");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
    setNewTask({ title: task.title, description: task.description });
  };

  const toggleTheme = () => { // <--- Función para cambiar el tema
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500"> {/* <--- Fondo y texto base para los temas */}
      {!token ? (
        <AuthForm setToken={setToken} />
      ) : (
        <main className="p-4 max-w-xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">My Tasks</h1>
            <div className="flex items-center space-x-2">
              {/* Botón para cambiar el tema */}
              <button
                onClick={toggleTheme}
                className="px-3 py-1 rounded-full text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
              >
                {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
              </button>
              <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded transition-all duration-200 hover:bg-red-600 hover:scale-105">
                Logout
              </button>
            </div>
          </div>

          {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

          <button
            onClick={() => {
              setShowForm(true);
              setEditingTask(null);
              setNewTask({ title: "", description: "" });
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4 transition-all duration-200 hover:cursor-pointer hover:bg-blue-600 hover:scale-105"
          >
            New Task
          </button>

          {showForm && (
            <TaskForm
              newTask={newTask}
              setNewTask={setNewTask}
              handleCreateTask={handleCreateTask}
              handleUpdateTask={handleUpdateTask}
              setShowForm={setShowForm}
              editingTask={editingTask}
              setEditingTask={setEditingTask}
            />
          )}

          <TaskList tasks={tasks} handleToggleDone={handleToggleDone} handleEdit={handleEdit} handleDelete={handleDelete} />

          {tasks.length === 0 && !error && !showForm && (
            <p className="text-gray-600 mt-4 text-center dark:text-gray-400 transition-colors duration-300">No tasks yet. Create a new one!</p>
          )}
        </main>
      )}
    </div>
  );
}