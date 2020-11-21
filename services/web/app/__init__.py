from fastapi import FastAPI, Request

from app.routes.message import router as MessageRouter


app = FastAPI()

app.include_router(MessageRouter, tags=["Message"], prefix="/message")





@app.get("/test", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app!"}
