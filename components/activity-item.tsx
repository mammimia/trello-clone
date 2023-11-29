import { generateLogMessage } from '@/lib/generate-log-mesage';
import { AuditLog } from '@prisma/client';
import { format } from 'date-fns';
import { Avatar, AvatarImage } from './ui/avatar';

interface ActivityItemProps {
  activity: AuditLog;
}

export const ActivityItem = ({ activity }: ActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar>
        <AvatarImage src={activity.userImage} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-neutral-700">
          <span className="mr-1 font-semibold text-neutral-700">
            {activity.userName}
          </span>
          {generateLogMessage(activity)}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(activity.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  );
};
