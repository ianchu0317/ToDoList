from pydantic import BaseModel


class User(BaseModel):
    username: str
    password: str


class Task(BaseModel):
    id: int | None = None
    title: str
    description: str | None = None
    done: bool | None = False