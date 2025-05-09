import { Controller, useFormContext } from "react-hook-form";
import FormHint from "./form-hint";
import FormErrorParagraph from "./form-error-paragraph";
import CategoryPicker from "./category-picker";
import { FormInputs } from "../_utils/form";
import { Label } from "@/components/ui/label";

export default function CategorySection() {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormInputs>();

  const categoryList = ["förbrukningsvara", "instrument/maskin", "inventarie"];

  return (
    <section aria-labelledby="category-section" className="w-full">
      <div className="sr-only" id="category-section">
        Kategorisektion
      </div>
      <div className="flex w-full flex-col space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="category-picker">Kategori</Label>
          <FormHint content="Välj den kategori som bäst överensstämmer med produkten" />
        </div>
        <Controller
          name="categoryPicker"
          control={control}
          rules={{ required: "Kategori ej vald" }}
          render={({ field: { onChange, value } }) => <CategoryPicker currentCategory={value} setCurrentCategory={onChange} Itemslist={categoryList} id="category-picker" aria-required={true} />}
        />
        {errors.categoryPicker?.message && <FormErrorParagraph content={errors.categoryPicker.message as string} />}
      </div>
    </section>
  );
}
