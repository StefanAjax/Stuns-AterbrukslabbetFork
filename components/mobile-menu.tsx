"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Home, BookUser, LockKeyhole, HelpCircle, Info, FileText, LogOut } from "lucide-react";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { source_sans_3 } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CreatePostLink from "@/app/(main-page)/_components/create-post-link";

interface MobileMenuProps {
  isAdmin: boolean;
  hasUnviewedReports: boolean;
  userId?: string;
}

export default function MobileMenu({ isAdmin, hasUnviewedReports, userId }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const { signOut } = useClerk();

  const iconProps = {
    strokeWidth: 1.5,
    className: "mr-2 h-5 w-5",
  };

  const handleSignOut = () => {
    signOut();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hidden p-1.5 max-lg:block [&_svg]:!size-8 [&_svg]:!h-8 [&_svg]:!w-8">
          <Menu className="text-primary" strokeWidth={2.5} />
          {hasUnviewedReports && (
            <span className="absolute right-0.5 top-2 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-destructive"></span>
            </span>
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-72 flex-col">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className={cn("text-xl font-medium", source_sans_3.className)}>Meny</h2>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="mt-4 flex flex-col space-y-1">
          {/* Primary Actions Section */}
          <SignedIn>
            <div className="mb-2" onClick={() => setOpen(false)}>
              <CreatePostLink className="w-full justify-center py-3" />
            </div>

            <Link href={`/profile/${userId}`} className="mb-3 flex items-center rounded-md px-3 py-3 hover:bg-accent" onClick={() => setOpen(false)}>
              <BookUser {...iconProps} />
              <span className={cn("font-medium", source_sans_3.className)}>Mina annonser</span>
            </Link>
          </SignedIn>

          <SignedOut>
            <Link href="/sign-in" className="mb-3 flex items-center justify-center rounded-md bg-primary px-3 py-3 text-white hover:bg-primary/90" onClick={() => setOpen(false)}>
              <span className={cn("font-medium", source_sans_3.className)}>Logga in</span>
            </Link>
          </SignedOut>

          {/* Divider */}
          <div className="my-2 border-t"></div>

          {/* General Navigation Section */}
          <div className="flex flex-col space-y-1 py-2">
            <h3 className={cn("mb-1 text-xs font-medium text-muted-foreground", source_sans_3.className)}>Navigering</h3>

            <Link href="/" className="flex items-center rounded-md px-3 py-2 hover:bg-accent" onClick={() => setOpen(false)}>
              <Home {...iconProps} />
              <span className={cn(source_sans_3.className)}>Hem</span>
            </Link>

            <Link href="/resources" className="flex items-center rounded-md px-3 py-2 hover:bg-accent" onClick={() => setOpen(false)}>
              <Info {...iconProps} />
              <span className={cn(source_sans_3.className)}>Resurser</span>
            </Link>

            <Link href="/faq" className="flex items-center rounded-md px-3 py-2 hover:bg-accent" onClick={() => setOpen(false)}>
              <HelpCircle {...iconProps} />
              <span className={cn(source_sans_3.className)}>Vanliga frågor</span>
            </Link>

            <Link href="/terms-of-service" className="flex items-center rounded-md px-3 py-2 hover:bg-accent" onClick={() => setOpen(false)}>
              <FileText {...iconProps} />
              <span className={cn(source_sans_3.className)}>Användarvillkor</span>
            </Link>

            <Link href="/about" className="flex items-center rounded-md px-3 py-2 hover:bg-accent" onClick={() => setOpen(false)}>
              <Info {...iconProps} />
              <span className={cn(source_sans_3.className)}>Om oss</span>
            </Link>
          </div>

          {/* Admin Section - Only shown to admins/moderators */}
          {isAdmin && (
            <>
              <div className="my-2 border-t"></div>
              <div className="flex flex-col space-y-1 py-2">
                <h3 className={cn("mb-1 text-xs font-medium text-muted-foreground", source_sans_3.className)}>Administration</h3>
                <Link href="/admin/dashboard" className="relative flex items-center rounded-md px-3 py-2 hover:bg-accent" onClick={() => setOpen(false)}>
                  <LockKeyhole {...iconProps} />
                  <span className={cn(source_sans_3.className)}>Adminpanel</span>
                  {hasUnviewedReports && (
                    <span className="ml-2 flex h-2 w-2">
                      <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-destructive opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive"></span>
                    </span>
                  )}
                </Link>
              </div>
            </>
          )}

          {/* Logout Button */}
          <SignedIn>
            <div className="mt-4 border-t"></div>
            <button onClick={handleSignOut} className="mt-4 flex items-center rounded-md px-3 py-2 hover:bg-warning/40">
              <LogOut {...iconProps} />
              <span className={cn(source_sans_3.className)}>Logga ut</span>
            </button>
          </SignedIn>
        </div>
      </SheetContent>
    </Sheet>
  );
}
