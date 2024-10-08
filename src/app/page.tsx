import { CartesianPlan } from "@/components/cartesianPlan/cartesianPlan";
import DataGrid from "./dataGrid/page";
import InputData from "./inputData/page";
import Radar from "./radar/page";
import Report from "./report/page";

import TrackingFunctions from "./trackingFunctions/page";
import TransformationFunctions from "./transformationFunctions/page";
import Image from "next/image";
import Airplane from "../icons/airplane.png";

export default function Home() {
  return (
    <>
      <div className="flex flex-col pl-40 pt-10 gap-10">
        <div className="flex gap-6">
          <InputData />
          <TransformationFunctions />
        </div>
        <div className="flex gap-6 ">
          <TrackingFunctions />
        </div>
        <div className="flex gap-10">
          <DataGrid />
          <Report />
        </div>
        <div>
          <Image
            src={Airplane}
            alt="Descrição da imagem"
            width={100}
            height={100}
          />
          <Radar />
        </div>
      </div>
    </>
  );
}
