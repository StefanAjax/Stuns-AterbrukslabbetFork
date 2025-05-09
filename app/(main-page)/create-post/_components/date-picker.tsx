"use client";

import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  date: Date;
  setDate: (...event: any[]) => void;
  id?: string;
  "aria-required"?: boolean;
  "aria-describedby"?: string;
}

export default function DatePicker({ date, setDate, id, ...props }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" id={id} className="w-full justify-start bg-white bg-opacity-40 text-left font-normal" aria-haspopup="dialog" aria-label="Välj slutdatum" {...props}>
          <CalendarIcon className="mr-2 size-4" />
          {date ? date.toLocaleDateString("sv-se") : <span>Välj datum</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus disabled={(date) => date < new Date()} aria-label="Välj ett datum" />
      </PopoverContent>
    </Popover>
  );
}
