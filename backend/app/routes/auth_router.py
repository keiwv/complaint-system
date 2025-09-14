from fastapi import APIRouter, Depends, HTTPException
from prisma import Prisma
from app.models.auth_model import AuthLogin, AuthResponse, AuthCreate
from app.services.auth_services import auth_staff, register_staff 
from app.session import get_prisma
from app.utils.jwt_utils import generate_token
from app.utils.email_utils import is_valid_email

router = APIRouter(tags=["Auth"])

@router.post("/login")
async def login(login_data: AuthLogin, db: Prisma = Depends(get_prisma)):

    # Check for missing fields
    if not is_valid_email(login_data.email):
        raise HTTPException(status_code=401, detail="Invalid email format")
    if not login_data.password:
        raise HTTPException(status_code=401, detail="Password missing")

    # Check credentials in database    
    staff = await auth_staff(db, login_data)

    # If it doesn't exist or password is wrong
    if not staff:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Generate token
    token = generate_token({"user_id": staff.id, "email": staff.email})
    
    return {
        "data": {
            "id": staff.id,
            "name": staff.name,
            "email": staff.email,
            "createdAt": staff.createdAt
        },
        "token": token
    }

@router.post("/register", response_model=AuthResponse)
async def register(staff_data: AuthCreate, db: Prisma = Depends(get_prisma)):
    try:
        new_staff = await register_staff(db, staff_data)
        return AuthResponse(
            id=new_staff.id,
            name=new_staff.name,
            email=new_staff.email,
            createdAt=new_staff.createdAt
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
