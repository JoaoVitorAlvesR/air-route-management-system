"use client";
import { ContainerPanel, InputNumber } from "@/components";
import { useData } from "@/context/dataProvider";
import { useReport } from "@/context/reportProvider";
import CalculateDistanceBetweenCoordinates from "@/utils/calculateDistanceBetweenCoordinates";
import { useState } from "react";

export default function OnACollisionCourse() {
  const [minTime, setMinTime] = useState(0);
  const { dataAirplane } = useData();
  const { setReportCollision, setTypeOfReport } = useReport();

  const handleFindNearbyPlanes = (timeInHours) => {
    const minDist = minTime === "" ? 0 : parseFloat(minTime);

    setTypeOfReport("reportCollision");
    setReportCollision(collisionPlanes);
    setMinTime(0);
  };

  return (
    <ContainerPanel>
      <div className="flex gap-12">
        <div className="flex flex-col gap-2 items-end">
          <div>
            Tempo Mín.: <InputNumber value={minTime} onChange={setMinTime} />
          </div>
        </div>
      </div>
      <button
        className="bg-purple-950 text-white rounded-lg p-2"
        onClick={handleFindNearbyPlanes}
      >
        Em rota de colisão
      </button>
    </ContainerPanel>
  );
}
