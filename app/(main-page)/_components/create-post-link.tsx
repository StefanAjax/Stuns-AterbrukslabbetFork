import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { source_sans_3 } from "@/app/fonts";

interface CreatePostLinkProps {
  className?: string;
}

export default function CreatePostLink({ className }: CreatePostLinkProps) {
  return (
    <Button asChild variant="default" className={cn("text-lg", source_sans_3.className, className)}>
      <Link href="/create-post">
        <Plus className="mr-1" />
        Skapa annons
      </Link>
    </Button>
  );
}
