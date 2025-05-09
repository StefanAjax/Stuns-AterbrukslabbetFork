import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PostTypePickerProps {
  currentPostType: string;
  setPostType: (...event: any[]) => void;
  id?: string;
  "aria-required"?: boolean;
  "aria-describedby"?: string;
}

export default function PostTypePicker({ currentPostType, setPostType, id, ...props }: PostTypePickerProps) {
  const isActive = (type: string) => currentPostType === type;

  return (
    <div className="flex gap-1" role="radiogroup" aria-labelledby={`${id}-label`} {...props}>
      <Button
        id={`${id}-erbjuds`}
        onClick={() => setPostType("Erbjuds")}
        variant="outline"
        type="button"
        className={cn("flex-1 rounded-l-md", isActive("Erbjuds") ? "border border-offer bg-offer text-white hover:border-offer/90 hover:bg-offer/90 hover:text-white" : "hover:bg-offer/40")}
        size="sm"
        aria-pressed={isActive("Erbjuds")}
      >
        Erbjuds
      </Button>
      <Button
        id={`${id}-efterfragas`}
        onClick={() => setPostType("Efterfrågas")}
        variant="outline"
        type="button"
        className={cn(
          "flex-1 rounded-r-md",
          isActive("Efterfrågas") ? "border border-request bg-request text-white hover:border-request/90 hover:bg-request/90 hover:text-white" : "hover:bg-request/40",
        )}
        size="sm"
        aria-pressed={isActive("Efterfrågas")}
      >
        Efterfrågas
      </Button>
    </div>
  );
}
