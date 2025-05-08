import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CreatePostLinkProps {
  className?: string;
}

export default function CreatePostLink({ className }: CreatePostLinkProps) {
  return (
    <Button asChild variant="default" className={cn(className)}>
      <Link href="/create-post">
        <Plus />
        Skapa annons
      </Link>
    </Button>
  );
}
