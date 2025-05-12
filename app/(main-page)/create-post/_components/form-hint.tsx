import { CircleHelp } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FormHintProps {
  content: string;
  id?: string;
}

export default function FormHint({ content, id = "form-hint" }: FormHintProps) {
  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger className="hidden xl:block" type="button" aria-label="Visa hjälptext">
            <CircleHelp strokeWidth={2} width={14} height={14} />
          </TooltipTrigger>
          <TooltipContent side="bottom" className="w-[170px] text-center text-sm" id={`${id}-tooltip`}>
            {content}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Mobile */}
      <Popover>
        <PopoverTrigger className="block xl:hidden" aria-label="Visa hjälptext">
          <CircleHelp strokeWidth={2} width={14} height={14} />
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[170px] p-2 text-center text-xs" id={`${id}-popover`} role="tooltip">
          {content}
        </PopoverContent>
      </Popover>
    </>
  );
}
