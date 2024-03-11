import type { TThreadResponse } from '@/types/types';
import { formatDistance } from 'date-fns';

export default function CreatedAtContent({
  dataThread,
}: Readonly<{
  dataThread: TThreadResponse;
}>) {
  return (
    <p>
      <time
        dateTime={formatDistance(
          dataThread.data.detailThread.createdAt,
          new Date(),
          {
            addSuffix: true,
          },
        )}
      >
        {formatDistance(dataThread.data.detailThread.createdAt, new Date(), {
          addSuffix: true,
        })}
      </time>
    </p>
  );
}
