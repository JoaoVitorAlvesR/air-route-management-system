"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface CartesianPlanProps {
  coordinates: { x: number; y: number }[]; // coordenadas agora são pares (x, y)
}

export const CartesianPlan = ({ coordinates }: CartesianPlanProps) => {
  const chartData = {
    datasets: [
      {
        label: "Scatter Dataset",
        data: coordinates, // usando as coordenadas da prop
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderWidth: 2,
        showLine: false, // desativa as linhas
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Scatter Plot",
      },
    },
    scales: {
      x: {
        type: "linear", // escala linear no eixo x
        position: "bottom",
      },
      y: {
        type: "linear", // escala linear no eixo y
      },
    },
  };

  return <Scatter data={chartData} options={options} />;
};
