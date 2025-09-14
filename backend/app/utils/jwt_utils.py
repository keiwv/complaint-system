from fastapi import HTTPException, Header
import jwt
from datetime import datetime, timedelta
from typing import Dict, Optional
import os

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key-here")
ALGORITHM = "HS256"
TOKEN_EXPIRE_HOURS = 24

def generate_token(payload: Dict) -> str:
    """Generate JWT token with expiration"""
    expire = datetime.utcnow() + timedelta(hours=TOKEN_EXPIRE_HOURS)
    payload.update({"exp": expire})
    
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token

def validate_token(token: str) -> Optional[Dict]:
    """Validate JWT token and return payload if valid"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

async def validate_token_header(authorization: str = Header(None)):
    """Extract and validate token from Authorization header"""
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header format")
    
    token = authorization.replace("Bearer ", "")
    payload = validate_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return {"token": token, "user": payload}

def get_current_user_from_token(token: str) -> Optional[Dict]:
    """Extract user information from token"""
    payload = validate_token(token)
    if payload:
        return {
            "user_id": payload.get("user_id"),
            "email": payload.get("email")
        }
    return None
    return None
