import cv2
import numpy as np
import albumentations as A
from albumentations.pytorch import ToTensorV2

def preprocess_xray(image, **kwargs):
    image = image.astype(np.uint8)
    if len(image.shape) == 3 and image.shape[2] == 3:
        image = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
    
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    clahe_img = clahe.apply(image)
    equalized = cv2.equalizeHist(clahe_img)
    normalized = cv2.normalize(equalized, None, 0, 255, cv2.NORM_MINMAX)
    
    return normalized

augmentation_pipeline = A.Compose([
    A.Resize(224, 224),
    A.Normalize(mean=0.5, std=0.5, max_pixel_value=255.0),
    ToTensorV2()
])
