import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);
  const apiUrl = "api";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${apiUrl}/tasks`);
      setTasks(res.data);
    } catch (err) {
      setError("Unable to connect to the API");
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
      setError("Unable to create task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/tasks/${id}`);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError("Unable to delete task");
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
      setError("Unable to update task status");
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
      setError("Unable to update task");
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
          setShowForm(true);
          setEditingTask(null);
          setNewTask({ title: "", description: "" });
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 transition-all duration-200 hover:cursor-pointer hover:bg-blue-600 hover:scale-105"
      >
        New Task
      </button>

      {showForm && (
        <div className="border p-4 mb-4 rounded shadow relative">
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
          <div className="flex gap-2">
            <button
              onClick={editingTask ? handleUpdateTask : handleCreateTask}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {editingTask ? "Update Task" : "Add Task"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingTask(null);
                setNewTask({ title: "", description: "" });
              }}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}


      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="border p-3 rounded shadow hover:shadow-md transition">
            <div className="flex justify-between items-start">
              {/* Left: Checkbox + info */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={task.done === "true" || task.done === true}
                  onChange={() => handleToggleDone(task)}
                  className="w-5 h-5 rounded-full accent-blue-500 cursor-pointer mt-1 transition-transform"
                />
                <div className="transition-all">
                  <h2
                    className={`text-lg font-semibold transition-all ${
                      task.done === "true" || task.done === true ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {task.title}
                  </h2>
                  <p
                    className={`text-sm text-gray-500 transition-all ${
                      task.done === "true" || task.done === true ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {task.description}
                  </p>
                </div>
              </div>

              {/* Right: Buttons */}
              <div className="space-x-2 flex items-center">
                <button
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer"
                  onClick={() => handleEdit(task)}
                >
                  Edit
                </button>
                <button
                  className="text-sm text-red-600 hover:text-red-800 hover:underline transition-colors cursor-pointer"
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
