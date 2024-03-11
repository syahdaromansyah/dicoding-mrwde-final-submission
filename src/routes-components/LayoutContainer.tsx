import type { ReactNode } from 'react';

export default function LayoutContainer({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="container mx-auto h-full max-h-full w-full p-4">
      {children}
    </div>
  );
}
