import mysql.connector
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


def add_task(task: Task):
    task.id = generate_task_id()
    task_data = {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "done": task.done        
    }
    
    cnx = get_db_connection()
    cursor = cnx.cursor()
    
    cursor.execute("INSERT INTO tasks "
                   "(id, title, description, done)"
                   "VALUES (%(id)s, %(title)s, %(description)s, %(done)s);",
                   task_data)
    cnx.commit()
    cursor.close()
    cnx.close()

    return task

