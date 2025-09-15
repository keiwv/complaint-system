from fastapi import FastAPI, Response
import logging
from app.session import lifespan 
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from app.routes.auth_router import router as auth_router
from app.routes.complaint_routes import router as complaint_router
from app.routes.note_services import router as note_router

logger = logging.getLogger(__name__)

app = FastAPI(
    title="Complaint Service API",
    description="Complaint Service - manages customer complaints",
    version="1.0.0",
    lifespan=lifespan,
    root_path="/apiv1"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

# Include the auth router
app.include_router(auth_router)

# Include the complaint router
app.include_router(complaint_router)

# Include the note router
app.include_router(note_router)


logger.info("Complaint Service is up and running.")
