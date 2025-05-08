import { checkRole } from "@/utils/check-role";
import DeleteUserButton from "@/components/delete-user-button";
import ChangeRoleButton from "../../admin/users/_components/change-role-button";

interface ProfilePageModerationActionsProps {
  pageUserId: string;
  pageUserRole: string;
  email: string;
}

export default async function ProfilePageModerationActions({ pageUserId, pageUserRole, email }: ProfilePageModerationActionsProps) {
  const isAdmin = await checkRole("admin");
  const isModerator = await checkRole("moderator");

  if (isAdmin || isModerator) {
    if (pageUserRole === "admin" || pageUserRole === "moderator") {
      return (
        <div className="flex items-center gap-x-1 text-sm md:text-base">
          <p className="mr-4 font-semibold capitalize">{pageUserRole}</p>
          {isAdmin && pageUserRole === "moderator" && (
            <>
              <ChangeRoleButton id={pageUserId} email={email} newRole="medlem" currentRole={pageUserRole} />
              <DeleteUserButton id={pageUserId} email={email} redirectPath="/" />
            </>
          )}
        </div>
      );
    } else {
      const roleText = pageUserRole !== "medlem" ? `Okänd roll: ${pageUserRole.charAt(0).toUpperCase() + pageUserRole.slice(1)}` : `${pageUserRole.charAt(0).toUpperCase() + pageUserRole.slice(1)}`;

      return (
        <div className="flex items-center gap-x-1 text-sm md:text-base">
          <p className="mr-4 font-semibold capitalize">{roleText}</p>
          {isAdmin && <ChangeRoleButton id={pageUserId} email={email} newRole="moderator" currentRole={pageUserRole} />}
          <DeleteUserButton id={pageUserId} email={email} redirectPath="/" />
        </div>
      );
    }
  } else {
    return;
  }
}
