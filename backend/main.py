from fastapi import FastAPI, HTTPException
from schemas import Task
import controllers

app = FastAPI()

@app.get("/tasks", response_model=list[Task])
def read_tasks():
    return controllers.get_tasks()


@app.post("/task", response_model=Task)
def create_task(task: Task):
    return controllers.add_task(task)


@app.put("/task", response_model=Task)
def update_task(task: Task):
    if  (task.id <= 0) or (task.id >= controllers.generate_task_id()):
        raise HTTPException(
            status_code=404,
            detail="Invalid task id"
        )
    return controllers.update_task(task)
