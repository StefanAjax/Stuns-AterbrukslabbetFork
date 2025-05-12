import { NextRequest, NextResponse } from "next/server";

import path from "node:path";
import fs from "node:fs";

import { db } from "@/lib/db";
import { checkRole } from "@/utils/check-role";

interface RequestParams {
  params: Promise<{
    filename: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RequestParams) {
  const { filename } = await params;

  const fileMetadata = await db.resources.findFirst({
    where: {
      name: filename,
    },
  });

  if (!fileMetadata) {
    return new NextResponse("Ingen resurs hittad", { status: 404 });
  }

  if (!fileMetadata.visible && !(await checkRole("admin")) && !(await checkRole("moderator"))) {
    return new NextResponse("Nekad åtkomst", { status: 403 });
  }

  const filePath = path.join(process.cwd(), "client", "documents", filename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Ingen resurs hittaad", { status: 404 });
  }

  try {
    const file = fs.readFileSync(filePath);

    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    return new NextResponse("Något gick fel", { status: 500 });
  }
}
