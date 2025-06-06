import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import YouTube from "react-youtube";
import "./RecommendationCard.css";

const recommendations = {
  "No OA (0+1)": {
    lifestyle: [
      "Maintain a healthy weight.",
      "Do low-impact exercises like swimming or walking.",
      "Avoid running on hard surfaces."
    ],
    doctor: "No immediate consultation needed, but yearly checkups are recommended.",
    videoId: "h_bgIN5r5JY" // YouTube ID for stretching demo
  },
  "Mild OA (2)": {
    lifestyle: [
      "Avoid squatting or kneeling too often.",
      "Use cushioned shoes and avoid prolonged standing.",
      "Do quad-strengthening exercises."
    ],
    doctor: "Consult a physiotherapist if pain persists for more than a week.",
    videoId: "h_bgIN5r5JY"
  },
  "Moderate OA (3)": {
    lifestyle: [
      "Use a knee brace if needed during activities.",
      "Do seated exercises instead of standing.",
      "Take prescribed NSAIDs if recommended."
    ],
    doctor: "Schedule an appointment with an orthopedic specialist.",
    videoId: "h_bgIN5r5JY"
  },
  "Severe OA (4)": {
    lifestyle: [
      "Avoid weight-bearing exercises.",
      "Use assistive devices like a cane or walker.",
      "Rest the knee and apply cold packs."
    ],
    doctor: "Immediate consultation with an orthopedic surgeon is advised.",
    videoId: "h_bgIN5r5JY"
  }
};

function RecommendationCard({ severity }) {
  const data = recommendations[severity];
  if (!data) return null;

  return (
    <Card className="mt-4 shadow-sm recommendation-card">
      <Card.Body>
        <Card.Title>🏋️‍♂️ Personalized Recommendations</Card.Title>
        <Card.Text><strong>Exercises:</strong></Card.Text>
        <YouTube videoId={data.videoId} className="mb-3 youtube-video" />

        <Card.Text><strong>Lifestyle Tips:</strong></Card.Text>
        <ListGroup className="mb-3">
          {data.lifestyle.map((tip, idx) => (
            <ListGroup.Item key={idx}>{tip}</ListGroup.Item>
          ))}
        </ListGroup>

        <Card.Text><strong>🩺 Doctor Advice:</strong> {data.doctor}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RecommendationCard;
