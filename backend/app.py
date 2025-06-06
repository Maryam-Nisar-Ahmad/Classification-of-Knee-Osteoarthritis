from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import numpy as np
import cv2
from PIL import Image
import base64
from io import BytesIO
from PIL import Image as PILImage
from auth import auth_bp
app.register_blueprint(auth_bp, url_prefix="/auth")


from utils.model import KneeOsteoarthritisModel4Class
from utils.preprocessing import preprocess_xray, augmentation_pipeline

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = KneeOsteoarthritisModel4Class(img_dims=224).to(device)
model.load_state_dict(torch.load("model/77.48 4classbest_knee_osteoarthritis_model.pth", map_location=device))
model.eval()

# Class labels
class_names = ['No OA (0+1)', 'Mild OA (2)', 'Moderate OA (3)', 'Severe OA (4)']

def process_image(file):
    img = Image.open(file).convert("RGB")
    img_np = np.array(img)

    # Convert to grayscale and apply preprocessing
    gray = cv2.cvtColor(img_np, cv2.COLOR_RGB2GRAY)
    processed = preprocess_xray(gray)
    processed_3ch = cv2.merge([processed] * 3)

    tensor = augmentation_pipeline(image=processed_3ch)["image"]
    return tensor.unsqueeze(0).to(device)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files['image']
        pil_img = PILImage.open(file).convert("RGB")
        img_np = np.array(pil_img)

        # Preprocess
        gray = cv2.cvtColor(img_np, cv2.COLOR_RGB2GRAY)
        processed = preprocess_xray(gray)
        processed_3ch = cv2.merge([processed]*3)

        tensor = augmentation_pipeline(image=processed_3ch)["image"].unsqueeze(0).to(device)

        # Inference
        with torch.no_grad():
            output = model(tensor)
            pred = torch.argmax(output, dim=1).item()

        # Convert preprocessed image to base64
        processed_display = cv2.cvtColor(processed, cv2.COLOR_GRAY2RGB)
        pil_processed = PILImage.fromarray(processed_display)
        buffer = BytesIO()
        pil_processed.save(buffer, format="PNG")
        encoded_image = base64.b64encode(buffer.getvalue()).decode("utf-8")

        return jsonify({
            "prediction": pred,
            "class": class_names[pred],
            "preprocessed_image": encoded_image
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
