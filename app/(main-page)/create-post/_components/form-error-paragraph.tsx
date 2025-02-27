interface FormErrorParagraphProps {
  content: string;
}

export default function FormErrorParagraph({ content }: FormErrorParagraphProps) {
  return (
    <p className="text-sm text-red-500 md:text-base" role="alert">
      {content}
    </p>
  );
}
