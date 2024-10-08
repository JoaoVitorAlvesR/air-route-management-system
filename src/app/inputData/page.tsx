"use client";
import { ContainerPanel, InputNumber } from "@/components";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useData } from "../../context/dataProvider";

export default function InputData() {
  const { x, setX } = useData();
  const { y, setY } = useData();
  const { radius, setRadius } = useData();
  const { angle, setAngle } = useData();
  const { speed, setSpeed } = useData();
  const { direction, setDirection } = useData();

  const { dataAirplane, setDataAirplane } = useData();

  const [typeCoordinates, setTypeCoordinates] = useState(false);

  const handleInsert = () => {
    const typeData = () => {
      return !typeCoordinates ? { x, y } : { radius, angle };
    };
    setDataAirplane([
      ...dataAirplane,
      {
        id: dataAirplane.length,

        direction,
        speed,
        ...typeData(),
      },
    ]);
    console.log([...dataAirplane, { x, y, direction, speed, radius, angle }]);
  };

  const handleCheckboxChange = () => {
    setTypeCoordinates(!typeCoordinates);
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Entrada de dados</h1>
      <ContainerPanel>
        <label>
          <input
            type="checkbox"
            checked={typeCoordinates}
            onChange={handleCheckboxChange}
          />
          {!typeCoordinates
            ? "Entrada com raio e ângulo"
            : "Entrada com seno e cosseno"}
        </label>
        <div className="flex gap-12">
          <div className="flex flex-col gap-2 items-end">
            {!typeCoordinates ? (
              <div>
                X: <InputNumber value={x} onChange={setX} />
              </div>
            ) : (
              <div>
                Raio:
                <InputNumber value={radius} onChange={setRadius} />
              </div>
            )}

            <div>
              Velocidade:
              <InputNumber value={speed} onChange={setSpeed} />
            </div>
          </div>

          <div className="flex flex-col gap-2 items-end">
            {!typeCoordinates ? (
              <div>
                Y: <InputNumber value={y} onChange={setY} />
              </div>
            ) : (
              <div>
                Ângulo:
                <InputNumber value={angle} onChange={setAngle} />
              </div>
            )}

            <div>
              Direção:
              <InputNumber value={direction} onChange={setDirection} />
            </div>
          </div>
        </div>
        <button
          onClick={handleInsert}
          className={"bg-purple-950 text-white rounded-lg p-2"}
        >
          Inserir
        </button>
      </ContainerPanel>
    </div>
  );
}
