import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonProducts() {
  return (
    <div className="grid gap-1 grid-cols-2 md:gap-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-5 px-1 sm:px-3">
      {Array(6)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="flex flex-col gap-y-1 items-center shrink-0">
            <Skeleton className="h-32 bg-gray-200 w-32 sm:h-36 sm:w-36" />
            <Skeleton className="h-4 bg-gray-200 w-[50px]" />
          </div>
        ))}
    </div>
  );
}
