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

import Airplane from "../../../public/icons/airplane3.svg";
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
  coordinates: {
    id: number;
    x: number;
    y: number;
    direction: number;
    color: string;
  }[];
}

export const CartesianPlan = ({ coordinates }: CartesianPlanProps) => {
  const xMin = Math.min(...coordinates.map((coord) => coord.x)) - 10;
  const xMax = Math.max(...coordinates.map((coord) => coord.x)) + 10;
  const yMin = Math.min(...coordinates.map((coord) => coord.y)) - 10;
  const yMax = Math.max(...coordinates.map((coord) => coord.y)) + 10;

  const [airplaneImage, setAirplaneImage] = useState<HTMLImageElement | null>(
    null
  );

  const [airplaneImages, setAirplaneImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    const loadAndModifySVG = async (color: string) => {
      const response = await fetch("/icons/airplane3.svg");
      const svgText = await response.text();

      const modifiedSvgText = svgText.replace(
        /fill:#030104;/g,
        `fill:${color}`
      );

      const svgBlob = new Blob([modifiedSvgText], { type: "image/svg+xml" });
      const svgUrl = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.src = svgUrl;

      return new Promise<HTMLImageElement>((resolve) => {
        img.onload = () => resolve(img);
      });
    };

    const loadImages = async () => {
      const images = await Promise.all(
        coordinates.map(({ color }) => loadAndModifySVG(color))
      );
      setAirplaneImages(images);
    };

    loadImages();
  }, [coordinates]);

  const chartData = {
    datasets: [
      {
        data: coordinates,
        backgroundColor: ({ raw }) => {
          return raw.color || "#000";
        },
        rotation: ({ raw }) => {
          return 360 - raw.direction;
        },
        borderWidth: false,
        showLine: false,
        pointRadius: 10,
        hoverRadius: 10,
        pointStyle: (context: { dataIndex: number }) => {
          return context.dataIndex === 0
            ? "circle"
            : airplaneImages[context.dataIndex];
        },
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
      tooltip: {
        enabled: true,
        callbacks: {
          label: function ({ raw }) {
            return `Id: ${raw.id}, Direção: ${raw.direction}°, X: ${raw.x}, Y: ${raw.y}`;
          },
        },
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
