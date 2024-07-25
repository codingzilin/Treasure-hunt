from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import uuid
import math

app = FastAPI()

users = {}
hints = [
  "The treasure is hidden in a city known for its history.",
  "Look for a landmark that stands tall and proud.",
  "The final location is near water."
]
treasure_location = {"lat": 37.7749, "lng": -122.4194}

class User(BaseModel):
  name: str
  email: str

class Location(BaseModel):
  lat: float
  lng: float

class UpdateLocation(BaseModel):
  email: str
  location: Location

class Answer(BaseModel):
  email: str
  answer: str

@app.post("/api/register")
async def register(user: User):
  if user.email in users:
    raise HTTPException(status_code=409, detail="User already exists")
  users[user.email] = {
    "name": user.name,
    "location": None,
    "progress": 0,
    "score": 0,
  }
  return {"message": "User registered successfully"}

@app.post("/api/location")
async def update_location(location: UpdateLocation):
  if update.email not in users:
    raise HTTPException(status_code=404, detail="User not found")
  users[update.email]["location"] = update.location.dict()
  return {"message": "Location updated successfully"}

@app.get("/api/hints")
async def get_hints(email: str):
  if email not in users:
    raise HTTPException(status_code=404, detail="User not found")
  progress = users[email]["progress"]
  return hints[:progress + 1]

@app.post("/api/answer")
async def answer(answer: Answer):
  if answer.email not in users:
    raise HTTPException(status_code=404, detail="User not found")
  
  correct_answers = ["New York City", "Statue of Liberty", "Near the harbor"]
  user = users[answer.email]

  if answer.answer.lower() == correct_answers[user["progress"]].lower():
    user["progress"] += 1
    user["score"] += 10

    if user["progress"] == len(correct_answers):
      return {"message": "Congratulations! You've solved all the riddles. Now find the treasure!"}
    else:
      return {"message": "Correct! Here's your next hint.", "hint": hints[user["progress"]]}

  else: 
    return {"message": "Incorrect answer. Try again!"}

@app.post("/api/find-treasure")
async def find_treasure(user: User):
  if user.email not in users:
    raise HTTPException(status_code=404, detail="User not found")

  user_location = users[user.email]["location"]
  if not user_location:
    return {"message": "Update your lcoation first!"}

  distance = calculate_distance(user_location, treasure_location)

  if distance <= 10:
    users[user.email]["score"] += 100
    return {"message": "Congratulations! You've found the treasure!"}
  else:
    return {"message": f"Keep searching! You're {distance:.2f} km away from the treasure."}

@app.get("/api/leaderboard")
async def get_leaderboard():
  leaderboard = sorted()