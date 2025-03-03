import Link from "next/link";

import Logo from "@/components/logo";

import Footer from "./(main-page)/_components/footer";
import Navbar from "./(main-page)/_components/navbar";

export default async function NotFound() {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-5 text-center">
        <Logo />
        <h1 className="text-pretty pt-4 text-2xl font-semibold">Ojdå... sidan kunde inte hittas</h1>
        <p className="max-w-screen-sm text-balance text-lg">Om felet är hos oss ber vi om ursäkt! Kolla gärna att adressen stämmer överens med dit du ville.</p>
        <Link className="text-blue-500 pt-1" href="/">
          Gå till startsidan
        </Link>
      </div>
      <Footer />
    </div>
  );
}
