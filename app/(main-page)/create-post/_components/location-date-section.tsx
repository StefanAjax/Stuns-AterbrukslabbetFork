import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
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
    <section aria-labelledby="location-date-section" className="w-full">
      <div className="sr-only" id="location-date-section">
        Plats och datum
      </div>
      <div className="flex flex-wrap justify-between gap-y-4">
        {/* Municipality */}
        <div className="flex w-full flex-col space-y-2 md:w-auto md:flex-1 md:pr-2">
          <div className="flex justify-between">
            <Label htmlFor="municipality-picker">Kommun</Label>
            <FormHint content="Välj den kommun där produkten kan hämtas/överlämnas" />
          </div>
          <Controller
            name="municipalityPicker"
            control={control}
            rules={{ required: "Kommun ej vald" }}
            render={({ field: { onChange, value } }) => (
              <MunicipalityPicker currentMunicipality={value} setCurrentMunicipality={onChange} itemsList={municipalities} id="municipality-picker" aria-required={true} />
            )}
          />
          {errors.municipalityPicker?.message && <FormErrorParagraph content={errors.municipalityPicker.message as string} />}
        </div>

        {/* Date Picker */}
        <div className="flex w-full flex-col space-y-2 md:w-auto md:flex-1 md:pl-2">
          <div className="flex justify-between">
            <Label htmlFor="date-picker">Slutdatum (frivilligt)</Label>
            <FormHint content="Ange sista datum då annonsen är aktuell. Om ej ifylld får du en påminnelse efter sex månader." />
          </div>
          <Controller name="datePicker" control={control} render={({ field: { onChange, value } }) => <DatePicker date={value} setDate={onChange} id="date-picker" />} />
          {/* No error display needed for optional date */}
        </div>
      </div>
    </section>
  );
}
