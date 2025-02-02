import { headers } from "next/headers";

import deletePostsByIds from "@/utils/delete-posts-by-ids";
import getNameAndEmailFromUserId from "@/utils/get-name-and-email-from-user-id";
import {
  PostExpiredCustomMail,
  PostExpiredMail,
  PostExpiresInAWeekCustomMail,
  PostExpiresInAWeekMail,
  PostExpiresTomorrowCustomMail,
  PostExpiresTomorrowMail,
} from "@/emails/expiring-posts-emails";
import sendMail from "@/utils/send-mail";

import addPostToExpiringPosts from "../_utils/add-post-to-expiring-posts";
import findSoonExpiringPosts from "../_utils/find-soon-expiring-posts";

export async function POST() {
  const mailAutomationSecret = process.env.MAIL_AUTOMATION_SECRET;
  const headersPayload = headers();
  const secret = headersPayload.get("secret");
  if (secret !== mailAutomationSecret) {
    return Response.json({
      message: "Secret key doesn't match",
    });
  }

  const { postsExpiringInOneWeek, postsExpiringTomorrow, postsExpiringToday } =
    await findSoonExpiringPosts();

  for (const post of postsExpiringInOneWeek) {
    const postLink = await addPostToExpiringPosts({ post });
    const { email } = await getNameAndEmailFromUserId({ userId: post.userId });
    if (post.hasCustomExpirationDate) {
      sendMail({
        toMail: email,
        subject: "Din annons går ut om en vecka",
        mailTemplate: PostExpiresInAWeekCustomMail({
          postTitle: post.title,
          postLink,
          postId: post.id,
        }),
      });
    } else {
      sendMail({
        toMail: email,
        subject: "Din annons går ut om en vecka",
        mailTemplate: PostExpiresInAWeekMail({
          postTitle: post.title,
          postLink,
          postId: post.id,
        }),
      });
    }
  }

  for (const post of postsExpiringTomorrow) {
    const postLink = await addPostToExpiringPosts({ post });
    const { email } = await getNameAndEmailFromUserId({ userId: post.userId });
    if (post.hasCustomExpirationDate) {
      sendMail({
        toMail: email,
        subject: "Din annons går ut imorgon",
        mailTemplate: PostExpiresTomorrowCustomMail({
          postTitle: post.title,
          postLink,
          postId: post.id,
        }),
      });
    } else {
      sendMail({
        toMail: email,
        subject: "Din annons går ut imorgon",
        mailTemplate: PostExpiresTomorrowMail({
          postTitle: post.title,
          postLink,
          postId: post.id,
        }),
      });
    }
  }

  const postsToDeleteIds: number[] = [];

  for (const post of postsExpiringToday) {
    const { email } = await getNameAndEmailFromUserId({ userId: post.userId });
    if (post.hasCustomExpirationDate) {
      sendMail({
        toMail: email,
        subject: "Din annons har tagits bort",
        mailTemplate: PostExpiredCustomMail({
          postTitle: post.title,
        }),
      });
    } else {
      sendMail({
        toMail: email,
        subject: "Din annons har tagits bort",
        mailTemplate: PostExpiredMail({
          postTitle: post.title,
        }),
      });
    }
    postsToDeleteIds.push(post.id);
  }
  await deletePostsByIds({
    postsIds: postsToDeleteIds,
    deletionReason: "Utgången annons",
  });
  const mailAmount =
    postsExpiringInOneWeek.length +
    postsExpiringTomorrow.length +
    postsExpiringToday.length;

  return Response.json({
    message: `${mailAmount} mails sent and ${postsToDeleteIds.length} posts deleted`,
  });
}
