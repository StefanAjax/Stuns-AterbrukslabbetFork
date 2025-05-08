import { useFormContext } from "react-hook-form";
import FormLabel from "./form-label";
import FormHint from "./form-hint";
import FormErrorParagraph from "./form-error-paragraph";
import { FormInputs, validatePersonalInfo } from "../_utils/form";

export default function DescriptionSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormInputs>();

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between">
        <FormLabel htmlFor="description" labelText="Beskrivning" />
        <FormHint content="Max 1500 tecken. Inkludera aldrig personuppgifter av något slag." />
      </div>
      <textarea
        id="description"
        {...register("description", {
          required: "Beskrivning saknas",
          maxLength: { value: 1500, message: "Max 1500 tecken" },
          validate: {
            emailValidation: (value) => validatePersonalInfo(value, "email"),
            phoneValidation: (value) => validatePersonalInfo(value, "phone"),
          },
        })}
        className="h-32 w-full resize-none rounded-sm bg-primary bg-opacity-40 px-2 py-1 text-sm md:text-base"
        placeholder="Skriv beskrivning här..."
      ></textarea>
      {errors.description?.message && <FormErrorParagraph content={errors.description.message as string} />}
    </div>
  );
}
