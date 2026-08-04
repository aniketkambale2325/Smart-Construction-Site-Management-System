from datetime import date

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import ProgressEstimate
from app.routers.reports import router
from app.schemas.progress_schemas import ImageCompareRequest, ImageCompareResponse
from app.services.delay_service import predict_delay
from app.services.image_service import compare_image


router = APIRouter()

@router.post("/compare-image", response_model= ImageCompareResponse)
def compare(request: ImageCompareRequest, db:Session = Depends(get_db)):
    percent = compare_image(request.beforeUrl, request.afterUrl)

    estimate = ProgressEstimate(
        site_id=request.siteId,
        before_image_url=request.beforeUrl,
        after_image_url=request.afterUrl,
        estimated_percent=percent,
    )
    db.add(estimate)
    db.commit()

    return ImageCompareResponse(percentEstimate=percent)

class DelayPredictRequest(BaseModel):
    siteId: int
    plannedEndDate: date

@router.post("/predict-delay")
def predict(request: DelayPredictRequest, db: Session = Depends(get_db)):
    return predict_delay(db, request.siteId, request.plannedEndDate)