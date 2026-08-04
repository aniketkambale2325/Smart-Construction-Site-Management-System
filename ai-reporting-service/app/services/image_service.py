import cv2
import numpy as np
import httpx
from skimage.metrics import structural_similarity as ssim

def load_image_from_url(url:str) -> np.ndarray:
    reponse = httpx.get(url, timeout=10.0)
    reponse.rise_for_status()
    image_array = np.frombuffer(reponse.content, np.uint8)
    return cv2.imdecode(image_array, cv2.IMREAD_COLOR)

def compare_image(before_url:str, after_url:str)-> int:
    before = load_image_from_url(before_url)
    after = load_image_from_url(after_url)

    # resize to the same dimensions for a fair comparison
    after = cv2.resize(after, (before.shape[1], before.shape[0]))

    before_gray = cv2.cvtColor(before, cv2.COLOR_BGR2GRAY)
    after_gray = cv2.cvtColor(after, cv2.COLOR_BGR2GRAY)

    similarity_score, _ = ssim(before_gray, after_gray, full=True)

    # lower similarity = more visual change = more construction activity/progress
    # this is a heuristic, not a calibrated measurement -- document this clearly in your report
    change_ratio = 1 - similarity_score
    percent_estimate = min(100, round(change_ratio * 150))  # scaling factor tuned by eye

    return percent_estimate