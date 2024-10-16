"use client";
import { ContainerPanel } from "@/components";
import { useReport } from "@/context/reportProvider";
import { useSelectedItems } from "@/context/selectedItemsProvider";
import { useState } from "react";

export default function Report() {
  const { typeOfReport, reportAirport, reportNearbyPlanes, reportCollision } =
    useReport();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Relatório</h1>
      <ContainerPanel>
        <div className="flex flex-col">
          {typeOfReport === "reportAirport" &&
            reportAirport
              .sort((a, b) => a.distanceFromAirport - b.distanceFromAirport)
              .map((item) => {
                return (
                  <div key={item.id} className="flex gap-2 items-center">
                    <div
                      style={{
                        height: "15px",
                        width: "15px",
                        borderRadius: "50%",
                        backgroundColor: item.color,
                      }}
                    />
                    <div>
                      Aeronave {item.id} está a{" "}
                      {item.distanceFromAirport.toFixed(2)} km de distância do
                      Aeroporto
                    </div>
                  </div>
                );
              })}

          {typeOfReport === "reportNearbyPlanes" &&
            reportNearbyPlanes
              .sort((a, b) => a.distanceBetweenPlanes - b.distanceBetweenPlanes)
              .map((item, index) => {
                return (
                  <div key={index} className="flex gap-2 items-center">
                    <div
                      style={{
                        height: "15px",
                        width: "15px",
                        borderRadius: "50%",
                        backgroundColor: item.plane1Color,
                      }}
                    />
                    <div
                      style={{
                        height: "15px",
                        width: "15px",
                        borderRadius: "50%",
                        backgroundColor: item.plane2Color,
                      }}
                    />
                    <div className="flex gap-2 items-center">
                      <div>
                        Aeronave {item.plane1} está a{" "}
                        {item.distanceBetweenPlanes.toFixed(2)} km de distância
                        da Aeronave {item.plane2}
                      </div>
                    </div>
                  </div>
                );
              })}
          {typeOfReport === "reportCollision" &&
            reportCollision
              .sort((a, b) => a.distanceBetweenPlanes - b.distanceBetweenPlanes)
              .map((item, index) => {
                return (
                  <div key={index} className="flex gap-2 items-center">
                    <div
                      style={{
                        height: "15px",
                        width: "15px",
                        borderRadius: "50%",
                        backgroundColor: item.plane1Color,
                      }}
                    />
                    <div
                      style={{
                        height: "15px",
                        width: "15px",
                        borderRadius: "50%",
                        backgroundColor: item.plane2Color,
                      }}
                    />
                    <div className="flex gap-2 items-center">
                      <div>
                        Aeronave {item.plane1} está a{" "}
                        {item.distanceBetweenPlanes.toFixed(2)} km de distância
                        da Aeronave {item.plane2}
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </ContainerPanel>
    </div>
  );
}
