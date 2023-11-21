import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';

interface HintProps {
  children: React.ReactNode;
  description: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
}

export const Hint = ({
  children,
  description,
  side = 'bottom',
  sideOffset = 0
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          className="max-w-[220px] break-words text-xs"
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
