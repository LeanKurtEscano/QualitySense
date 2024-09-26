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
  }, [data, labels]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default NullChart;

