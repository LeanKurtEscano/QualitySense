import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

interface BoxPlotData {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
}

interface BoxPlotChartProps {
  data: BoxPlotData[];
  labels: string[];
}

const OutlierChart: React.FC<BoxPlotChartProps> = ({ data, labels }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Min',
            data: data.map(d => d.min),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Q1',
            data: data.map(d => d.q1),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            label: 'Median',
            data: data.map(d => d.median),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Q3',
            data: data.map(d => d.q3),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
          {
            label: 'Max',
            data: data.map(d => d.max),
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
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
            ticks: {
              color: '#C9C9C9',
            },
          },
          x: {
            ticks: {
              color: '#C9C9C9',
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data, labels]);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-[400px] md:h-[500px] lg:h-[600px]" />
    </div>
  );
};

export default OutlierChart;

