import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

/* NEW COMMENT: 
   Radar charts use 'RadialLinearScale'. 
   Without this registration, the chart will not render. 
*/
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillsRadarChart = ({ teamAName, teamBName, teamAStats, teamBStats }) => {
  const data = {
    labels: ['Scrum', 'Lineouts', 'Defense', 'Attack', 'Speed', 'Discipline'],
    datasets: [
      {
        label: teamAName || 'Team A',
        data: teamAStats || [80, 70, 90, 60, 50, 85], // Dummy % stats
        backgroundColor: 'rgba(0, 204, 136, 0.2)',
        borderColor: '#00cc88',
        borderWidth: 2,
        pointBackgroundColor: '#00cc88',
      },
      {
        label: teamBName || 'Team B',
        data: teamBStats || [70, 85, 75, 90, 80, 60], // Dummy % stats
        backgroundColor: 'rgba(255, 101, 0, 0.2)',
        borderColor: '#FF6500',
        borderWidth: 2,
        pointBackgroundColor: '#FF6500',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: {
          color: '#f8fafc',
          font: { family: 'Bebas Neue', size: 14 }
        },
        ticks: { display: false, stepSize: 20 }
      }
    },
    plugins: {
      legend: {
        labels: { color: '#ffffff', font: { family: 'Bebas Neue' } }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div style={{ height: '350px', width: '100%' }}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default SkillsRadarChart;