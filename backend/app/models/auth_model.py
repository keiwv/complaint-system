from pydantic import BaseModel, Field
import datetime

class AuthLogin(BaseModel):
    email: str = Field(..., description="Email address of the staff member")
    password: str = Field(..., description="Password of the staff member")

class AuthCreate(BaseModel):
    email: str = Field(..., description="Email address of the staff member")
    password: str = Field(..., description="Password of the staff member")
    name: str = Field(..., description="Name of the staff member")

class AuthResponse(BaseModel):
    id: int = Field(..., description="The unique identifier for the staff member")
    name: str = Field(..., description="Name of the staff member")
    email: str = Field(..., description="Email address of the staff member")
    createdAt: datetime.datetime = Field(..., description="Timestamp when the staff member was created")