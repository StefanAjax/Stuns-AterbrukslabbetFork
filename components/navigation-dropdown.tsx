"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { source_sans_3 } from "@/app/fonts";
import { useState } from "react";

type NavMenuItem = {
  href: string;
  label: string;
};

const navMenuItems: NavMenuItem[] = [
  { href: "/resources", label: "Resurser" },
  { href: "/faq", label: "Vanliga frågor" },
  { href: "/terms-of-service", label: "Användarvillkor" },
  { href: "/about", label: "Om oss" },
];

export default function NavigationDropdown({ className }: { className?: string }) {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
  const [selectKey, setSelectKey] = useState(0);

  const handleValueChange = (value: string) => {
    router.push(value);
    setSelectedValue(undefined);
    setSelectKey((prevKey) => prevKey + 1);
  };

  return (
    <div className={className}>
      <Select key={selectKey} value={selectedValue} onValueChange={handleValueChange}>
        <SelectTrigger
          className={cn("flex select-none items-center gap-x-1 border-none bg-transparent text-lg font-medium shadow-none transition-colors hover:text-accent focus:ring-0", source_sans_3.className)}
        >
          <SelectValue placeholder="Navigation">Navigation</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {navMenuItems.map((item) => (
            <SelectItem key={item.href} value={item.href}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
