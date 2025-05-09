"use server";

import { db } from "@/lib/db";
import { getUserId } from "@/utils/get-user-id";

export async function checkUnviewedReports(): Promise<boolean> {
  try {
    const userId = await getUserId();

    if (!userId) {
      return false;
    }

    // Simply check if there are any unresolved reports
    const unresolvedReportsCount = await db.reportedPosts.count({
      where: {
        resolved: false,
      },
    });

    // Return true if there are any unresolved reports
    return unresolvedReportsCount > 0;
  } catch (error) {
    console.error("Failed to check for unviewed reports:", error);
    return false;
  }
}
