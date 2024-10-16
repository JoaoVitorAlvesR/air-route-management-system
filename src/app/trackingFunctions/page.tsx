"use client";
import { ContainerPanel, InputNumber } from "@/components";
import { useState } from "react";
import PlanesNearTheAirport from "./planesNearTheAirport/page";
import NearbyPlanes from "./nearbyPlanes/page";
import OnACollisionCourse from "./onACollisionCourse/page";

export default function TrackingFunctions() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Funções de rastreamento</h1>
      <PlanesNearTheAirport />
      <div className="flex gap-2">
        <NearbyPlanes />
        <OnACollisionCourse />
      </div>
    </div>
  );
}
