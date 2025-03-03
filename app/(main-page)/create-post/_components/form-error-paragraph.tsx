interface FormErrorParagraphProps {
  content: string;
}

export default function FormErrorParagraph({ content }: FormErrorParagraphProps) {
  return (
    <p className="text-red-500 text-sm md:text-base" role="alert">
      {content}
    </p>
  );
}
