import { TLeaderBoardData, TUsersData } from '@/types/types';

export default function TableRowData({
  leaderBoard,
  dataUsers,
}: Readonly<{
  leaderBoard: TLeaderBoardData;
  dataUsers: TUsersData;
}>) {
  return (
    <tr key={leaderBoard.user.id}>
      <td>
        <p className="flex items-center gap-x-2 md:text-xl">
          <img
            className="block w-6 rounded-full"
            src={
              dataUsers
                ? dataUsers.find((user) => user.id === leaderBoard.user.id)
                    ?.avatar
                : ''
            }
            alt={`${
              dataUsers
                ? dataUsers.find((user) => user.id === leaderBoard.user.id)
                    ?.avatar
                : null
            } profile`}
          />

          {dataUsers
            ? dataUsers.find((user) => user.id === leaderBoard.user.id)?.name
            : null}
        </p>
      </td>

      <td className="p-2 text-right md:text-xl">
        <p>{leaderBoard.score}</p>
      </td>
    </tr>
  );
}
