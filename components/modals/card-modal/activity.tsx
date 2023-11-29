'use client';

import { ActivityItem } from '@/components/activity-item';
import { Skeleton } from '@/components/ui/skeleton';
import { AuditLog } from '@prisma/client';
import { ActivityIcon } from 'lucide-react';

interface ActivityProps {
  auditLogs: AuditLog[];
}

export const Activity = ({ auditLogs }: ActivityProps) => {
  return (
    <div className="flex w-full items-start gap-x-3">
      <ActivityIcon className="mt-0.5 h-5 w-5 text-neutral-700" />
      <div className="w-full">
        <p className="mb-2 font-semibold text-neutral-700">Activity</p>
        <ol className="mt-2 space-y-4">
          {auditLogs.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </ol>
      </div>
    </div>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex w-full items-center gap-x-3">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="mb-2 h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-10 w-full bg-neutral-200" />
      </div>
    </div>
  );
};
