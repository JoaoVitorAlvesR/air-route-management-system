"use client";
import { ContainerPanel } from "@/components";
import { CartesianPlan } from "@/components/cartesianPlan/cartesianPlan";
import { useData } from "../../context/dataProvider";
import { useEffect, useState } from "react";

export default function Radar() {
  const { dataAirplane, setDataAirplane } = useData();
  const [coordinates, setCoordinates] = useState(dataAirplane);

  useEffect(() => {
    const newConfig = dataAirplane.map((item) => {
      return {
        x: item.hasOwnProperty("x")
          ? item.x
          : item.radius * Math.cos((item.angle * Math.PI) / 180),
        y: item.hasOwnProperty("y")
          ? item.y
          : item.radius * Math.sin((item.angle * Math.PI) / 180),
        direction: item.direction,
      };
    });
    console.log("oi", newConfig);
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
