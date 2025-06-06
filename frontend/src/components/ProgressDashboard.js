import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function ProgressDashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("knee_progress") || "[]");
    setHistory(stored);
  }, []);

  const labelMap = {
    "No OA (0+1)": 80,
    "Mild OA (2)": 60,
    "Moderate OA (3)": 40,
    "Severe OA (4)": 20
  };

  const data = {
    labels: history.map(item => item.date),
    datasets: [
      {
        label: "Knee Health Score",
        data: history.map(item => labelMap[item.prediction] || 0),
        fill: false,
        borderColor: "#0d6efd",
        tension: 0.3
      }
    ]
  };

  const options = {
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: "Health Score"
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: "Progress Over Time"
      },
      legend: {
        display: false
      }
    }
  };

  return (
    <Card className="p-3 mt-4 shadow-sm">
      <h5>📊 Your Knee Health Over Time</h5>
      {history.length > 1 ? (
        <Line data={data} options={options} />
      ) : (
        <p className="text-muted">Upload at least 2 X-rays to view progress.</p>
      )}
    </Card>
  );
}

export default ProgressDashboard;
