import { redirect } from "next/navigation";
import { checkRole } from "@/utils/check-role";
import Link from "next/link";
import { checkUnviewedReports } from "../_utils/check-unviewed-reports";
import UnviewedReportsIndicator from "@/components/unviewed-reports-indicator";

type AdminMenuItem = {
  href: string;
  title: string;
  description: string;
  showNotification?: boolean;
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
    showNotification: false, // Default value, will be updated dynamically
  },
  {
    href: "/admin/listings",
    title: "Annonser",
    description: "Exportera arkiverade annonser",
  },
  {
    href: "/admin/resources",
    title: "Resurser",
    description: "Ladda upp resurser för användare",
  },
];

export default async function AdminDashboard() {
  if (!(await checkRole("admin")) && !(await checkRole("moderator"))) {
    redirect("/");
  }

  // Check if there are unviewed reports
  const hasUnviewedReports = await checkUnviewedReports();

  // Update the reports menu item
  const menuItemsWithNotification = adminMenuItems.map((item) => (item.href === "/admin/reports" ? { ...item, showNotification: hasUnviewedReports } : item));

  return (
    <div className="mx-auto mt-10 max-w-screen-md p-4">
      <h1 className="mb-6 text-center text-2xl font-semibold">Admin Dashboard</h1>

      <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        {menuItemsWithNotification.map((item) => (
          <Link key={item.href} href={item.href} className="block rounded-lg bg-card p-6 hover:bg-accent">
            <div className="flex items-center">
              <h2 className="mb-2 text-xl font-semibold">{item.title}</h2>
              {item.showNotification && <UnviewedReportsIndicator hasUnviewedReports={true} className="ml-2 h-2 w-2" />}
            </div>
            <p className="text-card-foreground">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
