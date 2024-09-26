export const InputNumber = ({
  value,
  onChange,
}: {
  value: number;
  onChange: any;
}) => {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-orange-300 w-14 rounded-lg pl-2"
    />
  );
};
