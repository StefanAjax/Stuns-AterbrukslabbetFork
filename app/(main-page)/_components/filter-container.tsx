import SearchBar from "@/components/search-bar";

import CreatePostLink from "./create-post-link";
import PostCategoryButtons from "./post-category-buttons";
import PostSortSelect from "./post-sort-select";
import PostTypeButtons from "./post-type-buttons";

interface FilterContainerProps {
  postCount: number;
}

export default function FilterContainer({ postCount }: FilterContainerProps) {
  const labelText = `Sök bland ${postCount} annonser`;

  return (
    <div className="mt-4 flex flex-col gap-y-2 md:gap-y-3">
      {/* CreatePostLink shows above search bar on very small screens (below 400px) */}
      <div className="mb-1 hidden w-full max-[400px]:block">
        <CreatePostLink className="w-full" />
      </div>

      <SearchBar labelText={labelText} itemsFoundCount={postCount} />
      <div className="flex w-full justify-between gap-x-2">
        <div className="flex items-end">
          <PostTypeButtons />
        </div>
        {/* Hide CreatePostLink on very small screens since it's shown above */}
        <div className="flex items-end max-[400px]:hidden">
          <CreatePostLink />
        </div>
      </div>
      <section className="flex w-full flex-col gap-2 sm:flex-row sm:justify-between">
        <div className="flex items-end">
          <PostCategoryButtons />
        </div>
        <div className="flex items-end">
          <PostSortSelect />
        </div>
      </section>
    </div>
  );
}
