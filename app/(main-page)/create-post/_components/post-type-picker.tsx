import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PostTypePickerProps {
  currentPostType: string;
  setPostType: (...event: any[]) => void;
}

export default function PostTypePicker({ currentPostType, setPostType }: PostTypePickerProps) {
  const isActive = (type: string) => currentPostType === type;

  return (
    <div className="mx-8 flex gap-8">
      <Button
        onClick={() => setPostType("Erbjuds")}
        variant="outline"
        className={cn("flex-1 rounded-l-md", isActive("Erbjuds") ? "border border-offer bg-offer text-white hover:border-offer/90 hover:bg-offer/90 hover:text-white" : "hover:bg-offer/40")}
        size="sm"
      >
        Erbjuds
      </Button>
      <Button
        onClick={() => setPostType("Efterfrågas")}
        variant="outline"
        className={cn(
          "flex-1 rounded-r-md",
          isActive("Efterfrågas") ? "border border-request bg-request text-white hover:border-request/90 hover:bg-request/90 hover:text-white" : "hover:bg-request/40",
        )}
        size="sm"
      >
        Efterfrågas
      </Button>
    </div>
  );
}
