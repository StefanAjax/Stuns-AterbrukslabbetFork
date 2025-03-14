"use server";

import type { Post } from "@prisma/client";
import ReportedPostEmail from "@/emails/reported-post-email";
import sendMail from "@/utils/send-mail";
import { createClerkClient } from "@clerk/nextjs/server";

export default async ({ postData, reportReason, userId }: { postData: Post; reportReason: string; userId: string }) => {
  // Get all admins and moderators from clerk
  const secret = process.env.CLERK_SECRET_KEY;
  if (!secret) {
    return {
      error: "Något gick fel",
    };
  }
  const clerk = createClerkClient({ secretKey: secret });

  const users = [];
  let cursor = 0;
  let data;

  do {
    const response = await clerk.users.getUserList({
      limit: 500,
      offset: cursor,
    });
    data = response.data;
    const moderators = data.filter((user) => user.publicMetadata.role === "moderator" || user.publicMetadata.role === "admin");
    users.push(...moderators);
    cursor += 500;
  } while (data.length > 0);

  await Promise.all(
    users.map(async (user) => {
      const emailId = user.primaryEmailAddressId;

      if (!emailId) {
        return null;
      }

      const email = (await clerk.emailAddresses.getEmailAddress(emailId)).emailAddress;

      if (!email) {
        return null;
      }

      return sendMail({
        toMail: email,
        subject: "En annons har blivit rapporterad",
        mailTemplate: ReportedPostEmail({ comment: reportReason, post: postData, userId }),
      });
    }),
  );

  return {
    data: "Annonsen har blivit rapporterad",
  };
};
