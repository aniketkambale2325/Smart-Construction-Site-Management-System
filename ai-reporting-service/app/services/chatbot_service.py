#FAQ/Intent Matching (zero external dependency, always works)
# FAQ_RESPONSES = {
#     "progress": "You can check a site's progress percentage on the project dashboard or in the latest daily report.",
#     "material": "Material requests can be raised from the Materials section, and low-stock items are flagged automatically.",
#     "attendance": "Attendance is marked daily by the site engineer or supervisor and is visible in the employee's attendance history.",
#     "salary": "Salaries are calculated based on days present multiplied by the employee's daily rate, generated monthly.",
#     "report": "Daily, weekly, and completion reports are generated as PDFs and available in the Reports section.",
# }
#
# def answer_faq(question: str) -> str:
#     question_lower = question.lower()
#     for keyword, response in FAQ_RESPONSES.items():
#         if keyword in question_lower:
#             return response
#     return "I don't have specific information on that yet -- please check with your site engineer or contractor."
from http.client import responses

#=======================================================================================================================================
#Single LLM API Call (better answers, needs an API key)
# app/services/chatbot_service.py (alternative)
import httpx
from app.config import LLM_API_KEY

def answer_with_llm(question: str, project_context: dict) -> str:
    system_prompt = (
        "You are a helpful assistant for a construction site management system. "
        f"Project context: {project_context}. Answer concisely based on this context."
    )

    response = httpx.post(
        "https://api.openai.com/v1/chat/completions",
        headers={"Authorization": f"Bearer {LLM_API_KEY}"},
        json={
            "model": "gpt-4o-mini",
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": question},
            ],
            "max_tokens": 200,
        },
        timeout=15.0,
    )
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]

