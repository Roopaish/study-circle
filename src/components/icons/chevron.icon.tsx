export default function ChevronIcon({
  variant,
}: {
  variant: "up" | "down" | "left" | "right";
}) {
  const points =
    variant == "up"
      ? "18 15 12 9 6 15"
      : variant == "down"
      ? "6 9 12 15 18 9"
      : variant == "right"
      ? "9 18 15 12 9 6"
      : "15 18 9 12 15 6";

  return (
    <>
      <polyline points={points}></polyline>
    </>
  );
}
