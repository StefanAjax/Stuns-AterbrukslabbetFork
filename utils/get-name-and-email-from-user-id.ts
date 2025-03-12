import { clerkClient } from "@clerk/nextjs/server";
import getUserEmail from "@/utils/get-user-email";

interface GetNameAndEmailFromUserIdProps {
  userId: string;
}

export default async function getNameAndEmailFromUserId({ userId }: GetNameAndEmailFromUserIdProps) {
  const client = await clerkClient();

  let returnedUser;
  try {
    returnedUser = await client.users.getUser(userId);
  } catch (error) {
    console.error(error);
  }

  const firstName = returnedUser?.firstName ? returnedUser.firstName : "";

  const lastName = returnedUser?.lastName ? returnedUser.lastName : "";

  const email = returnedUser ? getUserEmail({ user: returnedUser }) : "";

  return { firstName, lastName, email };
}
