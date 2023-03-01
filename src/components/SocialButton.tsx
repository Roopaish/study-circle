import { ReactNode } from "react";

export default function SocialButton({
  className,
  type,
  icon,
  children,
  ...rest
}: { icon: ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...rest}
      className="relative inline-flex w-full items-center justify-center rounded-md border-2 border-gray-200 bg-white px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
    >
      <div className="absolute inset-y-0 left-0 p-4">{icon}</div>
      {children}
    </button>
  );
}
