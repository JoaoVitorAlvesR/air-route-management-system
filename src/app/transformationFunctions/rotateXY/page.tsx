"use client";
import { ContainerPanel, InputNumber } from "@/components";
import { useData } from "@/context/dataProvider";
import { useSelectedItems } from "@/context/selectedItemsProvider";
import CoordinatesConversion from "@/utils/coordinatesConversion";
import { useState } from "react";

export default function RotateXY() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [angle, setAngle] = useState(0);

  const { checkedItems } = useSelectedItems();
  const { dataAirplane, setDataAirplane } = useData();

  const handleRotate = () => {
    // Definindo os valores de x, y e angle
    setX(x === "" ? 0 : parseFloat(x));
    setY(y === "" ? 0 : parseFloat(y));
    setAngle(angle === "" ? 0 : parseFloat(angle));

    const rotatedData = dataAirplane.map((item) => {
      if (checkedItems.includes(item.id)) {
        const degreesToRadians = (angle * Math.PI) / 180;

        const translatedX = x !== 0 ? item.x - x : item.x;
        const translatedY = y !== 0 ? item.y - y : item.y;

        const rotatedX =
          translatedX * Math.cos(degreesToRadians) -
          translatedY * Math.sin(degreesToRadians);
        const rotatedY =
          translatedX * Math.sin(degreesToRadians) +
          translatedY * Math.cos(degreesToRadians);

        const finalX = x !== 0 ? rotatedX + x : rotatedX;
        const finalY = y !== 0 ? rotatedY + y : rotatedY;

        return {
          ...item,
          ...CoordinatesConversion({ x: finalX, y: finalY }),
        };
      }
      return item;
    });

    setX(0);
    setY(0);
    setAngle(0);

    setDataAirplane(rotatedData);
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
        onClick={handleRotate}
        className="bg-purple-950 text-white rounded-lg p-2"
      >
        Rotacionar
      </button>
    </ContainerPanel>
  );
}
