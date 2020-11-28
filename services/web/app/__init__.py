from fastapi import Depends, FastAPI

from app.routes.message import router as MessageRouter
from app.routes.user import router as UserRouter
from app.authenticate import router as TokenRouter
from app.authenticate import get_current_user



app = FastAPI()




app.include_router(
MessageRouter, 
tags=["Message"], 
prefix="/message",
dependencies=[Depends(get_current_user)])

app.include_router(
UserRouter, 
tags=["User"], 
prefix="/user")

app.include_router(
TokenRouter, 
tags=["Token"], 
prefix="/token")


