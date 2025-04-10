"use server";

import { redirect } from "next/navigation";

import { checkRole } from "@/utils/check-role";
import { db } from "@/lib/db";
import ReportsTable from "./_components/reports-table";
import Pagination from "@/components/pagination";

interface ReportProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminReportsPage({ searchParams }: ReportProps) {
  if (!(await checkRole("admin")) && !(await checkRole("moderator"))) {
    redirect("/");
  }

  const { page } = await searchParams;

  const reportsPerPage = 10;
  const currentPage = parseInt(page || "1");

  const reportCount = await db.reportedPosts.count({
    where: {
      resolved: false,
    },
  });

  const reports = await db.reportedPosts.findMany({
    include: {
      post: true,
    },
    where: {
      resolved: false,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: reportsPerPage,
    skip: (currentPage - 1) * reportsPerPage,
  });

  return (
    <div className="mx-auto mt-10 max-w-screen-lg p-4">
      <h1 className="mb-6 text-2xl font-semibold">Rapporterade Annonser ({reportCount})</h1>

      {reports.length > 0 ? (
        <ReportsTable reports={reports} />
      ) : (
        <div className="bg-secondary p-8 text-center">
          <p className="text-lg">Inga obehandlade rapporter just nu.</p>
        </div>
      )}

      {reportCount > 0 && (
        <div className="mt-6">
          <Pagination itemCount={reportCount} itemsPerPage={reportsPerPage} />
        </div>
      )}
    </div>
  );
}
