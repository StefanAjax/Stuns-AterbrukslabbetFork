import Pagination from "@/components/pagination";
import type { PostType, PostCategory, SortOrder } from "@/types/globals";

import FilterContainer from "./_components/filter-container";
import getPostDataFromDb from "./utils/get-post-data-from-db";
import Intro from "./_components/intro";
import PostContainer from "./_components/post-container";

interface MainPageProps {
  searchParams: Promise<{
    type?: PostType;
    category?: PostCategory;
    page?: string;
    search?: string;
    sort?: SortOrder;
  }>;
}

export default async function MainPage({ searchParams }: MainPageProps) {
  const postsPerPage = 10;

  const { type, category, page, search, sort } = await searchParams;

  const { postsList, queriedPostsCount, totalPostCount } = await getPostDataFromDb({
    type: type,
    category: category,
    currentPage: Number(page),
    searchParams: search,
    postsPerPage: postsPerPage,
    sort: sort,
  });
  return (
    <div>
      <Intro />
      <div className="mx-auto max-w-[360px] px-2 md:max-w-screen-md md:px-5" id="filters">
        <FilterContainer totalPostCount={totalPostCount} postCount={queriedPostsCount} />
        <PostContainer posts={postsList} />
      </div>
      <Pagination itemCount={queriedPostsCount} itemsPerPage={postsPerPage} hashLinkId="filters" />
    </div>
  );
}
