import db_controllers as db_ctrl
import auth_controllers as auth_ctrl
from schemas import Task, User
from typing import Annotated
from fastapi import FastAPI
from fastapi import Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# User management endpoints
@app.post("/register", status_code=201)
def create_user(user_credentials: User):
    auth_ctrl.validate_user(user_credentials)
    return db_ctrl.create_user(user_credentials)


@app.post("/login", status_code=200)
def login(user_credentials: User):
    return auth_ctrl.login_user(user_credentials)   


# Task management endpoints
@app.get("/tasks", response_model=list[Task])
def read_tasks(token: Annotated[str, Depends(oauth2_scheme)]):
    return db_ctrl.get_tasks(token)


@app.post("/task", status_code=201)
def create_task(task: Task, token: Annotated[str, Depends(oauth2_scheme)]):
    return db_ctrl.create_task(task, token)


@app.put("/tasks/{task_id}", status_code=200)
def update_task(task_id: int, 
                task: Task, 
                token: Annotated[str, Depends(oauth2_scheme)]):
    return db_ctrl.update_task(task_id, task, token)


@app.delete("/tasks/{task_id}", status_code=204)
def delete_task(task_id: int, token: Annotated[str, Depends(oauth2_scheme)]):
    return db_ctrl.delete_task(task_id, token)
