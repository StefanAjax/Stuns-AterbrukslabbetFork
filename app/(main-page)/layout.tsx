import { Toaster } from "sonner";

import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

export default function MainPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100vh] flex-col">
      <Navbar />
      <main className="flex-1">
        <div>{children}</div>
        <Toaster richColors />
      </main>
      <Footer />
    </div>
  );
}
