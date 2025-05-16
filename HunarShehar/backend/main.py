from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any
from api_service import HunarSheherAPIService
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your PWA's domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize API service
api_service = HunarSheherAPIService()

class LearningRequest(BaseModel):
    userInput: str
    context: Optional[Dict[str, Any]] = None

@app.post("/api/learning/process")
async def process_learning(request: LearningRequest):
    try:
        response = await api_service.process_learning_request(
            request.userInput,
            request.context
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/learning/progress/{user_id}")
async def get_progress(user_id: str):
    try:
        response = await api_service.get_learning_progress(user_id)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 