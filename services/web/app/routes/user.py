from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from ..database import (
    add_user,
    delete_user,
    verify_user,
)
from ..models.user import (
    ErrorResponseModel,
    ResponseModel,
    UserSchema,
    LoginSchema,
)

router = APIRouter()

@router.post("/login", response_description="Login as an existing user")
async def add_user_data(user: LoginSchema = Body(...)):
    user = jsonable_encoder(user)
    user = await verify_user(user)
    return ResponseModel(user, "User login successfull.")
    
@router.post("/", response_description="Register a new user in the database")
async def add_user_data(user: UserSchema = Body(...)):
    user = jsonable_encoder(user)
    new_user = await add_user(user)
    return ResponseModel(new_user, "User registered successfully.")
    
    
@router.delete("/{id}", response_description="User data deleted from the database")
async def delete_user_data(id: str):
    deleted_user = await delete_user(id)
    if deleted_user:
        return ResponseModel(
            "User with ID: {} removed".format(id), "User deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred", 404, "User with id {0} doesn't exist".format(id)
    )