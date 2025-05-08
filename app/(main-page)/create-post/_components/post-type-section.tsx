import { Controller, useFormContext } from "react-hook-form";
import PostTypePicker from "./post-type-picker";
import { FormInputs } from "../_utils/form";

export default function PostTypeSection() {
  const { control } = useFormContext<FormInputs>();

  return (
    <Controller name="postTypePicker" control={control} rules={{ required: true }} render={({ field: { onChange, value } }) => <PostTypePicker currentPostType={value} setPostType={onChange} />} />
  );
}
