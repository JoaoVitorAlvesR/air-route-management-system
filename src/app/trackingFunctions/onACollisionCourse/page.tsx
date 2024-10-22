"use client";
import { ContainerPanel, InputNumber } from "@/components";
import { useData } from "@/context/dataProvider";
import { useReport } from "@/context/reportProvider";

import { useState } from "react";

// func
type Ponto = {
  x: number;
  y: number;
  speed: number;
  direction: number;
};

function CalculateCollisionPoint(pontoA: Ponto, pontoB: Ponto) {
  const mA = pontoA.direction === 90 || 270 ? 0 : Math.tan(pontoA.direction); // coeficiente angular da reta A
  const mB = Math.tan(pontoB.direction); // coeficiente angular da reta B

  // Interceptos (nA e nB)
  const nA = pontoA.y - mA * pontoA.x;
  const nB = pontoB.y - mB * pontoB.x;

  const equationOfAStraightLineA = `y = ${mA} * x + ${nA}`;
  const equationOfAStraightLineB = `y = ${mB} * x + ${nB}`;

  console.log("pontoA.direction", pontoA.direction);
  console.log("pontoB.direction", pontoB.direction);

  const findIntersection = () => {
    // Verificar se as retas são paralelas
    if (mA === mB) {
      return null; // As retas são paralelas e não se interceptam
    }

    // Encontrar o ponto de interseção
    const x = (nB - nA) / (mA - mB);
    const y = mA * x + nA;

    return { x, y };
  };

  const intersection = findIntersection();

  if (!intersection) {
    console.log("As retas são paralelas e não há interseção.");
    return null;
  }

  const { x, y } = intersection;

  console.log("mA", mA);
  console.log("mB", mB);
  console.log("nA", nA);
  console.log("nB", nB);
  console.log("equationOfAStraightLineA", equationOfAStraightLineA);
  console.log("equationOfAStraightLineB", equationOfAStraightLineB);
  console.log("Ponto de interseção:", { x, y });

  return { x, y };
}
// func

export default function OnACollisionCourse() {
  const [minTime, setMinTime] = useState(0);
  const { dataAirplane } = useData();
  const { setReportCollision, setTypeOfReport } = useReport();

  const handleFindCollisionCourses = () => {
    const time = minTime === "" ? 0 : parseFloat(minTime);
    const collisionPlanes = [];

    dataAirplane.forEach((plane, i) => {
      if (plane.id === 0) return;

      for (let j = i + 1; j < dataAirplane.length; j++) {
        const plane2 = dataAirplane[j];
        if (plane2.id === 0) continue;

        const pontoA = {
          x: plane.x,
          y: plane.y,
          speed: plane.speed,
          direction: plane.direction,
        };

        const pontoB = {
          x: plane2.x,
          y: plane2.y,
          speed: plane2.speed,
          direction: plane2.direction,
        };

        const timeOfCollision = CalculateCollisionPoint(pontoA, pontoB);

        console.log("Ponto de colisão1:", timeOfCollision);
        if (timeOfCollision) {
          console.log("Ponto de colisão:", timeOfCollision);
          collisionPlanes.push({
            plane1: plane.id,
            plane2: plane2.id,
          });
        } else {
          console.log("Sem colisão.");
        }
        // if (routeOfCollision) {
        //   collisionPlanes.push({
        //     plane1: plane.id,
        //     plane2: plane2.id,
        //     timeOfCollision: routeOfCollision,
        //   });
        // }
      }
    });

    console.log("collisionPlanes", collisionPlanes);
    // setTypeOfReport("reportCollision");
    // setReportCollision(collisionPlanes);
    // setMinTime(0);
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
        onClick={handleFindCollisionCourses}
      >
        Em rota de colisão
      </button>
    </ContainerPanel>
  );
}
