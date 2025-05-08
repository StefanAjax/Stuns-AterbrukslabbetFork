import { useFormContext } from "react-hook-form";
import FormLabel from "./form-label";
import FormHint from "./form-hint";
import FormErrorParagraph from "./form-error-paragraph";
import { FormInputs } from "../_utils/form";

export default function UserInfoSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormInputs>();

  return (
    <>
      {/* First Name / Last Name */}
      <div className="flex justify-between gap-x-4 md:gap-x-8">
        <div className="flex w-full flex-col">
          <FormLabel htmlFor="firstName" labelText="Förnamn" />
          <fieldset disabled>
            <input id="firstName" {...register("firstName", { required: "Förnamn saknas" })} className="w-full rounded-sm bg-primary px-2 py-1 text-sm md:text-base" />
          </fieldset>
          {errors.firstName?.message && <FormErrorParagraph content={errors.firstName.message} />}
        </div>
        <div className="flex w-full flex-col">
          <div className="flex justify-between">
            <FormLabel htmlFor="lastName" labelText="Efternamn" />
            <FormHint content="Förnamn, efternamn och mejladress kan ändras via din profilsida" />
          </div>
          <fieldset disabled>
            <input id="lastName" {...register("lastName", { required: "Efternamn saknas" })} className="w-full rounded-sm bg-primary px-2 py-1 text-sm md:text-base" readOnly />
          </fieldset>
          {errors.lastName?.message && <FormErrorParagraph content={errors.lastName.message} />}
        </div>
      </div>

      {/* Email */}
      <div className="flex w-full flex-col">
        <FormLabel htmlFor="email" labelText="Mejladress" />
        <fieldset disabled>
          <input
            id="email"
            {...register("email", { required: "Mejladress saknas" })}
            type="email"
            className="w-full rounded-sm bg-primary px-2 py-1 text-sm md:text-base"
            readOnly
            autoComplete="off"
          />
        </fieldset>
        {errors.email?.message && <FormErrorParagraph content={errors.email.message} />}
      </div>
    </>
  );
}
