import { redirect } from "next/navigation";
import { checkRole } from "@/utils/check-role";
import Link from "next/link";

type AdminMenuItem = {
  href: string;
  title: string;
  description: string;
};

const adminMenuItems: AdminMenuItem[] = [
  {
    href: "/admin/users",
    title: "Användare",
    description: "Hantera användare och behörigheter",
  },
  {
    href: "/admin/reports",
    title: "Rapporter",
    description: "Hantera anmälningar från användare",
  },
  {
    href: "/admin/listings",
    title: "Annonser",
    description: "Exportera arkiverade annonser",
  },
];

export default async function AdminDashboard() {
  if (!(await checkRole("admin")) && !(await checkRole("moderator"))) {
    redirect("/");
  }

  return (
    <div className="mx-auto mt-10 max-w-screen-md p-4">
      <h1 className="mb-6 text-center text-2xl font-semibold">Admin Dashboard</h1>

      <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        {adminMenuItems.map((item) => (
          <Link key={item.href} href={item.href} className="block rounded-lg bg-card p-6 hover:bg-accent">
            <h2 className="mb-2 text-xl font-semibold">{item.title}</h2>
            <p className="text-card-foreground">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
