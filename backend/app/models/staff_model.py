from pydantic import BaseModel, Field
import datetime

class Staff(BaseModel):
    id: int = Field(..., description="The unique identifier for the staff member")
    name: str = Field(..., description="Name of the staff member")
    email: str = Field(..., description="Email address of the staff member")
    passwordHash: str = Field(..., description="Hashed password of the staff member")
    createdAt: datetime.datetime = Field(..., description="Timestamp when the staff member was created")

