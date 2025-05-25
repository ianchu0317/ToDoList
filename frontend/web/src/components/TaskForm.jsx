export default function TaskForm({
  newTask,
  setNewTask,
  handleCreateTask,
  handleUpdateTask,
  setShowForm,
  editingTask,
  setEditingTask,
}) {
  return (
    <div className="border p-4 mb-4 rounded shadow relative bg-white dark:bg-gray-800 transition-colors duration-500 border-gray-200 dark:border-gray-700"> {/* Fondo y borde para el formulario de tareas */}
      <input
        type="text"
        placeholder="Title"
        className="block w-full mb-2 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 transition-colors duration-300"
        value={newTask.title}
        onChange={e => setNewTask({ ...newTask, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        className="block w-full mb-2 p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 transition-colors duration-300"
        value={newTask.description}
        onChange={e => setNewTask({ ...newTask, description: e.target.value })}
      />
      <div className="flex gap-2">
        <button
          onClick={editingTask ? handleUpdateTask : handleCreateTask}
          className="bg-green-500 text-white px-4 py-2 rounded transition-colors duration-200 hover:bg-green-600"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>
        <button
          onClick={() => {
            setShowForm(false);
            setEditingTask(null);
            setNewTask({ title: "", description: "" });
          }}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors duration-200 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}