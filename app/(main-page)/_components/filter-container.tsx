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
      <SearchBar labelText={labelText} itemsFoundCount={postCount} />
      <div className="flex w-full items-center justify-between gap-x-2">
        <PostTypeButtons />
        <CreatePostLink />
      </div>
      <section className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <PostCategoryButtons />
        <PostSortSelect />
      </section>
    </div>
  );
}
