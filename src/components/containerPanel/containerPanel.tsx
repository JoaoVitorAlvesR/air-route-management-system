export const ContainerPanel = ({ children }: { children: any }) => {
  return (
    <div className="flex flex-col border-4 rounded-3xl border-purple-950 p-6 gap-5">
      {children}
    </div>
  );
};
