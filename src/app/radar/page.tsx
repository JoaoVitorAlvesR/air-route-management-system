import { ContainerPanel } from "@/components";
import RotateXY from "../inputData/transformationFunctions/rotateXY/page";
import TranslateXY from "../inputData/transformationFunctions/translateXY/page";

export default function Radar() {
  return (
    <div className="flex flex-col gap-2 h-full ">
      <h1 className="text-2xl">Radar</h1>

      <ContainerPanel>
        <div className="flex w-96 h-96">radar</div>
      </ContainerPanel>
    </div>
  );
}
