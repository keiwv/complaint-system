from fastapi import APIRouter, HTTPException, Depends
from prisma import Prisma
from app.models.note_model import NoteCreate, NoteResponse
from app.services.note_services import create_note, get_notes_by_complaint
from app.session import get_prisma
from app.utils.jwt_utils import validate_token_header

router = APIRouter(tags=["Notes"])

@router.post("/notes", response_model=NoteResponse)
async def create_note_route(note_data: NoteCreate, db: Prisma = Depends(get_prisma), current_user: dict = Depends(validate_token_header)):
    """Route to create a new note"""
    try:
        """Validate required fields"""
        if not note_data.content:
            raise HTTPException(status_code=400, detail="content is required")
        if not note_data.complaintId:
            raise HTTPException(status_code=400, detail="complaintId is required")
        if not note_data.authorId:
            raise HTTPException(status_code=400, detail="authorId is required")
        
        """Create the note"""
        new_note = await create_note(db, note_data)
        return new_note
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/notes/complaint/{complaint_id}", response_model=list[NoteResponse])
async def get_notes_by_complaint_route(complaint_id: int, db: Prisma = Depends(get_prisma), current_user: dict = Depends(validate_token_header)):
    """Route to get all notes for a specific complaint"""
    try:
        notes = await get_notes_by_complaint(db, complaint_id)
        return notes
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))