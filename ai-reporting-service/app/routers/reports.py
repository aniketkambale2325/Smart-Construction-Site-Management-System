from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
import uuid

from app.database import get_db
from app.models.models import ReportHistory
from app.schemas.report_schemas import ReportGenerateRequest, ReportGenerateResponse
from app.services.pdf_service import generate_repost_pdf
from app.services.storage_service import upload_pdf

router = APIRouter()

@router.post("/generate-pdf",response_model=ReportGenerateResponse)
def generate_pdf(request: ReportGenerateRequest, db: Session=Depends(get_db)):
    pdf_bytes = generate_repost_pdf(request.siteId, request.reportType,request.reportData)

    object_name = f"site-{request.siteId}/{request.reportType}-{uuid.uuid4()}.pdf"
    pdf_url = upload_pdf(object_name, pdf_bytes)

    history = ReportHistory(site_id=request.siteId, report_type=request.reportType, pdf_url=pdf_url)
    db.add(history)
    db.commit()

    return ReportGenerateResponse(pdfUrl=pdf_url)
