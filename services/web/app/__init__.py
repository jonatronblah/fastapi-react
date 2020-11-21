from fastapi import Depends, FastAPI, Request
from fastapi.security import OAuth2PasswordBearer 

from app.routes.message import router as MessageRouter


app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


app.include_router(
MessageRouter, 
tags=["Message"], 
prefix="/message",
dependencies=[Depends(oauth2_scheme)])





@app.get("/test", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app!"}
