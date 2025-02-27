import { CircleHelp } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FormHintProps {
  content: string;
}

export default function FormHint({ content }: FormHintProps) {
  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger className="hidden xl:block" type="button">
            <CircleHelp strokeWidth={2} width={20} height={20} />
          </TooltipTrigger>
          <TooltipContent side="bottom" className="w-[170px] text-center text-sm">
            {content}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Mobile */}
      <Popover>
        <PopoverTrigger className="block xl:hidden">
          <CircleHelp strokeWidth={2} width={20} height={20} />
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[170px] p-2 text-center text-xs">
          {content}
        </PopoverContent>
      </Popover>
    </>
  );
}
