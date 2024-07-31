import React, { useEffect, useRef } from 'react';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables);

interface BarChartProps {
  data: { [key: string]: number };
  width?: string;
  height?: string;
  triggerAnimation: boolean; 
}

const BarChart: React.FC<BarChartProps> = ({ data, width = '400px', height = '400px', triggerAnimation }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  const total = Object.values(data).reduce((a, b) => a + b, 0);

  const chartData: ChartData<'bar'> = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Votes (%)",
        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
        data: Object.values(data).map(value => (value / total) * 100)
      }
    ]
  };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.raw + '%';
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true
        },
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        max: 100, // Adjust max value to make bars taller
        ticks: {
          callback: function (value) {
            return value + '%';
          }
        },
        title: {
          display: true
        },
        grid: {
          display: false
        }
      }
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    }
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    if (canvasRef.current) {
      chartInstance.current = new Chart(canvasRef.current, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
      });
    }
  }, [data, triggerAnimation]);

  return (
    <div style={{
      width,
      height,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default BarChart;
