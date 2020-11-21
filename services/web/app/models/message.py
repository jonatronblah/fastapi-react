from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class MessageSchema(BaseModel):
    username: str = Field(...)
    subject: str = Field(...)
    body: str = Field(...)
    datetime: int = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "username": "jonatron",
                "subject": "Hello!",
                "body": "What's going on?",
                "datetime": 1605878054,
            }
        }


class UpdateMessageModel(BaseModel):
    username: Optional[str]
    subject: Optional[str]
    body: Optional[str]
    datetime: Optional[int]

    class Config:
        schema_extra = {
            "example": {
                "username": "jonatron",
                "subject": "Hello!",
                "body": "What's going on?",
                "datetime": 1605878054,
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
