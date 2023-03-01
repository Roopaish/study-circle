export default function Avatar({ name }: { name: string }) {
  var parts = name.split(" ");
  var initials = "";
  for (var i = 0; i < parts.length; i++) {
    if (parts[i].length > 0 && parts[i] !== "") {
      initials += parts[i][0];
    }
  }

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 font-semibold uppercase text-white">
      {initials}
    </div>
  );
}
