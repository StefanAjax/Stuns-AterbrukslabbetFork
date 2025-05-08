import { BookUser, LockKeyhole, PlusSquare } from "lucide-react";
import Link from "next/link";

import { checkRole } from "@/utils/check-role";
import { cn } from "@/lib/utils";
import { getUserId } from "@/utils/get-user-id";
import Logo from "@/components/logo";
import Logomark from "@/components/logomark";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { source_sans_3 } from "@/app/fonts";
import AdminDropdown from "@/components/admin-dropdown";
import CreatePostLink from "./create-post-link";
import { checkUnviewedReports } from "../admin/_utils/check-unviewed-reports";
import UnviewedReportsIndicator from "@/components/unviewed-reports-indicator";

type NavItemProps = {
  href: string;
  mobileIcon: React.ReactNode;
  desktopText: string;
  className?: string;
};

const NavItem = ({ href, mobileIcon, desktopText, className }: NavItemProps) => (
  <Link href={href}>
    <div className="text-primary md:hidden">{mobileIcon}</div>
    <span className={cn("hidden md:block", className, source_sans_3.className)}>{desktopText}</span>
  </Link>
);

export default async function Navbar() {
  const isAdminOrModerator = (await checkRole("admin")) || (await checkRole("moderator"));
  const hasUnviewedReports = isAdminOrModerator ? await checkUnviewedReports() : false;

  const iconProps = { strokeWidth: 2, width: 25, height: 25, className: "text-primary" };

  return (
    <header className="flex h-20 bg-white">
      <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between px-4">
        <div className="md:hidden">
          <Link href="/">
            <Logomark variant="emerald" width={40} height={40} />
          </Link>
        </div>
        <div className="hidden md:block">
          <Logo variant="emerald" layout="row" href="/" />
        </div>
        <nav className="flex items-center gap-3 md:gap-4">
          <SignedOut>
            <Link className={cn("font-semibold", source_sans_3.className)} href="/sign-in">
              Logga in
            </Link>
          </SignedOut>
          <SignedIn>
            {isAdminOrModerator && (
              <>
                <Link href="/admin/dashboard" className="relative md:hidden">
                  <LockKeyhole {...iconProps} />
                  {hasUnviewedReports && (
                    <span className="absolute -right-1 -top-1 flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive"></span>
                    </span>
                  )}
                </Link>
                <div className="hidden md:block">
                  <AdminDropdown hasUnviewedReports={hasUnviewedReports} />
                </div>
              </>
            )}
            <NavItem href={`/profile/${await getUserId()}`} mobileIcon={<BookUser {...iconProps} />} desktopText="Mina annonser" className="font-medium hover:opacity-80" />
            <div className="md:hidden">
              <NavItem href="/create-post" mobileIcon={<PlusSquare {...iconProps} />} desktopText="" className="" />
            </div>
            <div className="hidden md:block">
              <CreatePostLink />
            </div>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: {
                    height: { desktop: 35, mobile: 30 },
                    width: { desktop: 35, mobile: 30 },
                  },
                },
              }}
            />
          </SignedIn>
        </nav>
      </div>
    </header>
  );
}
