from pydantic import BaseModel

class ImageCompareRequest(BaseModel):
    beforeUrl: str
    afterUrl: str
    siteId: int

class ImageCompareResponse(BaseModel):
    percentEstimate: int