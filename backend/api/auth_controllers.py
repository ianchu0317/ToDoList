from schemas import User
from fastapi import HTTPException
import db_controllers as db_ctrl


def validate_user(user: User):
    """Check if user is in database, raise exception if user exists"""
    if db_ctrl.is_user_in_db(user):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )