import { ContainerPanel } from "@/components";

export default function DataGrid() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Data Grid</h1>
      <ContainerPanel>
        <div className="flex w-64 h-64">data grid</div>
      </ContainerPanel>
    </div>
  );
}
