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
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}