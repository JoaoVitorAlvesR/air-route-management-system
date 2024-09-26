"use client";
import { ContainerPanel, InputNumber } from "@/components";
import { useState } from "react";

export default function EchelonXY() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [angle, setAngle] = useState(0);

  const handleInsert = () => {
    console.log("Inserting data");
    console.log("x:", x);
    console.log("y:", y);
    console.log("angle:", angle);
  };

  return (
    <ContainerPanel>
      <div className="flex gap-2">
        <div className="flex flex-col gap-2 items-end">
          <div>
            Ângulo <InputNumber value={angle} onChange={setAngle} />
            <div className="flex gap-4">
              Centro de rotação:
              <div className="flex gap-2">
                Y: <InputNumber value={y} onChange={setY} />
                X: <InputNumber value={x} onChange={setX} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleInsert}
        className="bg-purple-950 text-white rounded-lg p-2"
      >
        Rotacionar
      </button>
    </ContainerPanel>
  );
}
