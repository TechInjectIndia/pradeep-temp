import Link from "next/link";
import { clsx } from "clsx";
import type { StageProgress as StageProgressType } from "@/types";

interface Props {
  stage: StageProgressType;
  batchId: string;
}

export default function StageProgress({ stage, batchId }: Props) {
  const percentage =
    stage.total > 0 ? Math.round((stage.completed / stage.total) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{stage.stage}</span>
        <span className="text-gray-500">
          {stage.completed}/{stage.total} ({percentage}%)
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-gray-200">
        <div
          className={clsx(
            "h-2.5 rounded-full transition-all duration-500",
            percentage === 100
              ? "bg-green-500"
              : percentage > 0
              ? "bg-blue-500"
              : "bg-gray-300"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {stage.failed > 0 && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-red-600">
            {stage.failed} failed
          </span>
          <Link
            href={`/batches/${batchId}/errors?stage=${stage.stage}`}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            View errors
          </Link>
        </div>
      )}
    </div>
  );
}
