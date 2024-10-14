"use client";
import { ContainerPanel, InputNumber } from "@/components";
import { useEffect, useState } from "react";
import { useData } from "../../context/dataProvider";
import CoordinatesConversion from "@/utils/coordinatesConversion";
import gerarCorHexadecimal from "@/utils/randomColor";

export default function InputData() {
  const {
    x,
    setX,
    y,
    setY,
    radius,
    setRadius,
    angle,
    setAngle,
    speed,
    setSpeed,
    direction,
    setDirection,
    dataAirplane,
    setDataAirplane,
  } = useData();

  const [cartesianInput, setCartesianInput] = useState(true);
  const [polarInput, setPolarInput] = useState(false);

  const handleInsert = () => {
    const insetData = cartesianInput
      ? { x: x === "" ? 0 : x, y: y === "" ? 0 : y }
      : { radius, angle };

    const completeCoordinates = CoordinatesConversion(insetData, polarInput);
    setDataAirplane([
      ...dataAirplane,
      {
        id: dataAirplane.length,
        color: gerarCorHexadecimal(),
        direction: direction === "" ? 0 : direction,
        speed: speed === "" ? 0 : speed,
        ...completeCoordinates,
      },
    ]);
  };

  const handleCheckboxChange = (stringType: string) => {
    if (stringType === "cartesian") {
      setCartesianInput(true);
      setPolarInput(false);
    } else if (stringType === "polar") {
      setCartesianInput(false);
      setPolarInput(true);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Entrada de dados</h1>
      <ContainerPanel>
        <div className="flex gap-1">
          <label>
            <input
              type="checkbox"
              checked={cartesianInput}
              onChange={() => handleCheckboxChange("cartesian")}
            />
            Coordenada cartesiana
          </label>
          <label>
            <input
              type="checkbox"
              checked={polarInput}
              onChange={() => handleCheckboxChange("polar")}
            />
            Coordenada polar
          </label>
        </div>
        <div className="flex gap-12">
          <div className="flex flex-col gap-2 items-end">
            {cartesianInput ? (
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
            {cartesianInput ? (
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
