"use server";

import { db } from "@/lib/db";
import { getUserId } from "@/utils/get-user-id";

export async function checkUnviewedReports(): Promise<boolean> {
  try {
    const userId = await getUserId();

    if (!userId) {
      return false;
    }

    // Get the last time this admin viewed reports
    const adminView = await db.adminReportViews.findUnique({
      where: { userId },
    });

    // If the admin has never viewed reports, and there are reports, they are unviewed
    if (!adminView) {
      const reportCount = await db.reportedPosts.count({
        where: { resolved: false },
      });
      return reportCount > 0;
    }

    // Check if there are any unresolved reports created after the last view
    const unviewedReportsCount = await db.reportedPosts.count({
      where: {
        resolved: false,
        createdAt: {
          gt: adminView.lastViewedAt,
        },
      },
    });

    return unviewedReportsCount > 0;
  } catch (error) {
    console.error("Failed to check for unviewed reports:", error);
    return false;
  }
}
