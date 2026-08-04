from pydantic import BaseModel
from typing import Optional, Dict, Any

class ChatbotRequest(BaseModel):
    question: str
    projectContext: Optional[Dict[str, Any]] = None

class ChatbotResponse(BaseModel):
    answer: str