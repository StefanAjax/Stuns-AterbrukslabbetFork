import { Label } from "@/components/ui/label";

interface FormLabelProps {
  htmlFor?: string;
  labelText: string;
}

export default function FormLabel({ htmlFor, labelText }: FormLabelProps) {
  return (
    <Label htmlFor={htmlFor} className="md:text-base">
      {labelText}
    </Label>
  );
}
