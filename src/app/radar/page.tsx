import { ContainerPanel } from "@/components";
import { CartesianPlan } from "@/components/cartesianPlan/cartesianPlan";

export default function Radar({ coordinates }: any) {
  return (
    <div className="flex flex-col gap-2 h-full w-auto pr-36">
      <h1 className="text-2xl">Radar</h1>

      <ContainerPanel>
        <CartesianPlan
          coordinates={[
            { x: 10, y: 20 },
            { x: 15, y: 10 },
            { x: 30, y: 40 },
          ]}
        />
      </ContainerPanel>
    </div>
  );
}
