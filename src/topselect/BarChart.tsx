import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables);

interface BarChartProps {
  data: { [key: string]: number };
  width?: string;
  height?: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, width = '100%', height = '100%' }) => {
  const chartRef = useRef<Chart<"bar"> | null>(null);

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
      duration: 2000,
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [data]);

  return (
    <div style={{ width, height, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-5%' }}>
      <Bar ref={chartRef} data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
