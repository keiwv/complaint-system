from prisma import Prisma
from app.models.complaint_model import ComplaintCreate
from app.models.enum import ComplaintStatus

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