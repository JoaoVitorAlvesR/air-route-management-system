"use client";
import { ContainerPanel } from "@/components";
import { CartesianPlan } from "@/components/cartesianPlan/cartesianPlan";
import { useData } from "../../context/dataProvider";
import { useEffect, useState } from "react";

export default function Radar() {
  const { dataAirplane } = useData();
  const [coordinates, setCoordinates] = useState(dataAirplane);
  console.log("dataAirplane", dataAirplane);
  useEffect(() => {
    const newConfig = dataAirplane.map((item) => {
      return {
        id: item.id,
        x: item.x,
        y: item.y,
        direction: item.direction,
        color: item.color,
      };
    });
    setCoordinates(newConfig);
  }, [dataAirplane]);

  return (
    <div className="flex flex-col gap-2 w-[600px]">
      <h1 className="text-2xl">Radar</h1>

      <ContainerPanel>
        <CartesianPlan coordinates={coordinates} />
      </ContainerPanel>
    </div>
  );
}
