import { cn } from "@/lib/utils";

interface FormErrorParagraphProps {
  content: string;
  id?: string;
  className?: string;
}

export default function FormErrorParagraph({ content, id, className }: FormErrorParagraphProps) {
  return (
    <span id={id} className={cn("mt-2 max-w-max rounded-md bg-destructive px-2 py-1 text-xs font-medium text-destructive-foreground", className)} role="alert" aria-live="polite">
      {content}
    </span>
  );
}
