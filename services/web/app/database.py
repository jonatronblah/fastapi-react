import databases
import sqlalchemy
import os

from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
def get_password_hash(password):
    return pwd_context.hash(password)

DATABASE_URL = os.getenv("DATABASE_URL")

database = databases.Database(DATABASE_URL)

metadata = sqlalchemy.MetaData()

users = sqlalchemy.Table(
    "users",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("username", sqlalchemy.String),
    sqlalchemy.Column("hashed_password", sqlalchemy.String),
    sqlalchemy.Column("email", sqlalchemy.String),
)


engine = sqlalchemy.create_engine(
    DATABASE_URL)
metadata.create_all(engine)




async def add_user(user_data: dict) -> dict:
    user_data["hashed_password"] = get_password_hash(user_data["hashed_password"])
    query = users.insert().values(username=user_data["username"], hashed_password=user_data["hashed_password"], email=user_data["email"])
    last_record_id = await database.execute(query)
    
    return {**user_data, "id": last_record_id}

async def delete_user(id: str):
    query = users.delete().where(users.c.id == int(id))
    await database.execute(query=query)
    return True


'''
async def delete_user(id: str):
    query = f"SELECT * FROM USERS WHERE id = {id}"
    user = await database.fetch_all(query=query)
    if user:
        query = 
        await database.execute(query=query)
        return True
'''       
async def get_user(username: str):
    user = await users_collection.find_one({"username": username})
    if user:
       return user_helper(user)         

