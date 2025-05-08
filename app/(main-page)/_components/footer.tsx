import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-5 border-t px-5 py-7 sm:flex-row-reverse sm:justify-between sm:px-9">
      <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm font-medium">
        <Link href="/faq" className="text-neutral-600 transition-colors hover:text-emerald-600">
          Vanliga frågor
        </Link>
        <Link href="/about" className="text-neutral-600 transition-colors hover:text-emerald-600">
          Om oss
        </Link>
        <Link href="/terms-of-service" className="text-neutral-600 transition-colors hover:text-emerald-600">
          Användarvillkor
        </Link>
        <Link href="/resources" className="hover:underline">
          Resurser
        </Link>
      </div>
      <p className="text-center text-neutral-500">&copy; {new Date().getFullYear()} Återbrukslabbet</p>
    </footer>
  );
}
