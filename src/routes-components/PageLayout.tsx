import type { ReactNode } from 'react';

export default function PageLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="relative h-screen overflow-y-auto bg-gray-100 px-4 font-inter text-slate-800 lg:px-0 xl:px-0 dark:bg-gray-900 dark:text-slate-100">
      {children}
    </div>
  );
}
