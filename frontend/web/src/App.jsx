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
      setError("No se pudieron cargar las tareas. Tu sesión podría haber expirado.");
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
      setError("El título de la tarea no puede estar vacío.");
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
      setError("No se pudo crear la tarea.");
    }
  };

  const handleUpdateTask = async () => {
    if (!newTask.title.trim()) {
      setError("El título de la tarea no puede estar vacío.");
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
      setError("No se pudo actualizar la tarea.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(task => task.id !== id));
      setError(null);
    } catch (err) {
      setError("No se pudo eliminar la tarea.");
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
      setError("No se pudo actualizar el estado de la tarea.");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
    setNewTask({ title: task.title, description: task.description });
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      {!token ? (
        <AuthForm setToken={setToken} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Mis Tareas</h1>
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded transition-all duration-200 hover:bg-red-600 hover:scale-105">
              Cerrar Sesión
            </button>
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
            Nueva Tarea
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
            <p className="text-gray-600 mt-4 text-center">No hay tareas aún. ¡Crea una nueva!</p>
          )}
        </>
      )}
    </main>
  );
}