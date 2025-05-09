import { Controller, useFormContext } from "react-hook-form";
import PostTypePicker from "./post-type-picker";
import { FormInputs } from "../_utils/form";

export default function PostTypeSection() {
  const { control } = useFormContext<FormInputs>();

  return (
    <section aria-labelledby="post-type-section" className="w-full">
      <div className="sr-only" id="post-type-section">
        Annonstyp
      </div>
      <Controller
        name="postTypePicker"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => <PostTypePicker currentPostType={value} setPostType={onChange} aria-required={true} id="post-type-picker" />}
      />
    </section>
  );
}
