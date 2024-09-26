import DataGrid from "./dataGrid/page";
import InputData from "./inputData/page";
import Radar from "./radar/page";
import Report from "./report/page";

import TrackingFunctions from "./trackingFunctions/page";
import TransformationFunctions from "./transformationFunctions/page";

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
          <Radar />
          <DataGrid />
          <Report />
        </div>
      </div>
    </>
  );
}
