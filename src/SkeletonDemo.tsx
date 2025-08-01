import { Skeleton } from "./components/ui/skeleton";

export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <div>
          <h3>
            Sites still underconstraction. Please come back later :). Or we will
            notify you when it's done
          </h3>
        </div>
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
