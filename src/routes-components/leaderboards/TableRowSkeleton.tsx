import { Skeleton } from '@/components/ui/skeleton';

export default function TableRowSkeleton() {
  return (
    <tr>
      <td>
        <div className="flex items-center gap-x-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-[40%]" />
        </div>
      </td>

      <td className="flex justify-end p-2">
        <Skeleton className="h-8 w-[10%]" />
      </td>
    </tr>
  );
}
