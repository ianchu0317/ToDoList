# App.jsx — Documentación Técnica

## Configurar e iniciar servidor
```bash
npm install
npm run dev
```

## 📌 Resumen
Componente principal que gestiona tareas (`tasks`) a través de una API. Permite crear, editar, eliminar y marcar como completadas las tareas.

---

## 🧠 Estado (`useState`)

```js
const [tasks, setTasks] = useState([]);
const [error, setError] = useState(null);
const [showForm, setShowForm] = useState(false);
const [newTask, setNewTask] = useState({ title: "", description: "" });
const [editingTask, setEditingTask] = useState(null);
```

- `tasks`: lista de tareas actuales.
- `error`: mensaje de error para mostrar al usuario.
- `showForm`: controla la visibilidad del formulario de tareas.
- `newTask`: datos del formulario (crear/editar).
- `editingTask`: almacena la tarea que está siendo editada (o `null` si no hay).

---

## 🔁 useEffect

```js
useEffect(() => {
  fetchTasks();
}, []);
```

- Ejecuta `fetchTasks()` una vez al montar el componente para cargar las tareas existentes.

---

## 📦 Funciones

### fetchTasks

```js
const fetchTasks = async () => { ... }
```

- **Descripción**: Obtiene todas las tareas desde el endpoint `GET /tasks` y actualiza el estado `tasks`.

---

### handleCreateTask

```js
const handleCreateTask = async () => { ... }
```

- **Descripción**: Crea una nueva tarea a través del endpoint `POST /task`.
- **Validación**: No permite crear una tarea sin título.
- **Efecto**: Limpia el formulario y oculta el panel luego de crear.

---

### handleDelete

```js
const handleDelete = async (id) => { ... }
```

- **Descripción**: Elimina una tarea por su ID usando el endpoint `DELETE /tasks/{id}`.
- **Efecto**: Actualiza el estado `tasks` eliminando la tarea localmente.

---

### handleToggleDone

```js
const handleToggleDone = async (task) => { ... }
```

- **Descripción**: Alterna el estado `done` de una tarea (completado o no) y lo actualiza en el servidor mediante `PUT /tasks/{id}`.
- **Transformación**: Convierte string `"true"` a `false` y viceversa.

---

### handleEdit

```js
const handleEdit = (task) => { ... }
```

- **Descripción**: Activa el formulario en modo edición, cargando los datos de la tarea seleccionada.
- **Efecto**: `showForm = true`, `editingTask = task`.

---

### handleUpdateTask

```js
const handleUpdateTask = async () => { ... }
```

- **Descripción**: Actualiza una tarea existente usando `PUT /tasks/{id}` con los nuevos datos del formulario.
- **Efecto**: Limpia y cierra el formulario, resetea `editingTask`.

---

## 🧪 Componentes visuales relevantes

### Botón "New Task"
- Muestra el formulario para agregar nueva tarea.
- No cambia al presionar (es independiente del estado `editingTask`).
- Incluye animación de hover (`scale`, `background`).

### Checkbox
- A la izquierda.
- Estilo circular grande (`w-5 h-5 rounded-full`).
- Cambia el estado `done` de la tarea.

### Título y descripción
- Se tachan suavemente cuando `done = true` (`line-through`, `text-gray-400`).
- Transiciones con `transition-all`.