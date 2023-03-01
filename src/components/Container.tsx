import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen bg-gray-50 py-10 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
