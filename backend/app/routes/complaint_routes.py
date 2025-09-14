from fastapi import APIRouter, Depends, HTTPException
from prisma import Prisma
from app.models.complaint_model import ComplaintCreate, ComplaintResponse
from app.services.complaint_services import create_complaint, get_complaints
from app.session import get_prisma

router = APIRouter(tags=["Complaints"])

@router.post("/complaints", response_model=ComplaintCreate)
async def create_complaint_route(complaint_data: ComplaintCreate, db: Prisma = Depends(get_prisma)):
    """Route to create a new complaint"""
    try:

        if not complaint_data.customerEmail:
            raise HTTPException(status_code=400, detail="customerEmail is required")
        if not complaint_data.description:
            raise HTTPException(status_code=400, detail="description is required")
        
        new_complaint = await create_complaint(db, complaint_data)
        return new_complaint
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/complaints", response_model=list[ComplaintResponse])
async def get_complaints_route(db: Prisma = Depends(get_prisma)):
    """Route to get all complaints"""
    try:
        complaints = await get_complaints(db)
        return complaints
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))