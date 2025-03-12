import getNameAndEmailFromUserId from "@/utils/get-name-and-email-from-user-id";
import { getUserId } from "@/utils/get-user-id";
import Pagination from "@/components/pagination";

import getPostDataFromDb from "../../utils/get-post-data-from-db";
import getUserRoleFromUserId from "../../utils/get-user-role-from-user-id";
import PostContainer from "../../_components/post-container";
import ProfilePageModerationActions from "../_components/profile-page-moderation-actions";

interface ProfilePageProps {
  params: Promise<{
    userId: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function ProfilePage({ params, searchParams }: ProfilePageProps) {
  const { userId } = await params;
  const { page } = await searchParams;

  const postsPerPage = 10;
  const currentUserId = await getUserId();
  const pageUserRole = await getUserRoleFromUserId({ userId: userId });
  const { firstName, lastName, email } = await getNameAndEmailFromUserId({
    userId: userId,
  });

  const headerText = currentUserId === userId ? "Mina annonser" : `${firstName} ${lastName}'s annonser`;

  const { postsList, queriedPostsCount } = await getPostDataFromDb({
    type: undefined,
    category: undefined,
    currentPage: Number(page),
    postsPerPage: postsPerPage,
    sort: "desc",
    userId: userId,
  });

  return (
    <div className="mx-auto mt-3 flex max-w-[360px] flex-col px-2 md:mt-5 md:max-w-screen-md md:px-5">
      <ProfilePageModerationActions pageUserId={userId} email={email} pageUserRole={pageUserRole} />
      <div className="grid-cols grid grid-cols-12 text-base md:text-xl">
        <p className="col-span-6 line-clamp-2 break-words md:col-span-8">{headerText}</p>
        <p className="col-span-6 text-end md:col-span-4">{queriedPostsCount} aktiva annonser</p>
      </div>
      <PostContainer posts={postsList} />
      <Pagination itemCount={queriedPostsCount} itemsPerPage={postsPerPage} />
    </div>
  );
}
