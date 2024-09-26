import { ContainerPanel } from "@/components";
import TranslateXY from "./translateXY/page";
import RotateXY from "./rotateXY/page";
import EchelonXY from "./echelonXY/page";

export default function TransformationFunctions() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Funções de transformações</h1>

      <div className="flex gap-2">
        <TranslateXY />
        <RotateXY />
        <EchelonXY />
      </div>
    </div>
  );
}
