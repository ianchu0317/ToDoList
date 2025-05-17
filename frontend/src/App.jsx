// Boilerplate base para tu frontend en React + Tailwind
// Proyecto pensado para manejar tareas conectadas a tu API

import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const apiUrl = "http://localhost:8000";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${apiUrl}/tasks`);
        setTasks(res.data);
      } catch (err) {
        console.error("Error al obtener tareas:", err);
        setError("No se pudo conectar con la API");
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    if (!newTask.title.trim()) return;
    try {
      const res = await axios.post(`${apiUrl}/task`, {
        title: newTask.title,
        description: newTask.description,
        done: "false",
      });
      setTasks(prev => [...prev, res.data.task]);
      setNewTask({ title: "", description: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Error al crear tarea:", err);
      setError("No se pudo crear la tarea");
    }
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
          {error}
        </div>
      )}
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {showForm ? "Cancel" : "New Task"}
      </button>

      {showForm && (
        <div className="border p-4 mb-4 rounded shadow">
          <input
            type="text"
            placeholder="Title"
            className="block w-full mb-2 p-2 border rounded"
            value={newTask.title}
            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="block w-full mb-2 p-2 border rounded"
            value={newTask.description}
            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
          />
          <button
            onClick={handleCreateTask}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>
      )}

      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="border p-3 rounded shadow">
            <div className="flex justify-between items-center">
              <span>{task.title}</span>
              <div className="space-x-2">
                <input type="checkbox" defaultChecked={task.done === "true" || task.done === true} />
                <button className="text-sm text-blue-600">Edit</button>
                <button className="text-sm text-red-600">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
