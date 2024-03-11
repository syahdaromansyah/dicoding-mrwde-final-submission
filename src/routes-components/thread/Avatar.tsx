import type {
  TThreadResponse,
  TThreadsResponse,
  TUsersResponse,
} from '@/types/types';

export default function Avatar({
  dataThread,
  dataThreads,
  dataUsers,
}: Readonly<{
  dataThread: TThreadResponse;
  dataThreads: TThreadsResponse;
  dataUsers: TUsersResponse;
}>) {
  return (
    <p className="flex items-center gap-x-2">
      <img
        className="block w-6 rounded-full"
        src={
          dataThreads && dataUsers
            ? dataUsers.data.users.find(
                (user) => user.id === dataThread.data.detailThread.owner.id,
              )?.avatar
            : ''
        }
        alt={`${
          dataThreads && dataUsers
            ? dataUsers.data.users.find(
                (user) => user.id === dataThread.data.detailThread.owner.id,
              )?.avatar
            : null
        } profile`}
      />

      {dataThreads && dataUsers
        ? dataUsers.data.users.find(
            (user) => user.id === dataThread.data.detailThread.owner.id,
          )?.name
        : null}
    </p>
  );
}
