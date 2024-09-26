"use client";
import { ContainerPanel, InputNumber } from "@/components";
import { useState } from "react";

export default function TrackingFunctions() {
  const [minDistance, setMinDistance] = useState(0);
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Funções de rastreamento</h1>
      <div className="flex gap-2">
        <ContainerPanel>
          <div className="flex gap-12">
            <div className="flex flex-col gap-2 items-end">
              <div>
                Distância Mínima:{" "}
                <InputNumber value={minDistance} onChange={setMinDistance} />
              </div>
            </div>
          </div>
          <button className="bg-purple-950 text-white rounded-lg p-2">
            Aviões próximos ao aeroporto
          </button>
        </ContainerPanel>
        <ContainerPanel>
          <div className="flex gap-12">
            <div className="flex flex-col gap-2 items-end">
              <div>
                Distância Mín.:{" "}
                <InputNumber value={minDistance} onChange={setMinDistance} />
              </div>
            </div>
          </div>
          <button className="bg-purple-950 text-white rounded-lg p-2">
            Aviões próximos
          </button>
        </ContainerPanel>
        <ContainerPanel>
          <div className="flex gap-12">
            <div className="flex flex-col gap-2 items-end">
              <div>
                Tempo Mín.:{" "}
                <InputNumber value={minDistance} onChange={setMinDistance} />
              </div>
            </div>
          </div>
          <button className="bg-purple-950 text-white rounded-lg p-2">
            Em rota de colisão
          </button>
        </ContainerPanel>
      </div>
    </div>
  );
}
