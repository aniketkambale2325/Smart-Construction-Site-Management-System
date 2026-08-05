from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import reports, progress, chatbot
from app.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI & Reporting Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(reports.router, prefix="/api/reports", tags=["reports"])
app.include_router(progress.router, prefix="/api/progress", tags=["progress"])
app.include_router(chatbot.router, prefix="/api/chatbot", tags=["chatbot"])

@app.get("/health")
def health():
    return {"status":"ok"}
