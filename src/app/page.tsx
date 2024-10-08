import { CartesianPlan } from "@/components/cartesianPlan/cartesianPlan";
import DataGrid from "./dataGrid/page";
import InputData from "./inputData/page";
import Radar from "./radar/page";
import Report from "./report/page";

import TrackingFunctions from "./trackingFunctions/page";
import TransformationFunctions from "./transformationFunctions/page";

import { DataProvider } from "../context/dataProvider";

export default function Home({ pageProps }) {
  return (
    <DataProvider>
      <div {...pageProps}>
        <div className="flex flex-col pl-40 pt-10 gap-10">
          <div className="flex gap-6">
            <InputData />
            <TransformationFunctions />
            <TrackingFunctions />
          </div>

          <div className="flex gap-10">
            <div className="flex flex-col">
              <DataGrid />
            </div>

            <Radar />
            <Report />
          </div>

          <div></div>
        </div>
      </div>
    </DataProvider>
  );
}
