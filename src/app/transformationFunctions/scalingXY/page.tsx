"use client";
import { ContainerPanel, InputNumber } from "@/components";
import { useData } from "@/context/dataProvider";
import { useSelectedItems } from "@/context/selectedItemsProvider";
import CoordinatesConversion from "@/utils/coordinatesConversion";
import { useState } from "react";

export default function ScalingXY() {
  const [x, setX] = useState(1);
  const [y, setY] = useState(1);

  const { checkedItems } = useSelectedItems();
  const { dataAirplane, setDataAirplane } = useData();

  const handleScale = () => {
    const scaledData = dataAirplane.map((item) => {
      if (checkedItems.includes(item.id)) {
        const scaledCoordinates = {
          x: item.x * (x === "" ? 1 : parseFloat(x)), // Fator de escala em x, pode ser negativo
          y: item.y * (y === "" ? 1 : parseFloat(y)), // Fator de escala em y, pode ser negativo
        };
        return {
          ...item,
          ...CoordinatesConversion(scaledCoordinates),
        };
      }
      return item;
    });

    setX(1); // Resetando os valores de x para o padrão 1 (sem escala)
    setY(1); // Resetando os valores de y para o padrão 1 (sem escala)
    setDataAirplane(scaledData);
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
        onClick={handleScale}
        className="bg-purple-950 text-white rounded-lg p-2"
      >
        Escalonar
      </button>
    </ContainerPanel>
  );
}
