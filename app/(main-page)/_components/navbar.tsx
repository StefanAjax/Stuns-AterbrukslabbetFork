import { BookUser, LockKeyhole, PlusSquare } from "lucide-react";
import Link from "next/link";

import { checkRole } from "@/utils/check-role";
import { cn } from "@/lib/utils";
import { getUserId } from "@/utils/get-user-id";
import Logo from "@/components/logo";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { source_sans_3 } from "@/app/fonts";
import AdminDropdown from "@/components/admin-dropdown";

type NavItemProps = {
  href: string;
  mobileIcon: React.ReactNode;
  desktopText: string;
  className?: string;
};

const NavItem = ({ href, mobileIcon, desktopText, className }: NavItemProps) => (
  <Link href={href}>
    <div className="md:hidden">{mobileIcon}</div>
    <span className={cn("hidden md:block", className, source_sans_3.className)}>{desktopText}</span>
  </Link>
);

export default async function Navbar() {
  const userId = await getUserId();
  const isAdminOrModerator = (await checkRole("admin")) || (await checkRole("moderator"));

  const iconProps = { strokeWidth: 1, width: 30, height: 30 };

  return (
    <header className="flex h-20 bg-white">
      <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between px-4">
        <Logo variant="emerald" layout="row" href="/" />

        <nav className="flex items-center gap-3 md:gap-4">
          <SignedOut>
            <Link className={cn("font-semibold", source_sans_3.className)} href="/sign-in">
              Logga in
            </Link>
          </SignedOut>

          <SignedIn>
            {isAdminOrModerator && (
              <>
                <Link href="/admin/dashboard" className="md:hidden">
                  <LockKeyhole {...iconProps} />
                </Link>
                <div className="hidden md:block">
                  <AdminDropdown className={cn("font-medium", source_sans_3.className)} />
                </div>
              </>
            )}

            <NavItem href={`/profile/${userId}`} mobileIcon={<BookUser {...iconProps} />} desktopText="Mina annonser" className="font-medium hover:opacity-80" />

            <NavItem href="/create-post" mobileIcon={<PlusSquare {...iconProps} />} desktopText="Skapa annons" className="rounded-md bg-sky-600 px-4 py-1.5 font-medium text-white hover:opacity-85" />

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
