import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormHint from "./form-hint";
import FormErrorParagraph from "./form-error-paragraph";
import { FormInputs } from "../_utils/form";

export default function UserInfoSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormInputs>();

  return (
    <section aria-labelledby="user-info-section" className="space-y-4">
      <div className="sr-only" id="user-info-section">
        Användarinformation
      </div>
      <fieldset>
        <legend className="sr-only">Personlig information</legend>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:gap-6">
          <div className="flex w-full flex-col space-y-2">
            <Label htmlFor="firstName">Förnamn</Label>
            <Input id="firstName" {...register("firstName", { required: "Förnamn saknas" })} disabled aria-readonly="true" />
            {errors.firstName?.message && <FormErrorParagraph content={errors.firstName.message} />}
          </div>
          <div className="flex w-full flex-col space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="lastName">Efternamn</Label>
              <FormHint content="Förnamn, efternamn och mejladress kan ändras via din profilsida" />
            </div>
            <Input id="lastName" {...register("lastName", { required: "Efternamn saknas" })} disabled aria-readonly="true" />
            {errors.lastName?.message && <FormErrorParagraph content={errors.lastName.message} />}
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend className="sr-only">Kontaktinformation</legend>
        <div className="flex w-full flex-col space-y-2">
          <Label htmlFor="email">Mejladress</Label>
          <Input id="email" {...register("email", { required: "Mejladress saknas" })} type="email" disabled aria-readonly="true" autoComplete="off" />
          {errors.email?.message && <FormErrorParagraph content={errors.email.message} />}
        </div>
      </fieldset>
    </section>
  );
}
