"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { checkRole } from "@/utils/check-role";

export async function resolveReport(reportId: number) {
  if (!(await checkRole("admin")) && !(await checkRole("moderator"))) {
    throw new Error("Unauthorized");
  }

  try {
    await db.reportedPosts.update({
      where: { id: reportId },
      data: { resolved: true },
    });

    revalidatePath("/admin/reports");
    return { success: true };
  } catch (error) {
    console.error("Failed to resolve report:", error);
    throw new Error("Failed to resolve report");
  }
}
