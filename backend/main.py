from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import Task
import controllers

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/tasks", response_model=list[Task])
def read_tasks():
    return controllers.get_tasks()


@app.post("/task", status_code=201)
def create_task(task: Task):
    return controllers.create_task(task)


@app.put("/tasks/{task_id}", status_code=200)
def update_task(task_id: int, task: Task):
    return controllers.update_task(task_id, task)


@app.delete("/tasks/{task_id}", status_code=204)
def delete_task(task_id: int):
    return controllers.delete_task(task_id)
