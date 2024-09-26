"use client";
import { ContainerPanel, InputNumber } from "@/components";
import { useState } from "react";

export default function TranslateXY() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleInsert = () => {
    console.log("Inserting data");
    console.log("x:", x);
    console.log("y:", y);
  };

  return (
    <ContainerPanel>
      <div className="flex gap-2">
        <div className="flex flex-col gap-2 items-end">
          <div>
            X: <InputNumber value={x} onChange={setX} />
          </div>
        </div>

        <div className="flex flex-col gap-2 items-end">
          <div>
            Y: <InputNumber value={y} onChange={setY} />
          </div>
        </div>
      </div>
      <button
        onClick={handleInsert}
        className="bg-purple-950 text-white rounded-lg p-2"
      >
        Transladar
      </button>
    </ContainerPanel>
  );
}
