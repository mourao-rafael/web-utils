import type { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { CircleHelp } from "lucide-react"

interface LabelTooltipProps {
  children: ReactNode;
};

const LabelTooltip = ({ children }: LabelTooltipProps) => {
  return <Tooltip>
    <TooltipTrigger asChild>
      <CircleHelp className='w-4 h-4 text-muted-foreground hover:text-foreground' />
    </TooltipTrigger>
    <TooltipContent side='top' align='start' className='max-w-md'>
      {children}
    </TooltipContent>
  </Tooltip>
}

export default LabelTooltip;