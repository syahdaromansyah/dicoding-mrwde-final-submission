import {
  TLeaderBoardData,
  TThreadsResponse,
  TUsersResponse,
} from '@/types/types';

export default function TableRowData({
  leaderBoard,
  dataThreads,
  dataUsers,
}: Readonly<{
  leaderBoard: TLeaderBoardData;
  dataThreads: TThreadsResponse;
  dataUsers: TUsersResponse;
}>) {
  return (
    <tr key={leaderBoard.user.id}>
      <td className="">
        <p className="flex items-center gap-x-2 md:text-xl">
          <img
            className="block w-6 rounded-full"
            src={
              dataThreads && dataUsers
                ? dataUsers.data.users.find(
                    (user) => user.id === leaderBoard.user.id,
                  )?.avatar
                : ''
            }
            alt={`${
              dataThreads && dataUsers
                ? dataUsers.data.users.find(
                    (user) => user.id === leaderBoard.user.id,
                  )?.avatar
                : null
            } profile`}
          />

          {dataThreads && dataUsers
            ? dataUsers.data.users.find(
                (user) => user.id === leaderBoard.user.id,
              )?.name
            : null}
        </p>
      </td>

      <td className="p-2 text-right md:text-xl">
        <p>{leaderBoard.score}</p>
      </td>
    </tr>
  );
}
