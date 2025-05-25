import os
import mysql.connector
import auth_controllers as auth_ctrl
from fastapi import HTTPException
from schemas import Task, User, AccessToken


# AUXILIARY FUNCTIONS
def get_db_connection():
    """Get connection with database"""
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT", "3306"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")        
    )


"""def generate_task_id():
    cnx = get_db_connection()
    cursor = cnx.cursor()
    cursor.execute("SELECT COUNT(*) FROM tasks")
    (count, ) = cursor.fetchone()
    cursor.close()
    cnx.close()
    return (count + 1)"""


def get_task_data(task: Task) -> dict:
    return {
        "user_id": task.user_id,
        "title": task.title,
        "description": task.description,
        "done": task.done   
    }


def raise_invalid_task():
    raise HTTPException(
        status_code=404,
        detail="Invalid task id"
    )


# USER ENDPOINTS FUNCTIONS
def is_user_in_db(user: User):
    username = user.username
    cnx = get_db_connection()
    cursor = cnx.cursor()
    
    cursor.execute("SELECT COUNT(*) FROM users "
                   "WHERE username = %(username)s;",
                   {"username": username})
    (count, ) = cursor.fetchone()
    
    cursor.close()
    cnx.close()
    
    return count > 0

def get_db_hashed_password(user: User):
    cnx = get_db_connection()
    cursor = cnx.cursor()
    
    cursor.execute("SELECT * FROM users "
                   "WHERE username = %(username)s;",
                   {"username": user.username})
    (id, username, hashed_password) = cursor.fetchone()    
    cursor.close()
    cnx.close()
    
    return hashed_password


def get_db_user_id(user: User):
    cnx = get_db_connection()
    cursor = cnx.cursor()
    
    cursor.execute("SELECT * FROM users "
                   "WHERE username = %(username)s;",
                   {"username": user.username})
    (id, username, hashed_password) = cursor.fetchone()    
    cursor.close()
    cnx.close()
    
    return id


def create_user(user: User):
    user_data = {
        "username": user.username,
        "hashed_password": auth_ctrl.hash_password(user.password)
    }
    
    cnx = get_db_connection()
    cursor = cnx.cursor()
    
    cursor.execute(
        "INSERT INTO users (username, hashed_password) "
        "VALUES (%(username)s, %(hashed_password)s);", 
        user_data
        )
    cnx.commit()
    cursor.close()
    cnx.close()

    return {
        "detail": "User created", 
        "access_token": AccessToken(
            token=auth_ctrl.create_token(user),
            token_type="bearer"
            )
        }


# TASK ENDPOINTS FUNCTIONS
def get_tasks(token: str):
    cnx = get_db_connection()
    cursor = cnx.cursor()
    
    cursor.execute("SELECT * FROM tasks "
                   "WHERE user_id = %(user_id)s;",
                   {"user_id": auth_ctrl.get_user_id_from_token(token)})
    tasks = [Task(id=id, 
                  user_id=user_id,
                  title=title,
                  description=description,
                  done=done) 
             for (id, user_id, title, description, done) in cursor]
    
    cursor.close()
    cnx.close()
    return tasks


def create_task(task: Task, token: str):
    task.user_id = auth_ctrl.get_user_id_from_token(token)
    task_data = get_task_data(task)
    
    cnx = get_db_connection()
    cursor = cnx.cursor()
    
    cursor.execute(
        "INSERT INTO tasks (user_id, title, description, done) "
        "VALUES (%(user_id)s, %(title)s, %(description)s, %(done)s);", 
        task_data
        )
    cnx.commit()
    task.id=cursor._last_insert_id
    cursor.close()
    cnx.close()

    return {"detail": "Task created", "task": task}


def update_task(task_id: int, task: Task):   
    task_data = get_task_data(task)
    task_data["id"] = task_id
    task.id = task_id  # for return
    
    cnx = get_db_connection()
    cursor = cnx.cursor()
    
    cursor.execute(
        "UPDATE tasks "
        "SET title = %(title)s, description = %(description)s, done = %(done)s "
        "WHERE id = %(id)s ;", 
        task_data
        )        
    cnx.commit()
    
    if cursor.rowcount == 0:
        cursor.close()
        cnx.close()
        raise_invalid_task()
    
    cursor.close()
    cnx.close()
    
    return {"detail": "Task updated", "task": task}


def delete_task(task_id: int):
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