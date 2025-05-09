import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormHint from "./form-hint";
import FormErrorParagraph from "./form-error-paragraph";
import { FormInputs, validatePersonalInfo } from "../_utils/form";

export default function TitleSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormInputs>();

  return (
    <section aria-labelledby="title-section" className="w-full">
      <div className="sr-only" id="title-section">
        Titelsektionen
      </div>
      <div className="flex w-full flex-col space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="title">Titel</Label>
          <FormHint content="Max 40 tecken. Inkludera aldrig personuppgifter av något slag." />
        </div>
        <Input
          id="title"
          {...register("title", {
            required: "Titel saknas",
            maxLength: { value: 40, message: "Max 40 tecken" },
            validate: {
              emailValidation: (value) => validatePersonalInfo(value, "email"),
              phoneValidation: (value) => validatePersonalInfo(value, "phone"),
            },
          })}
          placeholder="Skriv titel här..."
          aria-describedby="title-hint"
          aria-required="true"
        />
        {errors.title?.message && <FormErrorParagraph content={errors.title.message as string} />}
      </div>
    </section>
  );
}
