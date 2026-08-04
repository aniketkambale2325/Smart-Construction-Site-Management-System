from fastapi import APIRouter
from app.schemas.chatbot_schmas import ChatbotRequest, ChatbotResponse
from app.services.chatbot_service import answer_with_llm
#from app.services.chatbot_service import answer_faq

router = APIRouter()

@router.post("/query", response_model=ChatbotResponse)
def query(request: ChatbotRequest):
    answer = answer_with_llm(request.question)
    return ChatbotResponse(answer=answer)