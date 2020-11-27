from fastapi import Depends, FastAPI

from app.routes.message import router as MessageRouter
from app.routes.user import router as UserRouter



app = FastAPI()




app.include_router(
MessageRouter, 
tags=["Message"], 
prefix="/message")

app.include_router(
UserRouter, 
tags=["User"], 
prefix="/user")


