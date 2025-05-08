import { Controller, useFormContext } from "react-hook-form";
import FormHint from "./form-hint";
import FormErrorParagraph from "./form-error-paragraph";
import MunicipalityPicker from "./municipality-picker";
import DatePicker from "./date-picker";
import { FormInputs } from "../_utils/form";
import municipalities from "@/data/municipalities.json";

export default function LocationDateSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormInputs>();

  return (
    <div className="flex flex-wrap justify-between gap-y-4">
      {/* Municipality */}
      <div className="flex w-full flex-col md:w-auto md:flex-1 md:pr-2">
        <div className="flex justify-between">
          <h2 className="text-sm font-medium md:text-base">Kommun</h2>
          <FormHint content="Välj den kommun där produkten kan hämtas/överlämnas" />
        </div>
        <Controller
          name="municipalityPicker"
          control={control}
          rules={{ required: "Kommun ej vald" }}
          render={({ field: { onChange, value } }) => <MunicipalityPicker currentMunicipality={value} setCurrentMunicipality={onChange} itemsList={municipalities} />}
        />
        {errors.municipalityPicker?.message && <FormErrorParagraph content={errors.municipalityPicker.message as string} />}
      </div>

      {/* Date Picker */}
      <div className="flex w-full flex-col md:w-auto md:flex-1 md:pl-2">
        <div className="flex justify-between">
          <h2 className="text-sm font-medium md:text-base">Slutdatum (frivilligt)</h2>
          <FormHint content="Ange sista datum då annonsen är aktuell. Om ej ifylld får du en påminnelse efter sex månader." />
        </div>
        <Controller name="datePicker" control={control} render={({ field: { onChange, value } }) => <DatePicker date={value} setDate={onChange} />} />
        {/* No error display needed for optional date */}
      </div>
    </div>
  );
}
