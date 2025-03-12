interface FormLabelProps {
  htmlFor?: string;
  labelText: string;
}

export default function FormLabel({ htmlFor, labelText }: FormLabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium md:text-base">
      {labelText}
    </label>
  );
}
