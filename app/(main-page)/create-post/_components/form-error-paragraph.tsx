interface FormErrorParagraphProps {
  content: string;
}

export default function FormErrorParagraph({ content }: FormErrorParagraphProps) {
  return (
    <span className="my-2 max-w-max rounded-full bg-warning px-2 py-1 text-sm text-warning-foreground" role="alert">
      {content}
    </span>
  );
}
