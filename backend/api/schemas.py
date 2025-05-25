from pydantic import BaseModel


class User(BaseModel):
    username: str
    password: str

class AccessToken(BaseModel):
    token: str
    token_type: str = "bearer"

class Task(BaseModel):
    id: int | None = None
    user_id: int | None = None
    title: str
    description: str | None = None
    done: bool | None = False