from fastapi import FastAPI, Request

from app.routes.student import router as StudentRouter


app = FastAPI()

app.include_router(StudentRouter, tags=["Student"], prefix="/student")





@app.get("/test", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app!"}
