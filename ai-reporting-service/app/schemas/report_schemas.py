from pydantic import BaseModel
from typing import Optional

class ReportGenerateRequest(BaseModel):
    siteId:int
    reportType: str
    reportData: dict


class ReportGenerateResponse(BaseModel):
    pdfUrl:str
