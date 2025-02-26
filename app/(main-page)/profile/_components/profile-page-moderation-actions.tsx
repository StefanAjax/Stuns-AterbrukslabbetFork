import { checkRole } from "@/utils/check-role";
import DeleteUserButton from "@/components/delete-user-button";

interface ProfilePageModerationActionsProps {
  pageUserId: string;
  pageUserRole: string;
  email: string;
}

export default async function ProfilePageModerationActions({
  pageUserId,
  pageUserRole,
  email,
}: ProfilePageModerationActionsProps) {
  if ((await checkRole("admin")) || (await checkRole("moderator"))) {
    if (pageUserRole === "admin" || pageUserRole === "moderator") {
      return (
        <div className="flex md:text-base text-sm pt-1 gap-x-3">
          <p className="font-semibold capitalize">{pageUserRole}</p>
          {(await checkRole("admin")) && pageUserRole !== "admin" && (
            <DeleteUserButton id={pageUserId} email={email} redirectPath="/" />
          )}
        </div>
      );
    } else {
      const roleText =
        pageUserRole !== "medlem"
          ? `Okänd roll: ${
              pageUserRole.charAt(0).toUpperCase() + pageUserRole.slice(1)
            }`
          : `${pageUserRole.charAt(0).toUpperCase() + pageUserRole.slice(1)}`;
      return (
        <div className="flex md:text-base text-sm pt-1 gap-x-3">
          <p className="font-semibold">{roleText}</p>
          <DeleteUserButton id={pageUserId} email={email} redirectPath="/" />
        </div>
      );
    }
  } else {
    return;
  }
}
