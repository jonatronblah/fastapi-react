from fastapi import Depends, FastAPI

from app.database import database

from app.routes.user import router as UserRouter
from app.authenticate import router as TokenRouter
from app.authenticate import get_current_user



app = FastAPI()

@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()



app.include_router(
UserRouter, 
tags=["User"], 
prefix="/user")

app.include_router(
TokenRouter, 
tags=["Token"], 
prefix="/token")


