import motor.motor_asyncio
from bson.objectid import ObjectId

MONGO_DETAILS = "mongodb://db:27017"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.messages

messages_collection = database.get_collection("messages_collection")

def message_helper(message) -> dict:
    return {
        "id": str(message["_id"]),
        "username": message["username"],
        "subject": message["subject"],
        "datetime": message["datetime"],
        "body": message["body"],
    }
    
# Retrieve all students present in the database
async def retrieve_messages():
    messages = []
    async for message in messages_collection.find():
        messages.append(message_helper(message))
    return messages


# Add a new student into to the database
async def add_message(message_data: dict) -> dict:
    message = await messages_collection.insert_one(message_data)
    new_message = await messages_collection.find_one({"_id": message.inserted_id})
    return message_helper(new_message)


# Retrieve a student with a matching ID
async def retrieve_message(id: str) -> dict:
    message = await messages_collection.find_one({"_id": ObjectId(id)})
    if message:
        return message_helper(message)


# Update a student with a matching ID
async def update_message(id: str, data: dict):
    # Return false if an empty request body is sent.
    if len(data) < 1:
        return False
    message = await messages_collection.find_one({"_id": ObjectId(id)})
    if message:
        updated_message = await messages_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_message:
            return True
        return False


# Delete a student from the database
async def delete_message(id: str):
    message = await messages_collection.find_one({"_id": ObjectId(id)})
    if student:
        await messages_collection.delete_one({"_id": ObjectId(id)})
        return True