import mysql.connector
from fastapi import HTTPException
from schemas import Task


# DB CONTROLLERS
def get_db_connection():
    """Get connection with database"""
    return mysql.connector.connect(
        host="127.0.0.1",
        user="todo",
        password="todo_password",
        database="todo_list"
    )


# API CONTROLLERS
def generate_task_id():
    cnx = get_db_connection()
    cursor = cnx.cursor()
    cursor.execute("SELECT COUNT(*) FROM tasks")
    (count, ) = cursor.fetchone()
    cursor.close()
    cnx.close()
    return (count + 1)


def get_task_data(task: Task) -> dict:
    return {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "done": task.done   
    }


def raise_invalid_task():
    raise HTTPException(
        status_code=404,
        detail="Invalid task id"
    )
    

def get_tasks():
    cnx = get_db_connection()
    cursor = cnx.cursor()
    
    cursor.execute("SELECT * FROM tasks")
    tasks = [Task(id=id, 
                  title=title,
                  description=description,
                  done=done) 
             for (id, title, description, done) in cursor]
    
    cursor.close()
    cnx.close()
    return tasks


def create_task(task: Task):
    task.id = generate_task_id()
    task_data = get_task_data(task)
    
    cnx = get_db_connection()
    cursor = cnx.cursor()
    
    cmd = ("INSERT INTO tasks "
           "(id, title, description, done) "
           "VALUES (%(id)s, %(title)s, %(description)s, %(done)s);")
    cursor.execute(cmd, task_data)
    cnx.commit()
    
    cursor.close()
    cnx.close()

    return {"detail": "Task created", "task": task}
            


def update_task(task: Task) -> Task:   
    task_data = get_task_data(task)
    
    cnx = get_db_connection()
    cursor = cnx.cursor()
    
    cmd = ("UPDATE tasks "
           "SET title = %(title)s, description = %(description)s, done = %(done)s "
           "WHERE id = %(id)s ;")
    cursor.execute(cmd, task_data)        
    cnx.commit()
    
    if cursor.rowcount == 0:
        cursor.close()
        cnx.close()
        raise_invalid_task()

    cursor.close()
    cnx.close()
    
    return {
        "detail": "Task updated", 
        "task": task
        }


def delete_task(task_id):
    cnx = get_db_connection()
    cursor = cnx.cursor()
    
    cmd = ("DELETE FROM tasks "
           "WHERE id=%(id)s;")
    cursor.execute(cmd, {"id": task_id})
    cnx.commit()
    
    if cursor.rowcount == 0:
        cursor.close()
        cnx.close()
        raise_invalid_task()
    
    cursor.close()
    cnx.close()