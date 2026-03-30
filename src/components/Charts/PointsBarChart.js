import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

/* NEW COMMENT: 
   Registering the necessary modules. 
   If this part is missing, the entire page will crash. 
*/
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PointsBarChart = ({ teamAName, teamBName, teamAData, teamBData }) => {
  const data = {
    labels: ['Points Scored', 'Points Against'],
    datasets: [
      {
        label: teamAName || 'Team A',
        data: teamAData || [0, 0],
        backgroundColor: '#00cc88', // Green
        borderRadius: 5,
      },
      {
        label: teamBName || 'Team B',
        data: teamBData || [0, 0],
        backgroundColor: '#ff4d4d', // Red
        borderRadius: 5,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#ffffff', font: { family: 'Bebas Neue', size: 14 } }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#94a3b8' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8' }
      }
    }
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PointsBarChart;