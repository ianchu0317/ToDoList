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

print(get_tasks())