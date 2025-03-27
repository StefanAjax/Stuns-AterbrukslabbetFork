"use server";

import { redirect } from "next/navigation";

import { checkRole } from "@/utils/check-role";
import { db } from "@/lib/db";
import PostReportCard from "./_components/post-report-card";
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
    take: reportsPerPage,
    skip: (parseInt(page || "1") - 1) * reportsPerPage,
  });

  return (
    <div className="mx-auto max-w-screen-md p-3 pt-10">
      <div className="mx-auto flex flex-col items-center gap-y-3 pt-6">
        {reports.map((report) => (
          <PostReportCard key={report.id} report={report} />
        ))}
      </div>
      <Pagination itemCount={reportCount} itemsPerPage={reportsPerPage} />
    </div>
  );
}
