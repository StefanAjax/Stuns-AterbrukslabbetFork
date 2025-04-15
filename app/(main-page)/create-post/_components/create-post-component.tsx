"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

import municipalities from "@/data/municipalities.json";

import CancelFormAlertDialog from "./cancel-form-alert-dialog";
import CategoryPicker from "./category-picker";
import createPost from "../utils/create-post";
import CreatePostAlertDialog from "./create-post-alert-dialog";
import DatePicker from "./date-picker";
import FormErrorParagraph from "./form-error-paragraph";
import FormHint from "./form-hint";
import FormLabel from "./form-label";
import MunicipalityPicker from "./municipality-picker";
import PostComponent from "../../post/_components/post-component";
import PostPreviewForMobile from "./post-preview-for-mobile";
import PostTypePicker from "./post-type-picker";
import updatePost from "../utils/update-post";

interface CreatePostComponentProps {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
  title?: string;
  description?: string;
  postType?: string;
  category?: string;
  municipality?: string;
  date?: Date;
  customExpirationDate?: boolean;
  update: boolean;
  postId?: string;
}

interface FormInputs {
  postTypePicker: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  description: string;
  categoryPicker: string;
  municipalityPicker: string;
  datePicker: any;
}

export default function CreatePostComponent({
  firstName,
  lastName,
  email,
  userId,
  title,
  description,
  postType,
  category,
  municipality,
  date,
  customExpirationDate,
  update,
  postId,
}: CreatePostComponentProps) {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>({
    defaultValues: {
      postTypePicker: postType || "Erbjuds",
      firstName: firstName,
      lastName: lastName,
      email: email,
      title: title || "",
      description: description || "",
      categoryPicker: category || "",
      municipalityPicker: municipality || "",
      datePicker: date || undefined,
    },
  });

  // Watches the form inputs so that they can be used on the post preview
  const formData = useWatch({ control });

  const postData = {
    id: 0,
    postId: postId || undefined,
    userId: userId,
    title: formData.title || title || "Titel",
    description: formData.description || description || "Beskrivning",
    postType: formData.postTypePicker || postType || "Erbjuds",
    category: formData.categoryPicker || category || "",
    location: formData.municipalityPicker || municipality || "",
    imageThumbUrl: null,
    imageFullUrl: null,
    createdAt: new Date(),
    expiresAt: formData.datePicker || date || new Date(),
    hasCustomExpirationDate: customExpirationDate || formData.datePicker != undefined,
  };

  const router = useRouter();

  const fullName = firstName + " " + lastName;

  const categoryList = ["förbrukningsvara", "instrument/maskin", "inventarie"];

  // UseState to prevent multiple successful submissions of the form
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormInputs) => {
    // Adjust the date created by the datePicker component to 10:00 UTC
    if (data.datePicker) {
      data.datePicker = new Date(data.datePicker.getTime() - data.datePicker.getTimezoneOffset() * 60 * 1000 + 10 * 60 * 60 * 1000);

      // Make the date into an ISOString to remove unnecessary information regarding timezone from the object
      data.datePicker = data.datePicker.toISOString();
    }
    setIsSubmitting(true);
    let result;
    if (update) {
      result = await updatePost({ data, postId });
    } else {
      result = await createPost({ data });
    }
    if (result && result.error) {
      toast.error(result.error);
    } else if (result && result.data) {
      router.push("/");
      router.refresh();
      toast.success(result.data);
    } else {
      toast.error("Något gick fel");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="mx-auto mt-10 flex max-w-screen-xl flex-wrap justify-center gap-x-20 gap-y-3 md:gap-y-6">
      <div className="h-fit w-[360px] rounded-2xl bg-secondary p-3 md:w-[600px] md:p-6">
        <form id="create-post-form" className="flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center text-xl md:text-3xl">{update ? "Uppdatera annons" : "Skapa ny annons"}</h1>
          <Controller
            name="postTypePicker"
            control={control}
            rules={{ required: true }}
            defaultValue={postType || "Erbjuds"}
            render={({ field: { onChange, value } }) => <PostTypePicker currentPostType={value} setPostType={onChange} />}
          />
          <div className="flex justify-between gap-x-4 md:gap-x-8">
            <div className="flex w-full flex-col">
              <FormLabel htmlFor="firstName" labelText="Förnamn" />
              <fieldset disabled>
                <input id="firstName" {...register("firstName", { required: "Förnamn saknas" })} className="w-full rounded-sm bg-primary px-2 py-1 text-sm md:text-base" value={firstName} />
              </fieldset>
              {errors.firstName?.message && <FormErrorParagraph content={errors.firstName.message} />}
            </div>
            <div className="flex w-full flex-col">
              <div className="flex justify-between">
                <FormLabel htmlFor="lastName" labelText="Efternamn" />
                <FormHint content="Förnamn, efternamn och mejladress kan ändras via din profilsida" />
              </div>
              <fieldset disabled>
                <input id="lastName" {...register("lastName", { required: "Efternamn saknas" })} className="w-full rounded-sm bg-primary px-2 py-1 text-sm md:text-base" value={lastName} readOnly />
              </fieldset>
              {errors.lastName?.message && <FormErrorParagraph content={errors.lastName.message} />}
            </div>
          </div>
          <div className="flex w-full flex-col">
            <FormLabel htmlFor="email" labelText="Mejladress" />
            <fieldset disabled>
              <input
                id="email"
                {...register("email", { required: "Mejladress saknas" })}
                type="email"
                className="w-full rounded-sm bg-primary px-2 py-1 text-sm md:text-base"
                value={email}
                readOnly
                autoComplete="off"
              />
            </fieldset>
            {errors.email?.message && <FormErrorParagraph content={errors.email.message} />}
          </div>
          <div className="flex w-full flex-col">
            <div className="flex justify-between">
              <FormLabel htmlFor="title" labelText="Titel" />
              <FormHint content="Max 40 tecken. Inkludera aldrig personuppgifter av något slag." />
            </div>
            <input
              id="title"
              {...register("title", {
                required: "Titel saknas",
                value: title,
                maxLength: { value: 40, message: "Max 40 tecken" },
                validate: {
                  emailValidation: (value) => value.match(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g) == null || "Du får inte ha en mejladress i titeln",
                  phoneValidation: (value) => value.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/) == null || "Du får inte ha ett telefonnummer i titeln",
                },
              })}
              className="w-full rounded-sm bg-primary bg-opacity-40 px-2 py-1 text-sm md:text-base"
              placeholder="Skriv titel här..."
            />
            {errors.title?.message && <FormErrorParagraph content={errors.title.message} />}
          </div>

          <div className="flex w-full flex-col">
            <div className="flex justify-between">
              <FormLabel htmlFor="description" labelText="Beskrivning" />
              <FormHint content="Max 1500 tecken. Inkludera aldrig personuppgifter av något slag." />
            </div>
            <textarea
              id="description"
              {...register("description", {
                required: "Beskrivning saknas",
                value: description,
                maxLength: { value: 1500, message: "Max 1500 tecken" },
                validate: {
                  emailValidation: (value) => value.match(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g) == null || "Du får inte ha en mejladress i beskrivningen",
                  phoneValidation: (value) => value.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/) == null || "Du får inte ha ett telefonnummer i beskrivningen",
                },
              })}
              className="h-32 w-full resize-none rounded-sm bg-primary bg-opacity-40 px-2 py-1 text-sm md:text-base"
              placeholder="Skriv beskrivning här..."
            ></textarea>
            {errors.description?.message && <FormErrorParagraph content={errors.description.message} />}
          </div>
          <div className="flex w-full flex-col">
            <div className="flex justify-between">
              <h2 className="text-sm font-medium md:text-base">Kategori</h2>
              <FormHint content="Välj den kategori som bäst överensstämmer med produkten" />
            </div>
            <Controller
              name="categoryPicker"
              control={control}
              defaultValue={category}
              rules={{ required: "Kategori ej vald" }}
              render={({ field: { onChange, value } }) => <CategoryPicker currentCategory={value} setCurrentCategory={onChange} Itemslist={categoryList} />}
            />
            {errors.categoryPicker?.message && <FormErrorParagraph content={errors.categoryPicker.message} />}
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <h2 className="text-sm font-medium md:text-base">Kommun</h2>
                <FormHint content="Välj den kommun där produkten kan hämtas/överlämnas" />
              </div>
              <Controller
                name="municipalityPicker"
                control={control}
                defaultValue={municipality}
                rules={{ required: "Kommun ej vald" }}
                render={({ field: { onChange, value } }) => <MunicipalityPicker currentMunicipality={value} setCurrentMunicipality={onChange} itemsList={municipalities} />}
              />
              {errors.municipalityPicker?.message && <FormErrorParagraph content={errors.municipalityPicker.message} />}
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <h2 className="text-sm font-medium md:text-base">Slutdatum (frivilligt)</h2>
                <FormHint content="Ange sista datum då annonsen är aktuell. Om ej ifylld får du en påminnelse efter sex månader." />
              </div>
              <Controller name="datePicker" control={control} render={({ field: { onChange, value } }) => <DatePicker date={value} setDate={onChange} />} />
            </div>
          </div>
          <div className="mt-5 flex justify-between">
            <PostPreviewForMobile postData={postData} email={email} fullName={fullName} />
            <div className="flex w-full justify-end gap-x-2 md:gap-x-5">
              <CancelFormAlertDialog />
              <CreatePostAlertDialog isSubmitting={isSubmitting} update={update} />
            </div>
          </div>
        </form>
      </div>
      <div className="hidden w-[600px] md:block">
        <PostComponent postData={postData} email={email} fullName={fullName} isPreview={true} />
      </div>
    </div>
  );
}
