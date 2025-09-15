from prisma import Prisma
from app.models.complaint_model import ComplaintCreate, ComplaintUpdate

"""
Create Complaint Function
    Parameters:
        - db: Prisma client instance
        - complaint_data: ComplaintCreate Pydantic model containing customerEmail and description
    Returns:
        - Newly created Complaint record
"""
async def create_complaint(db: Prisma, complaint_data: ComplaintCreate):
    new_complaint = await db.complaint.create(data={
        "customerEmail": complaint_data.customerEmail,
        "description": complaint_data.description
    })
    return new_complaint

"""
Get All Complaints Function
    Parameters:
        - db: Prisma client instance
    Returns:
        - List of all Complaint records
"""
async def get_complaints(db: Prisma):
    complaints = await db.complaint.find_many()
    return complaints


"""Update Complaint Function
    Parameters:
        - db: Prisma client instance
        - complaint_id: ID of the complaint to update
        - data: ComplaintUpdate Pydantic model containing fields to update
        Returns:
        - Updated Complaint record
"""
async def update_complaint(db: Prisma, complaint_id: int, data: ComplaintUpdate):
    updated_complaint = await db.complaint.update(
        where={"id": complaint_id},
        data={**data.model_dump(exclude_unset=True)}
    )
    return updated_complaint

""" Get Complaint by ID Function
    Parameters:
        - db: Prisma client instance
        - complaint_id: ID of the complaint to retrieve
    Returns:
        - Complaint record if found, None otherwise
"""
async def get_complaint_by_id(db: Prisma, complaint_id: int):
    complaint = await db.complaint.find_unique(where={"id": complaint_id})
    return complaint