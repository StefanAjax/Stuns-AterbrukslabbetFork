import Link from "next/link";

import { checkRole } from "@/utils/check-role";
import DeleteOwnPostButton from "../_components/delete-own-post-button";
import getNameAndEmailFromUserId from "@/utils/get-name-and-email-from-user-id";
import { getUserId } from "@/utils/get-user-id";

import getPostData from "../../utils/get-post-data";
import getUserRoleFromUserId from "../../utils/get-user-role-from-user-id";
import PostComponent from "../_components/post-component";
import PostModerationActions from "../_components/post-moderation-actions";
import EditPostButton from "../_components/edit-post-button";
import ReportPostButton from "../_components/report-post";

interface PostIdPageProps {
  params: Promise<{
    postId: string;
  }>;
}

export default async function PostIdPage({ params }: PostIdPageProps) {
  const { postId } = await params;

  const postData = await getPostData(Number(postId));
  const userId = await getUserId();

  if (postData) {
    const { firstName, lastName, email } = await getNameAndEmailFromUserId({
      userId: postData.userId,
    });
    const postUserRole = await getUserRoleFromUserId({
      userId: postData.userId,
    });
    const fullName = firstName + " " + lastName;

    // Variable to track if user is admin or moderator - avoid multiple role checks
    const isAdminOrModerator = (await checkRole("admin")) || (await checkRole("moderator"));

    const userPostActionButton =
      userId === postData.userId ? (
        // Case 1: User is the post owner
        <>
          <EditPostButton postData={postData} />
          <DeleteOwnPostButton postData={postData} redirectPath="/" />
        </>
      ) : isAdminOrModerator ? (
        // Case 2: User is admin or moderator
        <PostModerationActions postData={postData} postUserRole={postUserRole} />
      ) : userId ? (
        // Case 3: User is logged in but not owner or admin/mod
        <ReportPostButton postData={postData} />
      ) : undefined; // Not logged in - no actions shown

    return (
      <div className="mx-auto mt-5 max-w-[360px] md:max-w-screen-md">
        <PostComponent postData={postData} email={email} fullName={fullName} userPostActionButton={userPostActionButton} />
      </div>
    );
  } else {
    return (
      <div className="flex h-[52vh] w-full items-end justify-center text-center">
        <div className="flex max-w-screen-sm flex-col gap-y-2 px-3">
          <h1 className="text-xl font-medium">Oj då, ingen annons hittades...</h1>
          <p className="text-pretty">
            Denna annons verkar inte finnas. Om du tror att annonsen bör finnas kontrollera då URL:en. Om du precis skapat annonsen kan det ta en liten stund för den att dyka upp.
          </p>
          <Link className="pt-1 text-lg text-blue-600 hover:underline" href="/">
            Till startsidan
          </Link>
        </div>
      </div>
    );
  }
}
