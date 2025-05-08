import Link from "next/link";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <Link href={href} className="text-neutral-600 transition-colors hover:text-emerald-600">
    {children}
  </Link>
);

const footerLinks = [
  { href: "/faq", label: "Vanliga frågor" },
  { href: "/about", label: "Om oss" },
  { href: "/terms-of-service", label: "Användarvillkor" },
  { href: "/resources", label: "Resurser" },
];

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-5 border-t px-5 py-7 sm:flex-row-reverse sm:justify-between sm:px-9">
      <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm font-medium">
        {footerLinks.map(({ href, label }) => (
          <FooterLink key={href} href={href}>
            {label}
          </FooterLink>
        ))}
      </div>
      <p className="text-center text-neutral-500">&copy; {new Date().getFullYear()} Återbrukslabbet</p>
    </footer>
  );
}
