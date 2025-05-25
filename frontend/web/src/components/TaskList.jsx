export default function TaskList({ tasks, handleToggleDone, handleEdit, handleDelete }) {
  return (
    <ul className="space-y-2">
      {tasks.map(task => (
        <li key={task.id} className="border p-3 rounded shadow hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={task.done === "true" || task.done === true}
                onChange={() => handleToggleDone(task)}
                className="w-5 h-5 rounded-full accent-blue-500 cursor-pointer mt-1"
              />
              <div>
                <h2 className={`text-lg font-semibold ${task.done === "true" || task.done === true ? "line-through text-gray-400" : ""}`}>
                  {task.title}
                </h2>
                <p className={`text-sm text-gray-500 ${task.done === "true" || task.done === true ? "line-through text-gray-400" : ""}`}>
                  {task.description}
                </p>
              </div>
            </div>
            <div className="space-x-2 flex items-center">
              <button onClick={() => handleEdit(task)} className="text-sm text-blue-600 hover:underline">Edit</button>
              <button onClick={() => handleDelete(task.id)} className="text-sm text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
