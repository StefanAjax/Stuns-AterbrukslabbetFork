import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreatePostLink() {
  return (
    <Button asChild variant="default">
      <Link href="/create-post">
        <Plus />
        Skapa annons
      </Link>
    </Button>
  );
}
