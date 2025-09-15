from pydantic import BaseModel, Field
from typing import Optional, List
from app.models.enum import ComplaintStatus
from app.models.note_model import Note
import datetime


class ComplaintResponse(BaseModel):
    id: int = Field(..., description="The unique identifier for the complaint")
    customerEmail: str = Field(..., description="Email of the customer")
    description: str = Field(..., description="Text of the complaint")
    status: ComplaintStatus = Field(..., description="Status of the complaint: PENDING, IN_PROGRESS, RESOLVED")
    dueDate: Optional[datetime.datetime] = Field(None, description="Due date for resolving the complaint in datetime format")
    createdAt: datetime.datetime = Field(..., description="Timestamp when the complaint was created")
    assignedStaffId: Optional[int] = Field(None, description="ID of the staff assigned to this complaint")
    notes: Optional[List[Note]] = Field(default_factory=list, description="List of notes for this complaint")

class ComplaintCreate(BaseModel):
    customerEmail: str = Field(..., description="Email of the customer")
    description: str = Field(..., description="Text of the complaint")
    status: ComplaintStatus = Field(default=ComplaintStatus.PENDING, description="Status of the complaint: PENDING, IN_PROGRESS, RESOLVED")
    createdAt: datetime.datetime = Field(default_factory=datetime.datetime.now, description="Timestamp when the complaint was created")

class ComplaintUpdate(BaseModel):
    status: Optional[ComplaintStatus] = Field(None, description="Status of the complaint: PENDING, IN_PROGRESS, RESOLVED")
    dueDate: Optional[datetime.datetime] = Field(None, description="Due date for resolving the complaint in datetime format")