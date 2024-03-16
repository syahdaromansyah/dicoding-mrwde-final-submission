import { Skeleton } from '@/components/ui/skeleton';

export default function ThreadSkeleton() {
  return (
    <div className="rounded-md border border-gray-300 p-2 dark:border-gray-600">
      <Skeleton className="mb-2 h-8 w-[10%]" />
      <Skeleton className="mb-2 h-12 w-[65%]" />
      <Skeleton className="mb-2 h-7 w-[98%]" />
      <Skeleton className="mb-2 h-7 w-[96%]" />
      <div className="flex items-center gap-x-2">
        <Skeleton className="h-7 w-[5%]" />
        <Skeleton className="h-7 w-[5%]" />
        <Skeleton className="h-7 w-[5%]" />

        <div className="flex-1">
          <Skeleton className="h-7 w-[45%]" />
        </div>

        <div className="flex-1">
          <Skeleton className="h-7 w-[45%]" />
        </div>
      </div>
    </div>
  );
}
