import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

// Define the interface for BoxPlotData
interface BoxPlotData {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  label: string; // Changed from labels to label to accept a single column name
}

const BoxPlotChart: React.FC<BoxPlotData> = ({ min, q1, median, q3, max, label }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [label], // Use an array with the single label
        datasets: [
          {
            label: 'Min',
            data: [min], // Wrap single value in an array
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Q1',
            data: [q1], // Wrap single value in an array
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            label: 'Median',
            data: [median], // Wrap single value in an array
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
          },
          {
            label: 'Q3',
            data: [q3], // Wrap single value in an array
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
          {
            label: 'Max',
            data: [max], // Wrap single value in an array
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [min, q1, median, q3, max, label]); // Adjusted dependencies

  return (
   
      <canvas ref={canvasRef} className="w-[200px] h-[600px] " />

  );
};

export default BoxPlotChart;
