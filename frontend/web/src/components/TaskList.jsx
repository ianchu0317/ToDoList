export default function TaskList({ tasks, handleToggleDone, handleEdit, handleDelete }) {
  return (
    <ul className="space-y-2">
      {tasks.map(task => (
        <li key={task.id} className="border p-3 rounded shadow hover:shadow-md transition bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-500"> {/* Fondo y borde para cada tarea */}
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={task.done === "true" || task.done === true}
                onChange={() => handleToggleDone(task)}
                className="w-5 h-5 rounded-full accent-blue-500 cursor-pointer mt-1 transition-all duration-200"
              />
              <div>
                <h2 className={`text-lg font-semibold ${task.done === "true" || task.done === true ? "line-through text-gray-400" : "text-gray-900 dark:text-gray-100"} transition-colors duration-300`}>
                  {task.title}
                </h2>
                <p className={`text-sm ${task.done === "true" || task.done === true ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-500 dark:text-gray-300"} transition-colors duration-300`}>
                  {task.description}
                </p>
              </div>
            </div>
            <div className="space-x-2 flex items-center">
              <button onClick={() => handleEdit(task)} className="text-sm text-blue-600 hover:underline transition-colors duration-200 dark:text-blue-400 dark:hover:text-blue-300">Edit</button>
              <button onClick={() => handleDelete(task.id)} className="text-sm text-red-600 hover:underline transition-colors duration-200 dark:text-red-400 dark:hover:text-red-300">Delete</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}