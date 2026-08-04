from minio import Minio
from minio.error import S3Error
import io



from app.config import MINIO_ENDPOINT, MINIO_ACCESS_KEY, MINIO_SECRET_KEY, MINIO_BUCKET

client = Minio(
     MINIO_ENDPOINT,
     access_key=MINIO_ACCESS_KEY,
     secret_key=MINIO_SECRET_KEY,
     secure=False,
)

def ensure_bucket():
    if not client.bucket_exists(MINIO_BUCKET):
        client.make_bucket(MINIO_BUCKET)


def upload_pdf(object_name:str, pdf_bytes) ->str:
    ensure_bucket()
    client.put_object(
        MINIO_BUCKET, object_name, io.BytesIO(pdf_bytes),
        length=len(pdf_bytes),
        content_type="application/pdf"
    )

    return f"http://{MINIO_ENDPOINT}/{MINIO_BUCKET}/{object_name}"
