import db_controllers as db_ctrl    
import jwt
from datetime import datetime, timezone, timedelta
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
from schemas import User, AccessToken
from fastapi import HTTPException

# password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# JWT generation details
# openssl rand -hex 32
SECRET_KEY = "367747ca7b7cd6c9f4ac3e5b865078276e48b32497669c4cbc8736fa78668eee"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 2


# AUXILIARY FUNCTIONS
def hash_password(password: str) -> str:
    """Hash the password using SHA-256"""
    try: 
        hashed_password = pwd_context.hash(password)
    except AttributeError:
        pass
    return hashed_password


def raise_invalid_user():
    """Raise exception if user is invalid"""
    raise HTTPException(
        status_code=401,
        detail="Invalid username or password"
    )


def create_token(user: User):
    """Create a token for the user"""
    data = {
        "sub": str(db_ctrl.get_db_user_id(user)),
        "username": user.username,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    } 
    jwt_token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    return jwt_token


def decode_token(token: str):
    """Decode the JWT token"""
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded_token
    except InvalidTokenError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )
    except jwt.exceptions.ExpiredSignatureError:
        raise HTTPException(
            status_code=401,
            detail="Token has expired"
        )
        

def get_user_id_from_token(token: str):
    """Get user ID from the token"""
    decoded_token = decode_token(token)
    return int(decoded_token.get("sub"))


# AUTHENTICATION ENDPOINTS FUNCTIONS
def validate_user(user: User):
    """Check if user is in database, raise exception if user exists"""
    if db_ctrl.is_user_in_db(user):
        raise HTTPException(
            status_code=409,
            detail="User already exists"
        )


def login_user(user: User):
    plain_password = user.password
    db_hashed_password = db_ctrl.get_db_hashed_password(user)
    if not db_hashed_password:
        raise_invalid_user()
    if not pwd_context.verify(plain_password, db_hashed_password):
        raise_invalid_user()
    return {
        "detail": "Login successful", 
        "access_token": AccessToken(
            token=create_token(user),
            token_type="bearer"
            )
        }
