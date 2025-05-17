from fastapi import FastAPI
from schemas import Task
import controllers

app = FastAPI()

@app.get("/tasks", response_model=list[Task])
def read_tasks():
    return controllers.get_tasks()


@app.post("/task", response_model=Task)
def create_task(task: Task):
    return controllers.add_task(task)