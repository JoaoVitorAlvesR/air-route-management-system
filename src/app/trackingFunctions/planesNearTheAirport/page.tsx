"use client";
import { useState } from "react";
import { ContainerPanel, InputNumber } from "@/components";
import { useData } from "@/context/dataProvider";
import CalculateDistanceBetweenCoordinates from "@/utils/calculateDistanceBetweenCoordinates";
import { useReport } from "@/context/reportProvider";

export default function PlanesNearTheAirport() {
  const [minDistance, setMinDistance] = useState(0);
  const { dataAirplane } = useData();
  const { setReportAirport, setTypeOfReport } = useReport();

  console.log("dataAirplane", dataAirplane);

  const handleFindPlanesNearTheAiport = () => {
    setMinDistance(minDistance === "" ? 0 : parseFloat(minDistance));
    const planesNearTheAirport = dataAirplane
      .map((plane) => {
        const distanceFromAirport = CalculateDistanceBetweenCoordinates(
          plane.x,
          plane.y,
          0,
          0
        );
        return {
          ...plane,
          distanceFromAirport,
        };
      })
      .filter((plane, index) => {
        console.log("minDistance", minDistance);
        return plane.distanceFromAirport <= minDistance && index > 0;
      });

    setTypeOfReport("reportAirport");
    setReportAirport(planesNearTheAirport);
    setMinDistance(0);
  };

  return (
    <ContainerPanel>
      <div className="flex gap-12">
        <div className="flex flex-col gap-2 items-end">
          <div>
            Distância Mínima:{" "}
            <InputNumber value={minDistance} onChange={setMinDistance} />
          </div>
        </div>
      </div>
      <button
        className="bg-purple-950 text-white rounded-lg p-2"
        onClick={handleFindPlanesNearTheAiport}
      >
        Aviões próximos ao aeroporto
      </button>
    </ContainerPanel>
  );
}
