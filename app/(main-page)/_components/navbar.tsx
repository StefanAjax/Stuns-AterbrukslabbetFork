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
import MobileMenu from "@/components/mobile-menu";
import NavigationDropdown from "@/components/navigation-dropdown";

type NavItemProps = {
  href: string;
  desktopText: string;
  className?: string;
};

const NavItem = ({ href, desktopText, className }: NavItemProps) => (
  <Link href={href}>
    <span className={cn("hidden lg:block", className, source_sans_3.className)}>{desktopText}</span>
  </Link>
);

export default async function Navbar() {
  const isAdminOrModerator = (await checkRole("admin")) || (await checkRole("moderator"));
  const hasUnviewedReports = isAdminOrModerator ? await checkUnviewedReports() : false;
  const userId = await getUserId();
  // Convert null to undefined for the userId to match the expected type
  const userIdOrUndefined = userId || undefined;

  return (
    <header className="flex h-20 bg-white">
      <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between px-4">
        {/* Logo for small screens (mobile only) */}
        <div className="block sm:hidden">
          <Link href="/">
            <Logomark variant="emerald" width={40} height={40} />
          </Link>
        </div>

        {/* Logo with text for larger screens */}
        <div className="hidden sm:block">
          <Logo variant="emerald" layout="row" href="/" />
        </div>

        <nav className="flex items-center gap-3 md:gap-4">
          {/* Desktop navigation */}
          <div className="hidden items-center gap-6 lg:flex">
            {/* Primary navigation */}
            <div className="flex items-center gap-3">
              <SignedIn>{isAdminOrModerator && <AdminDropdown hasUnviewedReports={hasUnviewedReports} />}</SignedIn>

              <NavigationDropdown />
            </div>

            {/* Visual separator */}
            <div className="h-6 border-r border-gray-200"></div>

            {/* User-specific navigation */}
            <SignedOut>
              <Link
                className={cn("rounded-md border border-primary bg-white px-4 py-2 text-lg font-medium text-primary transition-colors hover:bg-primary/5", source_sans_3.className)}
                href="/sign-in"
              >
                Logga in
              </Link>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-4">
                <NavItem href={`/profile/${userId}`} desktopText="Mina annonser" className="text-lg font-medium hover:opacity-80" />

                <CreatePostLink />

                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: {
                        height: { desktop: 35, mobile: 30 },
                        width: { desktop: 35, mobile: 30 },
                      },
                    },
                  }}
                ></UserButton>
              </div>
            </SignedIn>
          </div>

          {/* Mobile and tablet navigation */}
          <div className="flex items-center gap-3 lg:hidden">
            <SignedIn>
              <MobileMenu isAdmin={isAdminOrModerator} hasUnviewedReports={hasUnviewedReports} userId={userIdOrUndefined} />

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: {
                      height: { desktop: 35, mobile: 30 },
                      width: { desktop: 35, mobile: 30 },
                    },
                  },
                }}
              ></UserButton>
            </SignedIn>

            <SignedOut>
              <MobileMenu isAdmin={isAdminOrModerator} hasUnviewedReports={hasUnviewedReports} userId={userIdOrUndefined} />
            </SignedOut>
          </div>
        </nav>
      </div>
    </header>
  );
}
