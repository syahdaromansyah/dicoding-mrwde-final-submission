import type { TThreadData, TUsersData } from '@/types/types';

export default function Avatar({
  dataThread,
  dataUsers,
}: Readonly<{
  dataThread: TThreadData;
  dataUsers: TUsersData;
}>) {
  return (
    <p className="flex items-center gap-x-2">
      <img
        className="block w-6 rounded-full"
        src={
          dataUsers
            ? dataUsers.find((user) => user.id === dataThread.owner.id)?.avatar
            : ''
        }
        alt={`${
          dataUsers
            ? dataUsers.find((user) => user.id === dataThread.owner.id)?.avatar
            : null
        } profile`}
      />

      {dataUsers
        ? dataUsers.find((user) => user.id === dataThread.owner.id)?.name
        : null}
    </p>
  );
}
