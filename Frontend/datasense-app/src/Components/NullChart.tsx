import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface BarChartProps {
  data: number[];
  labels: string[];
}

const NullChart: React.FC<BarChartProps> = ({ data, labels }) => {
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
            label: 'Null Values',
            data: data,
            backgroundColor: 'rgba(136, 38, 228, 0.5)', // Transparent purple
            borderColor: 'rgba(136, 38, 228, 1)', // Opaque purple
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#C9C9C9', // Set y-axis tick color
            },
          },
          x: {
            ticks: {
              color: '#C9C9C9', // Set x-axis tick color
              autoSkip: false,
              maxRotation: 90,
              minRotation: 45,
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: '#C9C9C9', // Set legend text color
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

export default NullChart;
