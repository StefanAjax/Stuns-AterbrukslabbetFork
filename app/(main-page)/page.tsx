import type { PostType, PostCategory, SortOrder } from "@/types/globals";
import Pagination from "@/components/pagination";

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
  const postsPerPage = 7;

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
      <div className="mx-auto px-4 md:max-w-screen-md md:px-6" id="filters">
        <FilterContainer postCount={queriedPostsCount} />
        <PostContainer posts={postsList} />
      </div>
      <Pagination itemCount={queriedPostsCount} itemsPerPage={postsPerPage} hashLinkId="filters" />
    </div>
  );
}
