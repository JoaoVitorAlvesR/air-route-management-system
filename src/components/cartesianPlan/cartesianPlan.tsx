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

import Image from "next/image";
import Airplane from "../../icons/airplane.png";
import Bird from "../../icons/twitter.svg";
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
  coordinates: { x: number; y: number }[];
}

export const CartesianPlan = ({ coordinates }: CartesianPlanProps) => {
  const xMin = Math.min(...coordinates.map((coord) => coord.x)) - 10;
  const xMax = Math.max(...coordinates.map((coord) => coord.x)) + 10;
  const yMin = Math.min(...coordinates.map((coord) => coord.y)) - 10;
  const yMax = Math.max(...coordinates.map((coord) => coord.y)) + 10;

  const chartData = {
    datasets: [
      {
        label: "Scatter Dataset",
        data: coordinates,
        backgroundColor: "#000",
        rotation: 45,
        borderWidth: false,
        showLine: false,
        pointRadius: 10,
        pointStyle: "triangle",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        min: xMin, // Definir o valor mínimo para o eixo X
        max: xMax, // Definir o valor máximo para o eixo X
        ticks: {
          padding: 15, // Espaçamento extra entre a label e os dados no eixo X
        },
        grid: {
          color: (ctx) => (ctx.tick.value === 0 ? "#59b672" : "#000"),
        },
      },
      y: {
        type: "linear",
        min: yMin, // Definir o valor mínimo para o eixo Y
        max: yMax, // Definir o valor máximo para o eixo Y
        ticks: {
          padding: 15, // Espaçamento extra entre a label e os dados no eixo Y
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
