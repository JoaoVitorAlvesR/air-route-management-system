import { CartesianPlan } from "@/components/cartesianPlan/cartesianPlan";
import DataGrid from "./dataGrid/page";
import InputData from "./inputData/page";
import Radar from "./radar/page";
import Report from "./report/page";

import TrackingFunctions from "./trackingFunctions/page";
import TransformationFunctions from "./transformationFunctions/page";

import { DataProvider } from "../context/dataProvider";
import { SelectedItemsProvider } from "@/context/selectedItemsProvider";
import { ReportProvider } from "@/context/reportProvider";

export default function Home({ pageProps }: any) {
  return (
    <ReportProvider>
      <SelectedItemsProvider>
        <DataProvider>
          <div {...pageProps}>
            <div className="flex flex-col items-center pt-10 gap-10 pl-4 pr-4">
              <div className="flex gap-6">
                <InputData />
                <TransformationFunctions />
                <TrackingFunctions />
              </div>

              <div className="flex gap-4">
                <DataGrid />

                <Radar />
                <Report />
              </div>

              <div></div>
            </div>
          </div>
        </DataProvider>
      </SelectedItemsProvider>
    </ReportProvider>
  );
}
