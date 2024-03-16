import { formatDistance } from 'date-fns';

export default function CreatedAtContent({
  createdAt,
}: Readonly<{
  createdAt: string;
}>) {
  return (
    <p>
      <time
        dateTime={formatDistance(createdAt, new Date(), {
          addSuffix: true,
        })}
      >
        {formatDistance(createdAt, new Date(), {
          addSuffix: true,
        })}
      </time>
    </p>
  );
}
