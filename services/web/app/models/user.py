from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class UserSchema(BaseModel):
    username: str = Field(...)
    hashed_password: str = Field(...)
    email: EmailStr = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "username": "jonatron",
                "password": "secret",
                "email": "jonatron@site.net",
            }
        } 

class UserSchemaOut(BaseModel):
    username: str = Field(...)
    email: EmailStr = Field(...)


class LoginSchema(BaseModel):
    username: str = Field(...)
    password: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "username": "jonatron",
                "password": "secret",
            }
        }            
    
    
def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}