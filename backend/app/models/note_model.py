from pydantic import BaseModel, Field
import datetime

class Note(BaseModel):
    id: int = Field(..., description="The unique identifier for the note")
    content: str = Field(..., description="Content of the note")
    createdAt: datetime.datetime = Field(..., description="Timestamp when the note was created")
    complaintId: int = Field(..., description="ID of the complaint this note belongs to")
    authorId: int = Field(..., description="ID of the staff member who wrote this note")

class NoteCreate(BaseModel):
    content: str = Field(..., description="Content of the note")
    complaintId: int = Field(..., description="ID of the complaint this note belongs to")
    authorId: int = Field(..., description="ID of the staff member who wrote this note")
    createdAt: datetime.datetime = Field(default_factory=datetime.datetime.now, description="Timestamp when the note was created")

class NoteResponse(Note):
    pass