import React from "react";
import '../App.css';

interface MetricsProps {
  cpuUsage: number;
  memoryUsage: number;
  storageUsage: number;
  contextWindowUsage: number;
}

const Metrics: React.FC<MetricsProps> = ({ cpuUsage, memoryUsage, storageUsage, contextWindowUsage }) => {
  return (
    <div className="metrics-section">
      <h2>Metrics</h2>
      <div className="metric">
        <label>GPU Usage:</label>
        <progress value={contextWindowUsage} max="100"></progress>
      </div>
      <div className="metric">
        <label>GPU Memory Usage:</label>
        <progress value={contextWindowUsage} max="100"></progress>
      </div>
      <div className="metric">
        <label>CPU Usage:</label>
        <progress value={cpuUsage} max="100"></progress>
      </div>
      <div className="metric">
        <label>Memory Usage:</label>
        <progress value={memoryUsage} max="100"></progress>
      </div>
      <div className="metric">
        <label>Storage Usage:</label>
        <progress value={storageUsage} max="100"></progress>
      </div>
      <div className="metric">
        <label>Context Window Usage:</label>
        <progress value={contextWindowUsage} max="100"></progress>
      </div>
    </div>
  );
};

export default Metrics;
