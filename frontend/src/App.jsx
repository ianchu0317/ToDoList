import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);
  const apiUrl = "http://localhost:8000";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${apiUrl}/tasks`);
      setTasks(res.data);
    } catch (err) {
      setError("No se pudo conectar con la API");
    }
  };

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
      setError("No se pudo crear la tarea");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/tasks/${id}`);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError("No se pudo eliminar la tarea");
    }
  };

  const handleToggleDone = async (task) => {
    try {
      const updatedTask = {
        ...task,
        done: task.done === "true" || task.done === true ? false : true,
      };
      const res = await axios.put(`${apiUrl}/tasks/${task.id}`, updatedTask);
      setTasks(prev =>
        prev.map(t => (t.id === task.id ? res.data.task : t))
      );
    } catch (err) {
      setError("No se pudo actualizar el estado de la tarea");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
    setNewTask({ title: task.title, description: task.description });
  };

  const handleUpdateTask = async () => {
    try {
      const updatedTask = {
        ...editingTask,
        title: newTask.title,
        description: newTask.description,
      };
      const res = await axios.put(`${apiUrl}/tasks/${editingTask.id}`, updatedTask);
      setTasks(prev =>
        prev.map(t => (t.id === editingTask.id ? res.data.task : t))
      );
      setEditingTask(null);
      setShowForm(false);
      setNewTask({ title: "", description: "" });
    } catch (err) {
      setError("No se pudo actualizar la tarea");
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
        onClick={() => {
          setShowForm(!showForm);
          setEditingTask(null);
          setNewTask({ title: "", description: "" });
        }}
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
            onClick={editingTask ? handleUpdateTask : handleCreateTask}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {editingTask ? "Update Task" : "Add Task"}
          </button>
        </div>
      )}

      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="border p-3 rounded shadow hover:shadow-md transition">
            <div className="flex justify-between items-start">
              {/* IZQUIERDA: Checkbox + info */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={task.done === "true" || task.done === true}
                  onChange={() => handleToggleDone(task)}
                  className="mt-1 cursor-pointer"
                />
                <div>
                  <h2 className="text-lg font-semibold">{task.title}</h2>
                  <p className="text-sm text-gray-500">{task.description}</p>
                </div>
              </div>

              {/* DERECHA: Botones */}
              <div className="space-x-2 flex items-center">
                <button
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                  onClick={() => handleEdit(task)}
                >
                  Edit
                </button>
                <button
                  className="text-sm text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
