import React, { useState } from "react";
import axios from "axios";
import { Card, Button, Form, Row, Col, Spinner, Alert } from "react-bootstrap";
import CareTips from "./CareTips";
import Lottie from "lottie-react";
import kneeDance from "../assets/knee.json";

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [processedImg, setProcessedImg] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setProcessedImg(null);
      setResult(null);
    }
  };

  const handlePredict = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", formData);
      setResult(res.data);
      setProcessedImg(`data:image/png;base64,${res.data.preprocessed_image}`);
    } catch (err) {
      alert("Prediction failed.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <Card className="p-4 shadow-lg">
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label><strong>Select Knee X-ray Image</strong></Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
      </Form.Group>

      <Button
        variant="primary"
        className="w-100 mb-3"
        disabled={!file || loading}
        onClick={handlePredict}
      >
        {loading ? (
          <>
            <Spinner animation="border" size="sm" /> Predicting...
          </>
        ) : (
          "Predict"
        )}
      </Button>

      {/* 🔥 Always dancing Lottie animation */}
      <div className="d-flex justify-content-center mb-4">
        <Lottie animationData={kneeDance} style={{ height: 140 }} loop autoplay />
      </div>

      {result && (
        <>
          <Alert variant="info" className="text-center">
            <h5><strong>Prediction:</strong> {result.class}</h5>
          </Alert>

          <Row className="mt-3">
            <Col md={6} className="text-center">
              <p className="mb-2 fw-semibold">Original Image</p>
              <img src={preview} alt="original" className="img-fluid rounded shadow-sm" />
            </Col>
            <Col md={6} className="text-center">
              <p className="mb-2 fw-semibold">Preprocessed View</p>
              {processedImg ? (
                <img src={processedImg} alt="preprocessed" className="img-fluid rounded shadow-sm" />
              ) : (
                <p className="text-muted">No preprocessed image available.</p>
              )}
            </Col>
          </Row>

          <CareTips severity={result.class} />
        </>
      )}
    </Card>
  );
}

export default ImageUploader;
