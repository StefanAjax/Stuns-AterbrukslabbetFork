"use server";

import { db } from "@/lib/db";
import { getUserId } from "@/utils/get-user-id";

export async function markReportsViewed() {
  try {
    const userId = await getUserId();

    if (!userId) {
      return { error: "User not authenticated" };
    }

    // Upsert the record - create if it doesn't exist, update if it does
    await db.adminReportViews.upsert({
      where: { userId },
      update: { lastViewedAt: new Date() },
      create: { userId, lastViewedAt: new Date() },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to mark reports as viewed:", error);
    return { error: "Failed to mark reports as viewed" };
  }
}
