import LoadingProgress from '@/components/LoadingProgress';
import useLeaderBoardsSlice from '@/hooks/useLeaderBoardsSlice';
import useUsersSlice from '@/hooks/useUsersSlice';
import TableRowData from '@/routes-components/leaderboards/TabelRowData';
import TableHead from '@/routes-components/leaderboards/TableHead';
import TableRowSkeleton from '@/routes-components/leaderboards/TableRowSkeleton';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/leaderboards')({
  component: LeaderBoards,
});

function LeaderBoards() {
  const { leaderBoards, statusLeaderBoards } = useLeaderBoardsSlice();
  const { users } = useUsersSlice();

  return (
    <div>
      <LoadingProgress
        isLoading={statusLeaderBoards === 'loading'}
        isSuccess={statusLeaderBoards === 'succeeded'}
        isError={statusLeaderBoards === 'failed'}
      />

      <h1 className="mb-4 font-space-grotesk text-2xl font-bold">
        Users Active Standings
      </h1>

      <table className="w-full table-fixed border-collapse">
        <TableHead />

        <tbody>
          {leaderBoards.length > 0 ? (
            leaderBoards.map((leaderBoard) => (
              <TableRowData
                key={leaderBoard.user.id}
                leaderBoard={leaderBoard}
                dataUsers={users}
              />
            ))
          ) : (
            <>
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
