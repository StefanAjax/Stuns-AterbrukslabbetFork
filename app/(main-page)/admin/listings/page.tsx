import { redirect } from "next/navigation";
import { checkRole } from "@/utils/check-role";
import ExportArchivesButton from "./_components/export-archives-button";

export default async function AdminListingsPage() {
  if (!(await checkRole("admin")) && !(await checkRole("moderator"))) {
    redirect("/");
  }

  return (
    <div className="mx-auto mt-10 max-w-screen-md p-4">
      <h1 className="mb-6 text-center text-2xl font-semibold">Arkiverade Annonser</h1>

      <div className="mb-10 flex w-full flex-col items-center rounded-md bg-card p-6 text-center">
        <h2 className="mb-4 text-xl text-card-foreground">Exportera arkiverade annonser</h2>
        <p className="mb-4 text-card-foreground/75">Ladda ner en XLSX-fil med alla arkiverade annonser</p>
        <ExportArchivesButton />
      </div>
    </div>
  );
}
