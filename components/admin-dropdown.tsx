"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { source_sans_3 } from "@/app/fonts";
import { useState } from "react";

interface AdminDropdownProps {
  className?: string;
}

type AdminMenuItem = {
  href: string;
  label: string;
};

const adminMenuItems: AdminMenuItem[] = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/users", label: "Användare" },
  { href: "/admin/reports", label: "Rapporter" },
  { href: "/admin/listings", label: "Annonser" },
  { href: "/admin/resources", label: "Resurser" },
];

export default function AdminDropdown({ className }: AdminDropdownProps) {
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
          <SelectValue placeholder="Adminpanel">Adminpanel</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {adminMenuItems.map((item) => (
            <SelectItem key={item.href} value={item.href}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
