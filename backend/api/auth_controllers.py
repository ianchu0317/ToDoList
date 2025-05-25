from schemas import User
from fastapi import HTTPException
from passlib.context import CryptContext
import db_controllers as db_ctrl


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hash the password using SHA-256"""
    try: 
        hashed_password = pwd_context.hash(password)
    except AttributeError:
        pass
    return hashed_password


def validate_user(user: User):
    """Check if user is in database, raise exception if user exists"""
    if db_ctrl.is_user_in_db(user):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )


def login_user(user: User):
    plain_password = user.password
    db_hashed_password = db_ctrl.get_db_hashed_password(user)
    if not db_hashed_password:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )
    if not pwd_context.verify(plain_password, db_hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )
    return {"detail": "Login successful", 
            "access_token": {
                "token": "testing_token",
                "type": "bearer"
            }
        }
