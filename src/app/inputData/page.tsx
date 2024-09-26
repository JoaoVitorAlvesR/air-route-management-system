"use client";
import { ContainerPanel, InputNumber } from "@/components";
import Image from "next/image";
import { useState } from "react";

export default function InputData() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [radius, setRadius] = useState(0);
  const [angle, setAngle] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleInsert = () => {
    console.log("Inserting data");
    console.log("x:", x);
    console.log("y:", y);
    console.log("radius:", radius);
    console.log("angle:", angle);
    console.log("speed:", speed);
    console.log("direction:", direction);
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Entrada de dados</h1>
      <ContainerPanel>
        <div className="flex gap-12">
          <div className="flex flex-col gap-2 items-end">
            <div>
              X: <InputNumber value={x} onChange={setX} />
            </div>
            <div>
              Raio:
              <InputNumber value={y} onChange={setY} />
            </div>
            <div>
              Velocidade:
              <InputNumber value={radius} onChange={setRadius} />
            </div>
          </div>

          <div className="flex flex-col gap-2 items-end">
            <div>
              Y: <InputNumber value={angle} onChange={setAngle} />
            </div>
            <div>
              Ângulo:
              <InputNumber value={speed} onChange={setSpeed} />
            </div>
            <div>
              Direção:
              <InputNumber value={direction} onChange={setDirection} />
            </div>
          </div>
        </div>
        <button
          onClick={handleInsert}
          className="bg-purple-950 text-white rounded-lg p-2"
        >
          Inserir
        </button>
      </ContainerPanel>
    </div>
  );
}
