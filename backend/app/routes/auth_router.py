from fastapi import APIRouter, Depends, HTTPException
from prisma import Prisma
from app.models.auth_model import AuthLogin, AuthResponse, AuthCreate
from app.services.auth_services import authStaff, registerStaff 
from app.session import get_prisma
from app.utils.jwt_utils import generate_token

router = APIRouter(tags=["Auth"])

@router.post("/login")
async def login(login_data: AuthLogin, db: Prisma = Depends(get_prisma)):

    # Check for missing fields
    if not login_data.email:
        raise HTTPException(status_code=401, detail="email missing")
    if not login_data.password:
        raise HTTPException(status_code=401, detail="password missing")

    # Check credentials in database    
    staff = await authStaff(db, login_data)

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
        new_staff = await registerStaff(db, staff_data)
        return AuthResponse(
            id=new_staff.id,
            name=new_staff.name,
            email=new_staff.email,
            createdAt=new_staff.createdAt
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
