import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import FormHint from "./form-hint";
import FormErrorParagraph from "./form-error-paragraph";
import { FormInputs, validatePersonalInfo } from "../_utils/form";

export default function DescriptionSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormInputs>();

  return (
    <section aria-labelledby="description-section" className="w-full">
      <div className="sr-only" id="description-section">
        Beskrivningssektion
      </div>
      <div className="flex w-full flex-col space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="description">Beskrivning</Label>
          <FormHint content="Max 1500 tecken. Inkludera aldrig personuppgifter av något slag." />
        </div>
        <Textarea
          id="description"
          {...register("description", {
            required: "Beskrivning saknas",
            maxLength: { value: 1500, message: "Max 1500 tecken" },
            validate: {
              emailValidation: (value) => validatePersonalInfo(value, "email"),
              phoneValidation: (value) => validatePersonalInfo(value, "phone"),
            },
          })}
          placeholder="Skriv beskrivning här..."
          className="h-32 resize-none"
          aria-describedby="description-hint"
          aria-required="true"
        />
        {errors.description?.message && <FormErrorParagraph content={errors.description.message as string} />}
      </div>
    </section>
  );
}
