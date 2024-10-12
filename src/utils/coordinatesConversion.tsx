export default function CoordinatesConversion(
  object: object,
  conversionType: boolean
) {
  if (conversionType) {
    const { x, y } = object;
    const radius = Math.sqrt(x * x + y * y);
    const angle = Math.atan2(y, x);

    return {
      radius,
      angle,
      x: parseFloat(x),
      y: parseFloat(y),
    };
  } else if (!conversionType) {
    const { radius, angle } = object;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return {
      x,
      y,
      radius: parseFloat(radius),
      angle: parseFloat(angle),
    };
  }
}
