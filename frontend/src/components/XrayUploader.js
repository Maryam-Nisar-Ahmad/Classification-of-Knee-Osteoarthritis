import React, { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { Card, Button, Spinner, ProgressBar, Alert } from "react-bootstrap";
import { ReactCompareSlider } from "react-compare-slider";
import RecommendationCard from "./RecommendationCard";
// import NearbySpecialists from "./NearbySpecialists"; // Temporarily disabled
import "./XrayUploader.css";

function XrayUploader() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [processedImg, setProcessedImg] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDrop = (acceptedFiles) => {
    const selected = acceptedFiles[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
      setProcessedImg(null);
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

      // ✅ Save to localStorage for progress tracking
      const existing = JSON.parse(localStorage.getItem("knee_progress") || "[]");
      const today = new Date().toLocaleDateString();
      existing.push({ date: today, prediction: res.data.class });
      localStorage.setItem("knee_progress", JSON.stringify(existing));
    } catch (err) {
      alert("Prediction failed.");
      console.error(err);
    }
    setLoading(false);
  };

  const getSeverityIcon = (prediction) => {
    switch (prediction) {
      case "No OA (0+1)": return "✅";
      case "Mild OA (2)": return "⚠️";
      case "Moderate OA (3)": return "❗";
      case "Severe OA (4)": return "🚨";
      default: return "🔍";
    }
  };

  const getSeverityPercent = (prediction) => {
    switch (prediction) {
      case "No OA (0+1)": return 10;
      case "Mild OA (2)": return 40;
      case "Moderate OA (3)": return 70;
      case "Severe OA (4)": return 90;
      default: return 0;
    }
  };

  return (
    <Card className="p-4 shadow-lg mt-3">
      <Dropzone onDrop={handleDrop} multiple={false} accept="image/*">
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
            <input {...getInputProps()} />
            <p>{isDragActive ? "Drop the X-ray here..." : "Drag & drop your X-ray or click to upload."}</p>
          </div>
        )}
      </Dropzone>

      <Button variant="primary" className="w-100 mt-3" disabled={!file || loading} onClick={handlePredict}>
        {loading ? (
          <>
            <Spinner animation="border" size="sm" /> Analyzing...
          </>
        ) : (
          "Predict"
        )}
      </Button>

      {result && (
        <div className="mt-4">
          <Alert variant="info" className="text-center">
            <h5>{getSeverityIcon(result.class)} Prediction: <strong>{result.class}</strong></h5>
            <ProgressBar now={getSeverityPercent(result.class)} label={`${getSeverityPercent(result.class)}%`} />
          </Alert>

          {processedImg && (
            <ReactCompareSlider
              itemOne={<img src={preview} alt="Original" className="compare-img" />}
              itemTwo={<img src={processedImg} alt="Processed" className="compare-img" />}
            />
          )}

          <RecommendationCard severity={result.class} />

          {/* Uncomment this when NearbySpecialists is ready */}
          {/* <NearbySpecialists /> */}
        </div>
      )}
    </Card>
  );
}

export default XrayUploader;
