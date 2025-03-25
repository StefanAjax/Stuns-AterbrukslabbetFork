import { inter } from "@/app/fonts";
import Link from "next/link";

interface PostReportCardProps {
   report: {
      id: number;
      reason: string;
      postLink: string;
      reporterLink: string;
      createdAt: Date;
   };
}

export default async function PostReportCard({ report } : PostReportCardProps) {
  return (
    <div key={report.id} className="flex w-full justify-between gap-x-10 rounded-md bg-secondary p-3 md:gap-x-20">
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
  );
}
