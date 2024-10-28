"use client";
import { ContainerPanel, InputNumber } from "@/components";
import { useData } from "@/context/dataProvider";
import { useReport } from "@/context/reportProvider";
import CalculateDistanceBetweenCoordinates from "@/utils/calculateDistanceBetweenCoordinates";

import { useEffect, useState } from "react";

type Ponto = {
  x: number;
  y: number;
  speed: number;
  direction: number;
};

//func
function calculateCollisionPoint(pontoA: Ponto, pontoB: Ponto) {
  if (pontoA.x === pontoB.x && pontoA.y === pontoB.y) {
    return { diferenceBetweenTimes: 0, x: pontoA.x, y: pontoA.y };
  }

  function calculateM(direction: number, x: number, y: number) {
    if (direction === 90 || direction === 270) {
      return { m: Infinity, equation: `x = ${x}` };
    } else if (direction === 0 || direction === 180) {
      return { m: 0, equation: `y = ${y}` };
    } else {
      const m = parseFloat(Math.tan(direction * (Math.PI / 180)).toFixed(2));
      return { m, equation: undefined };
    }
  }

  function calculateN(y: number, m: number, x: number, isVertical: boolean) {
    if (isVertical) {
      return { n: 0, equation: `x = ${x}` };
    } else if (m === 0) {
      return { n: y, equation: `y = ${y}` };
    } else {
      const n = parseFloat((y - m * x).toFixed(2));
      return { n, equation: `y = ${m} * x + ${n}` };
    }
  }

  function calculatesDestinationViability(speed, angle, xi, yi, xf, yf) {
    if (xi === xf && yi === yf) {
      return true; // Retornar true se o destino é o mesmo que a origem
    }
    // Calcular as mudanças nas coordenadas
    const deltaX = speed * Math.cos(angle);
    const deltaY = speed * Math.sin(angle);

    console.log("Math.sign(deltaX)", Math.sign(deltaX)); // -1, 0, 1
    console.log("Math.sign(deltaY)", Math.sign(deltaY)); // -1, 0, 1
    const verifySignX = Math.sign(deltaX);
    const verifySignY = Math.sign(deltaY);

    // Calcular as diferenças entre as coordenadas finais e iniciais
    const diffX = xf - xi;
    const diffY = yf - yi;

    // Verificar a viabilidade do destino
    const viableX =
      verifySignX === Math.sign(diffX) || (deltaX === 0 && diffX === 0);
    const viableY =
      verifySignY === Math.sign(diffY) || (deltaY === 0 && diffY === 0);

    return viableX && viableY; // Retorna verdadeiro se ambos os eixos forem viáveis
  }

  function caculateTimeToDestination(xi, yi, xf, yf, speed) {
    const distanceToDestination = CalculateDistanceBetweenCoordinates(
      xi,
      yi,
      xf,
      yf
    );

    const timeToDestination = ((distanceToDestination / speed) * 3600).toFixed(
      2
    );
    return parseFloat(timeToDestination);
  }

  const { m: mA, equation: equationA } = calculateM(
    pontoA.direction,
    pontoA.x,
    pontoA.y
  );
  const { m: mB, equation: equationB } = calculateM(
    pontoB.direction,
    pontoB.x,
    pontoB.y
  );

  const { n: nA, equation: fullEquationA } = calculateN(
    pontoA.y,
    mA,
    pontoA.x,
    mA === Infinity
  );
  const { n: nB, equation: fullEquationB } = calculateN(
    pontoB.y,
    mB,
    pontoB.x,
    mB === Infinity
  );

  const vAx = pontoA.speed * Math.cos(pontoA.direction * (Math.PI / 180));
  const vAy = pontoA.speed * Math.sin(pontoA.direction * (Math.PI / 180));

  const vBx = pontoB.speed * Math.cos(pontoB.direction * (Math.PI / 180));
  const vBy = pontoB.speed * Math.sin(pontoB.direction * (Math.PI / 180));

  // console.log("Equação da linha de A:", fullEquationA || equationA);
  // console.log("Equação da linha de B:", fullEquationB || equationB);
  // console.log("mA", mA);
  // console.log("mB", mB);
  // console.log("nA", nA);
  // console.log("nB", nB);

  // Calcular o ponto de colisão
  let x, y;
  if (mA === Infinity) {
    x = parseFloat(pontoA.x);
    y = parseFloat(mB * x + nB);
  } else if (mB === Infinity) {
    x = parseFloat(pontoB.x);
    y = parseFloat(mA * x + nA);
  } else if (mA === mB && nA === nB) {
    // console.log("são na mesma linha, podem colidir ou não");
    // se o angulo for igual
    if (
      pontoA.x > pontoB.x &&
      pontoA.speed >= pontoB.speed &&
      pontoA.direction === pontoB.direction
    ) {
      // A ta na frente de B
      // A ta indo mais rápido que B não há colisão
      x = pontoA.x;
      y = pontoA.y;
    } else if (
      pontoA.x < pontoB.x &&
      pontoB.speed >= pontoA.speed &&
      pontoA.direction === pontoB.direction
    ) {
      // B ta indo mais rápido que A não há colisão
      x = pontoB.x;
      y = pontoB.y;
    } else if (
      pontoA.speed > pontoB.speed ||
      pontoB.speed > pontoA.speed ||
      pontoA.direction !== pontoB.direction
    ) {
      //vai colidir uma hora
      const tx = (pontoB.x - pontoA.x) / (vAx - vBx);
      const ty = (pontoB.y - pontoA.y) / (vAy - vBy);

      x = pontoA.x + vAx * tx;
      y = pontoA.y + vAy * ty;
    }
  } else {
    x = parseFloat(((nB - nA) / (mA - mB)).toFixed(2));
    y = parseFloat((mA * x + nA).toFixed(2));
  }

  console.log("Ponto de colisão:", { x, y });

  const isPossibleAToThePoint = calculatesDestinationViability(
    pontoA.speed,
    pontoA.direction * (Math.PI / 180),
    pontoA.x,
    pontoA.y,
    x,
    y
  );
  const isPossibleBToThePoint = calculatesDestinationViability(
    pontoB.speed,
    pontoB.direction * (Math.PI / 180),
    pontoB.x,
    pontoB.y,
    x,
    y
  );
  //calcular o tempo pra chegar no ponto
  const timeToDestinationA = caculateTimeToDestination(
    pontoA.x,
    pontoA.y,
    x,
    y,
    pontoA.speed
  );
  const timeToDestinationB = caculateTimeToDestination(
    pontoB.x,
    pontoB.y,
    x,
    y,
    pontoB.speed
  );

  console.log("timeToDestinationA", timeToDestinationA);
  console.log("timeToDestinationB", timeToDestinationB);
  console.log("isPossibleAToThePoint", isPossibleAToThePoint);
  console.log("isPossibleBToThePoint", isPossibleBToThePoint);

  if (isPossibleAToThePoint && isPossibleBToThePoint) {
    const diferenceBetweenTimes = parseFloat(
      Math.abs(timeToDestinationA - timeToDestinationB).toFixed(2)
    );

    console.log("diferenceBetweenTimes", diferenceBetweenTimes);
    return { diferenceBetweenTimes, x, y };
  } else {
    return;
  }
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
          speed: parseFloat(plane.speed),
          direction: parseFloat(plane.direction),
        };

        const pontoB = {
          x: plane2.x,
          y: plane2.y,
          speed: parseFloat(plane2.speed),
          direction: parseFloat(plane2.direction),
        };

        const timeOfCollision = calculateCollisionPoint(pontoA, pontoB);
        console.log("cai aqui1?", timeOfCollision);

        if (timeOfCollision?.diferenceBetweenTimes <= time) {
          collisionPlanes.push({
            plane1: plane.id,
            plane2: plane2.id,
            time: timeOfCollision.diferenceBetweenTimes,
            plane1Color: plane.color,
            plane2Color: plane2.color,
            x: timeOfCollision.x,
            y: timeOfCollision.y,
          });
        }

        console.log("collisionPlanes", collisionPlanes);
      }
    });

    // console.log("collisionPlanes", collisionPlanes);
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
        onClick={handleFindCollisionCourses}
      >
        Em rota de colisão
      </button>
    </ContainerPanel>
  );
}
