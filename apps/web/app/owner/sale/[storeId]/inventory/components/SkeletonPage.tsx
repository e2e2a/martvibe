import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

export default function SkeletonPage() {
  return (
    <>
      {Array(6)
        .fill(null)
        .map((_, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              <Skeleton className="h-4 bg-gray-200 w-full" />
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-4 bg-gray-200 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 bg-gray-200 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 bg-gray-200 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 bg-gray-200 w-full" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 bg-gray-200 w-full" />
            </TableCell>
          </TableRow>
        ))}
    </>
  );
}
