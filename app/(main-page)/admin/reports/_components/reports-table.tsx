"use server";

import Link from "next/link";
import { clerkClient } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { sv } from "date-fns/locale";

import type { Post } from "@prisma/client";
import { ResolveReportButton } from "./resolve-report-button";

interface Report {
  id: number;
  reason: string | null;
  postLink: string;
  reporterLink: string;
  createdAt: Date;
  post: Post;
  reporterId: string;
}

interface ReportsTableProps {
  reports: Report[];
}

export default async function ReportsTable({ reports }: ReportsTableProps) {
  const client = await clerkClient();

  const reporterIds = reports.map((report) => report.reporterId);
  const users = await client.users.getUserList({ userId: reporterIds });

  const userMap = new Map();
  users.data.forEach((user) => {
    userMap.set(user.id, user);
  });

  return (
    <table className="w-full divide-y divide-border border border-border text-left text-sm">
      <thead className="whitespace-nowrap bg-secondary text-muted-foreground">
        <tr>
          <th scope="col" className="border-r border-border px-4 py-3 font-medium">
            Datum
          </th>
          <th scope="col" className="px-4 py-3 font-medium">
            Användarens anledning
          </th>
          <th scope="col" className="px-4 py-3 font-medium">
            Annons
          </th>
          <th scope="col" className="px-4 py-3 font-medium">
            Anmäld av
          </th>
          <th scope="col" className="px-4 py-3 font-medium">
            Moderator åtgärd
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border bg-background">
        {reports.map((report) => {
          const user = userMap.get(report.reporterId);
          const formattedDate = format(report.createdAt, "d MMMM yyyy", { locale: sv });

          return (
            <tr key={report.id} className="hover:bg-secondary/50">
              <td className="border-r border-border px-4 py-3">{formattedDate}</td>
              <td className="px-4 py-3">{report.reason || <em className="text-muted-foreground">Ingen orsak angiven</em>}</td>
              <td className="px-4 py-3">
                <Link href={report.postLink} className="hover:underline">
                  {report.post.title}
                </Link>
              </td>
              <td className="px-4 py-3">
                <Link href={report.reporterLink} className="hover:underline">
                  {user?.fullName || "Okänd användare"}
                </Link>
              </td>
              <td className="px-4 py-3">
                <ResolveReportButton reportId={report.id} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
