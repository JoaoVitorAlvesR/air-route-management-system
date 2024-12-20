"use client";
import { ContainerPanel, InputNumber } from "@/components";
import { useData } from "@/context/dataProvider";
import { useSelectedItems } from "@/context/selectedItemsProvider";
import CoordinatesConversion from "@/utils/coordinatesConversion";
import { useState } from "react";

export default function TranslateXY() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const { checkedItems } = useSelectedItems();
  const { dataAirplane, setDataAirplane } = useData();

  const handleTranslate = () => {
    const translatedData = dataAirplane.map((item) => {
      if (checkedItems.includes(item.id)) {
        const transferedCoordinates = {
          x: item.x + (x === "" ? 0 : parseFloat(x)),
          y: item.y + (y === "" ? 0 : parseFloat(y)),
        };
        return {
          ...item,
          ...CoordinatesConversion(transferedCoordinates),
        };
      }
      return item;
    });

    setX(0);
    setY(0);
    setDataAirplane(translatedData);
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
        onClick={handleTranslate}
        className="bg-purple-950 text-white rounded-lg p-2"
      >
        Transladar
      </button>
    </ContainerPanel>
  );
}
