"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-x-1 transition-colors hover:text-accent">
        <span>Adminpanel</span>
        <ChevronDown className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md bg-popover ring-1 ring-ring/50">
          {adminMenuItems.map((item) => (
            <Link key={item.href} href={item.href} className="block px-3 py-2 text-sm text-popover-foreground hover:text-accent" onClick={() => setIsOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
