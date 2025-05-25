# ToDoList

## Screenshots

![image-demo-todo-web](https://github.com/user-attachments/assets/75f6d513-8ea2-40ef-a174-c3bac2adf8d9)


[video-demo-login-todo-web](https://github.com/user-attachments/assets/31ae17c7-2ab8-40d9-b2de-8568f0f7e78a)

[video-demo-todo-web](https://github.com/user-attachments/assets/09f78832-cc22-4520-a81d-a6deeeb891b2)


## Description
A simple fullstack project for managing personal tasks.

The project applies CRUD operations with a RESTful API built using FastAPI, and a modern frontend using Vite, React, and Tailwind CSS.

It demonstrates how to structure a fullstack app using Docker and MySQL for deployment and data persistence. 

<br>


## Features

- Add / edit / delete tasks

- Toggle task completion

- Responsive frontend

- RESTful API using FastAPI

- Persistent data using MySQL

- Dockerized for easy deployment

<br>

## Technologies used
- Python

- FastAPI

- Uvicorn

- MySQL

- Docker + Docker Compose

- Node.js + NPM

- Vite + React + Tailwind CSS

- Apache2

<br>

## Run project in local

1. Clone repository
```sh
git clone https://github.com/ianchu0317/ToDoList.git
```

2. Build web 
```sh
cd frontend/web && npm install && npm run build
```

3. Run docker container `ToDoList/docker-compose.yml`
```sh
docker compose up --build
```

<br>

---

<br>

## Project structure
```
ToDoList/
├── docs/                    <-- project documentation for api, db, and web  
├── backend/
│   ├── api/
│   ├── db/
│   ├── Dockerfile
│   └── docker-compose.yml   <-- backend only
├── frontend/
│   ├── web/                 <-- web docs using Vite
│   └── docker-compose.yml   <-- frontend only
├── docker-compose.yml       <-- ToDoList app (frontend + backend + db)
```

## More detail documentation
- [`docs/backend.md`](docs/backend.md) for backend API and database

    - [`docs/api.md`](docs/backend/api.md) for API

    - [`docs/db.md`](docs/backend/db.md) for database

- [`docs/frontend/`](docs/frontend/) for frontend web

