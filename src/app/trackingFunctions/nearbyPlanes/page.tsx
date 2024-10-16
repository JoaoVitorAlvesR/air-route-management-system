"use client";
import { ContainerPanel, InputNumber } from "@/components";
import { useData } from "@/context/dataProvider";
import { useReport } from "@/context/reportProvider";
import CalculateDistanceBetweenCoordinates from "@/utils/calculateDistanceBetweenCoordinates";
import { useState } from "react";

export default function NearbyPlanes() {
  const [minDistance, setMinDistance] = useState(0);
  const { dataAirplane } = useData();
  const { setReportNearbyPlanes, setTypeOfReport } = useReport();

  const handleFindNearbyPlanes = () => {
    const distancesBetweenPlanes = [];
    const minDist = minDistance === "" ? 0 : parseFloat(minDistance);

    dataAirplane.forEach((plane, i) => {
      if (plane.id === 0) return;

      for (let j = i + 1; j < dataAirplane.length; j++) {
        const plane2 = dataAirplane[j];

        // Também pula a comparação se o segundo avião tiver id 0
        if (plane2.id === 0) continue;

        // Calcula a distância entre os aviões plane e plane2
        const distanceBetweenPlanes = CalculateDistanceBetweenCoordinates(
          plane.x,
          plane.y,
          plane2.x,
          plane2.y
        );

        distancesBetweenPlanes.push({
          plane1Color: plane.color,
          plane2Color: plane2.color,
          plane1: plane.id,
          plane2: plane2.id,
          distanceBetweenPlanes: distanceBetweenPlanes,
        });
      }
    });

    const nearbyPlanes = distancesBetweenPlanes.filter(
      (item) => item.distanceBetweenPlanes <= minDist
    );

    setTypeOfReport("reportNearbyPlanes");
    setReportNearbyPlanes(nearbyPlanes);
    setMinDistance(0);
  };

  return (
    <ContainerPanel>
      <div className="flex gap-12">
        <div className="flex flex-col gap-2 items-end">
          <div>
            Distância Mín.:{" "}
            <InputNumber value={minDistance} onChange={setMinDistance} />
          </div>
        </div>
      </div>
      <button
        className="bg-purple-950 text-white rounded-lg p-2"
        onClick={handleFindNearbyPlanes}
      >
        Aviões próximos
      </button>
    </ContainerPanel>
  );
}
