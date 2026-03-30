import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement, // CRITICAL: This is required for Pie/Doughnut charts
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const WinLossPieChart = ({ teamName, winData }) => {
  const data = {
    labels: ['Wins', 'Losses', 'Draws'],
    datasets: [
      {
        data: winData || [0, 0, 0],
        backgroundColor: ['#00cc88', '#ff4d4d', '#94a3b8'],
        hoverOffset: 10,
        borderWidth: 0
      },
    ],
  };

  const options = {
    plugins: {
      legend: { position: 'bottom', labels: { color: '#fff', font: { family: 'Bebas Neue' } } }
    },
    maintainAspectRatio: false
  };

  return (
    <div style={{ height: '250px', position: 'relative' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default WinLossPieChart;