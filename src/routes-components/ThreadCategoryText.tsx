export default function ThreadCategoryText({
  children,
}: Readonly<{
  children: string;
}>) {
  return (
    <p>
      <span className="inline-block rounded-md border border-gray-300 px-2 py-1 dark:border-gray-600">
        #{children.split(' ').join('').toLowerCase()}
      </span>
    </p>
  );
}
