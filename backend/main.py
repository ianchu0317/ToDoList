from fastapi import FastAPI, HTTPException
from schemas import Task
import controllers

app = FastAPI()

@app.get("/tasks", response_model=list[Task])
def read_tasks():
    return controllers.get_tasks()


@app.post("/task", response_model=Task, status_code=201)
def create_task(task: Task):
    return controllers.create_task(task)


@app.put("/task/{task_id}}", status_code=200)
def update_task(task_id: int, task: Task):
    task.id = task_id
    return controllers.update_task(task)


@app.delete("/tasks/{task_id}", status_code=204)
def delete_task(task_id: int):
    return controllers.delete_task(task_id)
