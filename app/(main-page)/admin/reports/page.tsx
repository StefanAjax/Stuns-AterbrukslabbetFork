"use server";

import { redirect } from "next/navigation";
import Link from "next/link";

import { checkRole } from "@/utils/check-role";
import Pagination from "@/components/pagination";
import SearchBar from "@/components/search-bar";

import { db } from "@/lib/db";

export default async function AdminReportsPage() {
  const reports = await db.reportedPosts.findMany();
  return (
    <>
      {reports.map((report) => (
        <div key={report.id}>
          <p>{report.reason}</p>
          <span>
            <p>
              <Link href={report.postLink}>Annons som blivit rapporterad</Link>
            </p>
          </span>
          <span>
            <p>
              <Link href={report.reporterLink}>Användare som rapporterade annonsen</Link>
            </p>
          </span>
          <p>Reported at {report.createdAt.toDateString()}</p>
        </div>
      ))}
    </>
  );
}
