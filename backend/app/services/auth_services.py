from prisma import Prisma
from app.models.auth_model import AuthLogin
from app.models.auth_model import AuthCreate
import bcrypt


"""
Authentication Function
Parameters:
- db: Prisma client instance
- login_data: AuthLogin Pydantic model containing email and password
Returns:
- Staff record if authentication is successful, None otherwise
    
"""
async def authStaff(db: Prisma, login_data: AuthLogin):
    staff = await db.staff.find_unique(where={"email": login_data.email})
    if staff and bcrypt.checkpw(login_data.password.encode(), staff.passwordHash.encode()):
        return staff
    return None

async def registerStaff(db: Prisma, staff_data: AuthCreate):
    existing_staff = await db.staff.find_unique(where={"email": staff_data.email})
    if existing_staff:
        raise ValueError("Staff with this email already exists")

    passwordHash = bcrypt.hashpw(staff_data.password.encode(), bcrypt.gensalt()).decode()
    new_staff = await db.staff.create(data={
        "name": staff_data.name,
        "email": staff_data.email,
        "passwordHash": passwordHash
    })
    return new_staff
