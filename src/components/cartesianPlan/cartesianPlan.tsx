"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Scatter } from "react-chartjs-2";

import Airplane from "../../icons/airplane2.png";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CartesianPlanProps {
  coordinates: { x: number; y: number; direction: number }[];
}

export const CartesianPlan = ({ coordinates }: CartesianPlanProps) => {
  const xMin = Math.min(...coordinates.map((coord) => coord.x)) - 10;
  const xMax = Math.max(...coordinates.map((coord) => coord.x)) + 10;
  const yMin = Math.min(...coordinates.map((coord) => coord.y)) - 10;
  const yMax = Math.max(...coordinates.map((coord) => coord.y)) + 10;

  const [airplaneImage, setAirplaneImage] = useState<HTMLImageElement | null>(
    null
  );

  useEffect(() => {
    const img = new Image();
    img.src = Airplane.src;
    img.onload = () => {
      setAirplaneImage(img);
    };
  }, []);

  const chartData = {
    datasets: [
      {
        data: coordinates,
        backgroundColor: "#000",
        rotation: ({ raw }) => {
          return 360 - raw.direction;
        },
        borderWidth: false,
        showLine: false,
        pointRadius: 10,
        hoverRadius: 10,
        pointStyle: (context: { dataIndex: number }) =>
          context.dataIndex === 0 ? "circle" : airplaneImage,
      },
    ],
  };

  const options = {
    aspectRatio: 1,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        min: xMin,
        max: xMax,
        ticks: {
          padding: 15,
        },
        grid: {
          color: (ctx) => (ctx.tick.value === 0 ? "#59b672" : "#000"),
        },
      },
      y: {
        type: "linear",
        min: yMin,
        max: yMax,
        ticks: {
          padding: 15,
        },
        grid: {
          color: (ctx) => (ctx.tick.value === 0 ? "#59b672" : "#000"),
        },
      },
    },
  };

  return (
    <div>
      <Scatter data={chartData} options={options} />
    </div>
  );
};
