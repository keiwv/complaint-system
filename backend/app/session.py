from contextlib import asynccontextmanager
from fastapi import FastAPI
from prisma import Prisma

# Initialize Prisma Client
db = Prisma()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Connect to the database when the app starts
    await db.connect()
    yield
    # Disconnect from the database when the app shuts down
    await db.disconnect()

# Dependency to get the Prisma client
async def get_prisma():
    return db
