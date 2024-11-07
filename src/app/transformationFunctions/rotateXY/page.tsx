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
    const rotatedData = dataAirplane.map((item) => {
      if (checkedItems.includes(item.id)) {
        const radians = (angle * Math.PI) / 180;
        const xRotation = parseFloat(x);
        const yRotation = parseFloat(y);

        // Transladar o ponto para a origem
        const translatedX = item.x - xRotation;
        const translatedY = item.y - yRotation;
        console.log("x,y 1 ", xRotation, yRotation);
        console.log("translatedX", translatedX, translatedY);
        // Aplicar a rotação
        const rotatedX =
          translatedX * Math.cos(radians) - translatedY * Math.sin(radians);
        const rotatedY =
          translatedX * Math.sin(radians) + translatedY * Math.cos(radians);

        console.log("rotatedX rotatedY", rotatedX, rotatedY);
        console.log("x,y 2 ", xRotation, yRotation);

        // Transladar o ponto de volta
        const finalX = rotatedX + xRotation;
        const finalY = rotatedY + yRotation;

        console.log("ue", finalX, finalY);
        return {
          ...item,
          ...CoordinatesConversion({ x: finalX, y: finalY }),
        };
      }
      return item;
    });
    console.log("rotatedData", rotatedData);
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
                X: <InputNumber value={x} onChange={setX} />
                Y: <InputNumber value={y} onChange={setY} />
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
