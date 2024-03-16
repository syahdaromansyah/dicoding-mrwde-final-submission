import type { ReactNode } from 'react';

export default function ThreadsCategories({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <p>
      <span className="inline-block rounded-md border border-gray-300 px-2 py-1 dark:border-gray-600">
        #{children}
      </span>
    </p>
  );
}
