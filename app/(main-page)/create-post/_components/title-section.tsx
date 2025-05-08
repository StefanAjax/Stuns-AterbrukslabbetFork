import { useFormContext } from "react-hook-form";
import FormLabel from "./form-label";
import FormHint from "./form-hint";
import FormErrorParagraph from "./form-error-paragraph";
import { FormInputs, validatePersonalInfo } from "../_utils/form";

export default function TitleSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormInputs>();

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between">
        <FormLabel htmlFor="title" labelText="Titel" />
        <FormHint content="Max 40 tecken. Inkludera aldrig personuppgifter av något slag." />
      </div>
      <input
        id="title"
        {...register("title", {
          required: "Titel saknas",
          maxLength: { value: 40, message: "Max 40 tecken" },
          validate: {
            emailValidation: (value) => validatePersonalInfo(value, "email"),
            phoneValidation: (value) => validatePersonalInfo(value, "phone"),
          },
        })}
        className="w-full rounded-sm bg-opacity-40 px-2 py-1 text-sm md:text-base"
        placeholder="Skriv titel här..."
      />
      {errors.title?.message && <FormErrorParagraph content={errors.title.message as string} />}
    </div>
  );
}
