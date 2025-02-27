import { clerkClient } from "@clerk/nextjs/server";

interface GetUserRoleFromUserIdProps {
  userId: string;
}

export default async function getUserRoleFromUserId({ userId }: GetUserRoleFromUserIdProps) {
  const client = await clerkClient();

  try {
    const user = await client.users.getUser(userId);
    const userRole = user.publicMetadata.role;
    return userRole as string;
  } catch (err) {
    return err as string;
  }
}
