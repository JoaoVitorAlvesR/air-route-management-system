import { ContainerPanel } from "@/components";

export default function Report() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Relatório</h1>
      <ContainerPanel>
        <div className="flex w-64 h-64">relatório</div>
      </ContainerPanel>
    </div>
  );
}
