import {Skeleton} from "@heroui/skeleton";
import Card from "../card";

export default function SkeletonUi() {
  return (
    <Card className="space-y-5 p-4 rounded-lg">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-gray-500" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-gray-400" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-gray-400" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-gray-500" />
        </Skeleton>
      </div>
    </Card>
  );
}
