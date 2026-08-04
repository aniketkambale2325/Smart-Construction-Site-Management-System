import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL","postgresql://postgres:password@localhost:5432/construction_db")
MINIO_ENDPOINT = os.getenv("MINIO_ENDPOINT", "localhost:9000")
MINIO_ACCESS_KEY = os.getenv("MINIO_ROOT_USER","admin")
MINIO_SECRET_KEY = os.getenv("MINIO_ROOT_PASSWORD", "password123")
MINIO_BUCKET = os.getenv("MINIO_BUCKET", "reports")
LLM_API_KEY = os.getenv("OPENAI_API_KEY","AQ.Ab8RN6LEnMOQ0iRIuM_EzBAgBAWAjkNSU-VpNyRXIuUVnQapRw")