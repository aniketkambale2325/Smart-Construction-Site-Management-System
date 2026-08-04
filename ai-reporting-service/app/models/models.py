from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database import Base

class ReportHistory(Base):
    __tablename__ = "report_history"
    id = Column(Integer, primary_key=True, index=True)
    site_id = Column(String)
    report_type = Column(String)
    pdf_url = Column(String)
    generated_at = Column(DateTime(timezone=True),server_default=func.now())


class AiLog(Base):
    __tablename__ = "ai_log"
    id = Column(Integer, primary_key=True, index=True)
    request_type = Column(String)
    input_ref = Column(String)
    output_summary = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ProgressEstimate(Base):
    __tablename__ = "progress_estimates"
    id = Column(Integer, primary_key=True, index = True)
    site_id = Column(Integer, index=True)
    before_image_url = Column(String)
    after_image_url = Column(String)
    estimated_percent = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
