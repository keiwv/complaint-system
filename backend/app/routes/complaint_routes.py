from fastapi import APIRouter, Depends, HTTPException, Header
from prisma import Prisma
from app.models.complaint_model import ComplaintCreate, ComplaintResponse, ComplaintUpdate
from app.services.complaint_services import create_complaint, get_complaint_by_id, get_complaints, update_complaint
from app.session import get_prisma
from app.utils.jwt_utils import validate_token_header
from app.models.enum import ComplaintStatus


router = APIRouter(tags=["Complaints"])

""" A customer can create a complaint without authentication, but to view complaints authentication is required """
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


""" Get all complaints requires authentication """
@router.get("/complaints", response_model=list[ComplaintResponse])
async def get_complaints_route(db: Prisma = Depends(get_prisma), current_user: dict = Depends(validate_token_header)):
    """Route to get all complaints"""
    try:
        complaints = await get_complaints(db)
        return complaints
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
""" Update complaint status """
@router.patch("/complaints/{complaint_id}", response_model = ComplaintResponse)
async def update_complaint_route(complaint_id: int, data: ComplaintUpdate, db: Prisma = Depends(get_prisma), current_user: dict = Depends(validate_token_header)):
    """Route to update the status of a complaint"""
    try:
        updated_complaint = await update_complaint(db, complaint_id, data)
        return updated_complaint
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
""" Get complaint by ID """
@router.get("/complaints/{complaint_id}", response_model=ComplaintResponse)
async def get_complaint_by_id_route(complaint_id: int, db: Prisma = Depends(get_prisma), current_user: dict = Depends(validate_token_header)):
    """Route to get a complaint by ID"""
    try:
        complaint = await get_complaint_by_id(db, complaint_id)
        if not complaint:
            raise HTTPException(status_code=404, detail="Complaint not found")
        return complaint
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))