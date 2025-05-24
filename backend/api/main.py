from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import Task, User
import db_controllers as db_ctrl
import auth_controllers as auth_ctrl

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# User management endpoints
@app.post("/register", status_code=201)
def create_user(user_credentials: User):
    auth_ctrl.validate_user(user_credentials)
    return db_ctrl.create_user(user_credentials)
    

# Task management endpoints
@app.get("/tasks", response_model=list[Task])
def read_tasks():
    return db_ctrl.get_tasks()


@app.post("/task", status_code=201)
def create_task(task: Task):
    return db_ctrl.create_task(task)


@app.put("/tasks/{task_id}", status_code=200)
def update_task(task_id: int, task: Task):
    return db_ctrl.update_task(task_id, task)


@app.delete("/tasks/{task_id}", status_code=204)
def delete_task(task_id: int):
    return db_ctrl.delete_task(task_id)
