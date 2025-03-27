"use server";

import Link from "next/link";
import { clerkClient } from "@clerk/nextjs/server";

import type { Post } from "@prisma/client";

interface PostReportCardProps {
  report: {
    id: number;
    reason: string | null;
    postLink: string;
    reporterLink: string;
    createdAt: Date;
    post: Post;
    reporterId: string;
  };
}

export default async function PostReportCard({ report }: PostReportCardProps) {
  const client = await clerkClient();
  const user = await client.users.getUser(report.reporterId);
  return (
    <div key={report.id} className="flex w-full justify-between gap-x-10 rounded-md bg-secondary p-3 md:gap-x-20">
      <p>{report.reason}</p>
      <span>
        <p>Annons som blivit rapporterad:</p>
        <p>
          <Link href={report.postLink}>{report.post.title}</Link>
        </p>
      </span>
      <span>
        <p>Användare som rapporterade annonsen:</p>
        <p>
          <Link href={report.reporterLink}>{user?.fullName}</Link>
        </p>
      </span>
      <p>Blev rapporterad: {report.createdAt.toLocaleDateString()}</p>
    </div>
  );
}
