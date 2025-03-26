"use server";

import { db } from "@/lib/db";
import PostReportCard from "./_components/post-report-card";

export default async function AdminReportsPage() {
  const reports = await db.reportedPosts.findMany({
    include: {
      post: true,
    },
  });
  return (
    <>
      <div className="mx-auto max-w-screen-md p-3 pt-10">
        {reports.map((report) => (
          <PostReportCard key={report.id} report={report} />
        ))}
      </div>
    </>
  );
}
