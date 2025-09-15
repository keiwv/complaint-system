from prisma import Prisma
from app.models.note_model import NoteCreate
from app.models.complaint_model import ComplaintResponse


"""
Create Note Function
    Parameters:
        - db: Prisma client instance
        - note_data: NoteCreate Pydantic model containing content, complaintId, authorId, and createdAt
"""
async def create_note(db: Prisma, note_data: NoteCreate):
    new_note = await db.note.create(data={
        "content": note_data.content,
        "complaintId": note_data.complaintId,
        "authorId": note_data.authorId,
        "createdAt": note_data.createdAt
    })
    return new_note

"""
Get Notes by Complaint Function
    Parameters:
        - db: Prisma client instance
        - complaint_id: ID of the complaint to retrieve notes for
    Returns:
        - List of NoteResponse Pydantic models
"""
async def get_notes_by_complaint(db: Prisma, complaint_id: int):
    notes = await db.note.find_many(where={"complaintId": complaint_id})
    return notes