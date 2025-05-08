import { Controller, useFormContext } from "react-hook-form";
import FormHint from "./form-hint";
import FormErrorParagraph from "./form-error-paragraph";
import CategoryPicker from "./category-picker";
import { FormInputs } from "../_utils/form";

export default function CategorySection() {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormInputs>();

  // List of categories
  const categoryList = ["förbrukningsvara", "instrument/maskin", "inventarie"];

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between">
        <h2 className="text-sm font-medium md:text-base">Kategori</h2>
        <FormHint content="Välj den kategori som bäst överensstämmer med produkten" />
      </div>
      <Controller
        name="categoryPicker"
        control={control}
        rules={{ required: "Kategori ej vald" }}
        render={({ field: { onChange, value } }) => <CategoryPicker currentCategory={value} setCurrentCategory={onChange} Itemslist={categoryList} />}
      />
      {errors.categoryPicker?.message && <FormErrorParagraph content={errors.categoryPicker.message as string} />}
    </div>
  );
}
