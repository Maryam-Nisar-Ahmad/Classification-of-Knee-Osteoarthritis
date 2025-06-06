import React from "react";
import { Alert, ListGroup } from "react-bootstrap";

const tips = {
  "No OA (0+1)": [
    "Maintain a healthy weight to reduce knee stress.",
    "Do regular low-impact exercises like walking or swimming.",
    "Stretch often to maintain joint flexibility."
  ],
  "Mild OA (2)": [
    "Avoid squatting and prolonged standing.",
    "Consider wearing a knee brace during physical activity.",
    "Include joint-strengthening exercises in your routine."
  ],
  "Moderate OA (3)": [
    "Consult a physiotherapist for targeted exercises.",
    "Use prescribed pain relievers or anti-inflammatory medication.",
    "Avoid stairs when possible and use supportive footwear."
  ],
  "Severe OA (4)": [
    "See an orthopedic specialist for advanced treatment options.",
    "Use walking aids if pain affects mobility.",
    "Consider physical therapy and surgical consultation if pain persists."
  ]
};

function CareTips({ severity }) {
  const severityTips = tips[severity];

  if (!severityTips) return null;

  return (
    <Alert variant="warning" className="mt-4">
      <Alert.Heading>🩺 Knee Care Tips</Alert.Heading>
      <p className="mb-2">Here are some suggestions based on your condition:</p>
      <ListGroup variant="flush">
        {severityTips.map((tip, index) => (
          <ListGroup.Item key={index}>{tip}</ListGroup.Item>
        ))}
      </ListGroup>
    </Alert>
  );
}

export default CareTips;
