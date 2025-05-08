"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { source_sans_3 } from "@/app/fonts";
import { useState } from "react";
import UnviewedReportsIndicator from "./unviewed-reports-indicator";

interface AdminDropdownProps {
  className?: string;
  hasUnviewedReports?: boolean;
}

type AdminMenuItem = {
  href: string;
  label: string;
  showNotification?: boolean;
};

const adminMenuItems: AdminMenuItem[] = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/users", label: "Användare" },
  { href: "/admin/reports", label: "Rapporter" },
  { href: "/admin/listings", label: "Annonser" },
  { href: "/admin/resources", label: "Resurser" },
];

export default function AdminDropdown({ className, hasUnviewedReports = false }: AdminDropdownProps) {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
  const [selectKey, setSelectKey] = useState(0);

  const handleValueChange = (value: string) => {
    router.push(value);
    setSelectedValue(undefined);
    setSelectKey((prevKey) => prevKey + 1);
  };

  // Update menu items to show notification on Reports
  const menuItemsWithNotification = adminMenuItems.map((item) => (item.href === "/admin/reports" ? { ...item, showNotification: hasUnviewedReports } : item));

  return (
    <div className={className}>
      <Select key={selectKey} value={selectedValue} onValueChange={handleValueChange}>
        <SelectTrigger
          className={cn("flex select-none items-center gap-x-1 border-none bg-transparent text-lg font-medium shadow-none transition-colors hover:text-accent focus:ring-0", source_sans_3.className)}
        >
          <div className="relative flex items-center">
            {hasUnviewedReports && <UnviewedReportsIndicator hasUnviewedReports={true} className="absolute -left-3 -top-0 h-2 w-2" />}
            <SelectValue placeholder="Adminpanel">Adminpanel</SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent>
          {menuItemsWithNotification.map((item) => (
            <SelectItem key={item.href} value={item.href} className="relative">
              {item.label}
              {item.showNotification && <UnviewedReportsIndicator hasUnviewedReports={true} className="absolute right-2 top-1/2 h-2 w-2 -translate-y-1/2" />}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
