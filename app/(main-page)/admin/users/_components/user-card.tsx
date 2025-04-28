import Link from "next/link";

import getUserEmail from "@/utils/get-user-email";
import { User } from "@clerk/nextjs/server";

import UserCardActions from "./user-card-actions";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div key={user.id} className="flex w-full justify-between gap-x-10 rounded-md bg-card p-4">
      <div className="flex flex-col gap-y-2">
        <div className="line-clamp-1 break-all">
          <Link href={`/profile/${user.id}`} className="hover:opacity-70">
            {user.firstName} {user.lastName}
          </Link>
        </div>
        <div className="line-clamp-1 break-all">{getUserEmail({ user })}</div>
      </div>
      <div className="flex min-w-fit flex-col items-end gap-y-2">
        <UserCardActions user={user} />
      </div>
    </div>
  );
}
