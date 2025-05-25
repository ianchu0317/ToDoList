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
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks");
      setTasks(res.data);
    } catch {
      setError("Unable to connect to the API");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setTasks([]);
  };

  const handleCreateTask = async () => {
    if (!newTask.title.trim()) return;
    try {
      const res = await axios.post("/task", {
        ...newTask,
        done: "false",
      });
      setTasks(prev => [...prev, res.data.task]);
      setNewTask({ title: "", description: "" });
      setShowForm(false);
    } catch {
      setError("Unable to create task");
    }
  };

  const handleUpdateTask = async () => {
    try {
      const updatedTask = { ...editingTask, ...newTask };
      const res = await axios.put(`/tasks/${editingTask.id}`, updatedTask);
      setTasks(prev => prev.map(t => (t.id === editingTask.id ? res.data.task : t)));
      setEditingTask(null);
      setShowForm(false);
      setNewTask({ title: "", description: "" });
    } catch {
      setError("Unable to update task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch {
      setError("Unable to delete task");
    }
  };

  const handleToggleDone = async (task) => {
    try {
      const updatedTask = {
        ...task,
        done: task.done === "true" || task.done === true ? false : true,
      };
      const res = await axios.put(`/tasks/${task.id}`, updatedTask);
      setTasks(prev => prev.map(t => (t.id === task.id ? res.data.task : t)));
    } catch {
      setError("Unable to update task status");
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
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded mb-4">
            Logout
          </button>

          <h1 className="text-2xl font-bold mb-4">Tasks</h1>
          {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

          <button
            onClick={() => {
              setShowForm(true);
              setEditingTask(null);
              setNewTask({ title: "", description: "" });
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
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
        </>
      )}
    </main>
  );
}
