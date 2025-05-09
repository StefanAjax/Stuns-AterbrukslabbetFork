"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface MunicipalityPickerProps {
  currentMunicipality: string;
  setCurrentMunicipality: (...event: any[]) => void;
  itemsList: string[];
  id?: string;
  "aria-required"?: boolean;
  "aria-describedby"?: string;
}

export default function MunicipalityPicker({ currentMunicipality, setCurrentMunicipality, itemsList, id, ...props }: MunicipalityPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} id={id} role="combobox" aria-expanded={open} className="w-full justify-between capitalize" {...props}>
          {currentMunicipality ? itemsList.find((listItem) => listItem === currentMunicipality) : "Välj kommun"}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[160px] p-0 md:w-[260px]">
        <Command>
          <CommandInput placeholder="Sök kommuner...." />
          <CommandList>
            {itemsList.map((listItem) => (
              <CommandItem
                key={listItem}
                value={listItem}
                className="capitalize"
                onSelect={(selectedValue) => {
                  setCurrentMunicipality(selectedValue === currentMunicipality ? "" : selectedValue);
                  setOpen(false);
                }}
              >
                <Check className={cn("mr-2 size-4", currentMunicipality === listItem ? "opacity-100" : "opacity-0")} />
                {listItem}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
