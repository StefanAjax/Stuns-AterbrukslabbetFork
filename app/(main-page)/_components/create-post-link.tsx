import Link from "next/link";
import { Plus } from "lucide-react";

export default function CreatePostLink() {
  return (
    <Link className="bg-sky-600 flex items-center gap-x-1 rounded-md px-2 py-[6px] text-white hover:opacity-85 md:gap-x-2 md:px-4 md:py-2" href="/create-post">
      <Plus className="h-4 w-4 md:h-6 md:w-6" />
      <p className="text-xs md:text-lg">Skapa annons</p>
    </Link>
  );
}
