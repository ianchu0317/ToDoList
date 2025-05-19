# ToDoList


## Technologies used

- MySQL

- FastAPI

- Vite + React + Tailwind CSS

- Apache2 

- Docker 


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

