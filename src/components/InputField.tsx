export default function InputField({
  label,
  name,
  id,
  className,
  ...rest
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={name} className="text-base font-medium text-gray-900">
          {label}
        </label>
      </div>
      <div className="mt-2.5">
        <input
          id={name}
          {...rest}
          className="block w-full rounded-md border border-gray-200 bg-gray-50 p-4 text-black placeholder-gray-500 caret-blue-600 transition-all duration-200 focus:border-blue-600 focus:bg-white focus:outline-none"
        />
      </div>
    </div>
  );
}
