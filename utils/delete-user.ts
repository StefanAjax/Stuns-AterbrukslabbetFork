"use server";

import { checkRole } from "@/utils/check-role";
import { clerkClient } from "@clerk/nextjs/server";

import DeleteUserEmail from "../emails/deleted-user-email";
import getUserEmail from "./get-user-email";
import sendMail from "./send-mail";

interface DeleteUserProps {
  id: string;
  comment: string;
}

export default async function deleteUser({ id, comment }: DeleteUserProps) {
  let user;

  const client = await clerkClient();

  try {
    user = await client.users.getUser(id);
  } catch {
    return { error: "Kunde inte hämta användare" };
  }
  const userEmail = getUserEmail({ user });

  if ((!(await checkRole("admin")) && !(await checkRole("moderator"))) || user.publicMetadata.role === "admin" || (user.publicMetadata.role === "moderator" && (await checkRole("moderator")))) {
    return { error: "Obehörig" };
  }

  try {
    sendMail({
      toMail: userEmail,
      subject: "Ditt konto har blivit borttaget",
      mailTemplate: DeleteUserEmail({ comment: comment }),
    });
  } catch {
    return { error: "Kunde inte skicka e-post" };
  }

  try {
    await client.users.deleteUser(id);
  } catch {
    return { error: "Kunde inte ta bort användare" };
  }

  return { data: userEmail };
}
