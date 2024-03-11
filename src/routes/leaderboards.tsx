import useLeaderboards from '@/hooks/react-query-network/useLeaderboards';
import useThreads from '@/hooks/react-query-network/useThreads';
import useUsers from '@/hooks/react-query-network/useUsers';
import TableRowData from '@/routes-components/leaderboards/TabelRowData';
import TableHead from '@/routes-components/leaderboards/TableHead';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/leaderboards')({
  component: Leaderboards,
});

function Leaderboards() {
  const { data: dataLeaderboards } = useLeaderboards();
  const { data: dataThreads } = useThreads();
  const { data: dataUsers } = useUsers();

  return (
    <div>
      <h1 className="font-poppins mb-4 text-2xl font-bold">
        Users Active Standings
      </h1>

      <table className="w-full table-fixed border-collapse">
        <TableHead />

        <tbody>
          {dataLeaderboards && dataThreads && dataUsers
            ? dataLeaderboards.data.leaderboards.map((leaderBoard) => (
                <TableRowData
                  key={leaderBoard.user.id}
                  leaderBoard={leaderBoard}
                  dataThreads={dataThreads}
                  dataUsers={dataUsers}
                />
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
