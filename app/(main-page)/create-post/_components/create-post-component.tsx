"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

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
  imageUrl?: string;
  imageNameParameter?: string;
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
  image?: File | null; // Can be File or null/undefined
}

type PostResult = {
  data?: string;
  error?: string;
};

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
  imageUrl,
  imageNameParameter,
}: CreatePostComponentProps) {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    trigger,
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
      image: undefined,
    },
  });

  const formData = useWatch({ control });

  const [imagePreview, setImagePreview] = useState<string | null>(imageUrl || null);

  const [imageName, setImageName] = useState<string | undefined>(imageNameParameter);

  // Log imageName whenever it changes
  useEffect(() => {
    console.log("Image name changed:", imageName);
  }, [imageName]);

  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const postData = {
    id: 0,
    postId: postId || undefined,
    userId: userId,
    title: formData.title || title || "Titel",
    description: formData.description || description || "Beskrivning",
    postType: formData.postTypePicker || postType || "Erbjuds",
    category: formData.categoryPicker || category || "",
    location: formData.municipalityPicker || municipality || "",
    imageThumbUrl: imagePreview,
    imageFullUrl: imagePreview,
    createdAt: new Date(),
    expiresAt: formData.datePicker || date || new Date(),
    hasCustomExpirationDate: !!formData.datePicker || customExpirationDate || false,
    imageName: imageName || null,
  };

  const router = useRouter();
  const fullName = firstName + " " + lastName;
  const categoryList = ["förbrukningsvara", "instrument/maskin", "inventarie"];

  const imageFile = watch("image");

  useEffect(() => {
    let fileToRead: File | null = null;

    if (imageFile instanceof FileList && imageFile.length > 0) {
      fileToRead = imageFile[0];
      setValue("image", fileToRead, { shouldDirty: true });
    } else if (imageFile instanceof File) {
      fileToRead = imageFile;
    }

    if (fileToRead) {
      setImageName(fileToRead.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.onerror = () => {
        setImagePreview(null);
        setImageName(undefined);
        setValue("image", null);
        toast.error("Kunde inte läsa bildfilen.");
      };
      reader.readAsDataURL(fileToRead);
    } else if (!imageUrl) {
      setImagePreview(null);
      setImageName(undefined);
    } else if (imageFile === null || imageFile === undefined) {
      setImagePreview(imageUrl);
      setImageName(imageNameParameter);
    }
  }, [imageFile, imageUrl, setValue]);

  // --- Drag and Drop Handlers (modified slightly for clarity) ---
  const handleDragOver = useCallback((event: globalThis.DragEvent) => {
    event.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragEnter = useCallback((event: globalThis.DragEvent) => {
    event.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((event: globalThis.DragEvent) => {
    event.preventDefault();
    const target = event.relatedTarget;
    if (target === null || (target instanceof Node && !document.documentElement.contains(target))) {
      setIsDraggingOver(false);
    }
  }, []);

  const validateAndSetFile = useCallback(
    async (file: File | null) => {
      if (!file) {
        setValue("image", null);
        await trigger("image");
        setImagePreview(null);
        setImageName(undefined);
        postData.imageName = null;
        postData.imageThumbUrl = null;
        postData.imageFullUrl = null;
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        toast.error("Endast jpg eller png accepteras");
        setValue("image", null);
        return;
      }
      if (file.size > maxSize) {
        toast.error("Max filstorlek 5MB");
        setValue("image", null);
        return;
      }

      setValue("image", file, { shouldValidate: true, shouldDirty: true });
      setImagePreview(URL.createObjectURL(file));
      setImageName(file.name);
      postData.imageName = file.name;
      postData.imageThumbUrl = URL.createObjectURL(file);
      postData.imageFullUrl = URL.createObjectURL(file);
    },
    [setValue, trigger],
  );

  const imageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length === 1) {
        await validateAndSetFile(files[0]);
      } else if (files && files.length > 1) {
        toast.error("Endast en bild kan väljas");
        await validateAndSetFile(null);
      } else {
        await validateAndSetFile(null);
      }
      event.target.value = "";
    },
    [validateAndSetFile],
  );

  const handleDrop = useCallback(
    async (event: globalThis.DragEvent) => {
      event.preventDefault();
      setIsDraggingOver(false);

      const files = event.dataTransfer?.files;
      if (files && files.length === 1) {
        await validateAndSetFile(files[0]);
      } else if (files && files.length > 1) {
        toast.error("Endast en bild kan väljas");
        await validateAndSetFile(null);
      } else {
        await validateAndSetFile(null);
      }
      event.dataTransfer?.clearData();
    },
    [validateAndSetFile, setIsDraggingOver],
  );

  // --- Add and Remove Global Event Listeners ---
  useEffect(() => {
    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, [handleDragEnter, handleDragOver, handleDragLeave, handleDrop]);

  const onSubmit = async (data: FormInputs) => {
    if (data.datePicker instanceof Date) {
      data.datePicker = new Date(data.datePicker.getTime() - data.datePicker.getTimezoneOffset() * 60 * 1000 + 10 * 60 * 60 * 1000).toISOString();
    } else {
      data.datePicker = null;
    }

    try {
      setIsSubmitting(true);

      let result: PostResult;

      if (update && postId) {
        const updatePostPromise = updatePost({ data, postId });
        toast.promise(updatePostPromise, {
          loading: "Uppdaterar annons…",
          success: (res) => (res as PostResult).data || "Annons uppdaterad",
          error: (err) => (typeof err.error === "string" ? err.error : err.error || "Något gick fel"),
        });
        result = await updatePostPromise;
      } else {
        const createPostPromise = createPost({ data });
        toast.promise(createPostPromise, {
          loading: "Skapar annons…",
          success: (res) => (res as PostResult).data || "Annons skapad",
          error: (err) => (typeof err.error === "string" ? err.error : err.error || "Något gick fel"),
        });
        result = await createPostPromise;
      }

      if (result?.data) {
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("Ett oväntat fel inträffade.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateImage = (file: File | FileList | undefined | null): boolean | string => {
    if (!file) return true;
    if (file instanceof FileList) {
      if (file.length === 0) return true;
      else return false;
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) return "Endast jpg eller png accepteras";
    if (file.size > maxSize) return "Max filstorlek 5MB";
    return true;
  };

  // --- Render ---
  return (
    <div className="relative mx-auto mt-10 flex max-w-screen-xl flex-wrap justify-center gap-x-20 gap-y-3 md:gap-y-6">
      {/* Drag Overlay */}
      {isDraggingOver && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <p className="text-2xl font-bold text-white">Släpp bilden här för att ladda upp</p>
        </div>
      )}

      {/* Form Area */}
      <div className="h-fit w-[360px] rounded-2xl bg-secondary p-3 md:w-[600px] md:p-6">
        {/* Add novalidate to prevent default browser validation, rely on RHF */}
        <form id="create-post-form" className="flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1 className="text-center text-xl md:text-3xl">{update ? "Uppdatera annons" : "Skapa ny annons"}</h1>

          {/* Erbjuds / Efterfrågas */}
          <Controller
            name="postTypePicker"
            control={control}
            rules={{ required: true }}
            // defaultValue is handled by useForm
            render={({ field: { onChange, value } }) => <PostTypePicker currentPostType={value} setPostType={onChange} />}
          />

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

          {/* Title */}
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
                  emailValidation: (value) => value?.match(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g) == null || "Du får inte ha en mejladress i titeln",
                  phoneValidation: (value) => value?.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/) == null || "Du får inte ha ett telefonnummer i titeln",
                },
              })}
              className="w-full rounded-sm bg-primary bg-opacity-40 px-2 py-1 text-sm md:text-base"
              placeholder="Skriv titel här..."
            />
            {errors.title?.message && <FormErrorParagraph content={errors.title.message} />}
          </div>

          {/* Description */}
          <div className="flex w-full flex-col">
            <div className="flex justify-between">
              <FormLabel htmlFor="description" labelText="Beskrivning" />
              <FormHint content="Max 1500 tecken. Inkludera aldrig personuppgifter av något slag." />
            </div>
            <textarea
              id="description"
              {...register("description", {
                required: "Beskrivning saknas",
                maxLength: { value: 1500, message: "Max 1500 tecken" },
                validate: {
                  emailValidation: (value) => value?.match(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g) == null || "Du får inte ha en mejladress i beskrivningen",
                  phoneValidation: (value) => value?.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/) == null || "Du får inte ha ett telefonnummer i beskrivningen",
                },
              })}
              className="h-32 w-full resize-none rounded-sm bg-primary bg-opacity-40 px-2 py-1 text-sm md:text-base"
              placeholder="Skriv beskrivning här..."
            ></textarea>
            {errors.description?.message && <FormErrorParagraph content={errors.description.message} />}
          </div>

          {/* --- Image upload section --- */}
          <div className="flex w-full flex-col">
            <div className="flex items-center justify-between">
              <FormLabel htmlFor="image-upload-button" labelText="Bild (frivilligt)" /> {/* Changed htmlFor */}
              <FormHint content="Ladda upp en bild på produkten (jpg, png, max 5MB). Vänligen säkerställ att ingen känslig information kan hittas i bilden." />
            </div>
            {/* Hidden file input - register connects it to form state */}
            <input
              type="file"
              id="image-input" // Changed ID
              {...register("image", { validate: validateImage })} // Register the hidden input
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={imageUpload} // Handle selection change
            />
            {/* Clickable area / Drop Zone */}
            <button
              type="button"
              id="image-upload-button" // Use this ID for the label's htmlFor
              className={`mt-2 flex min-h-[8rem] w-full flex-col items-center justify-center rounded-sm border-2 border-dashed bg-primary bg-opacity-40 px-2 py-1 text-center text-sm text-gray-400 md:text-base ${
                imagePreview ? "border-transparent" : "border-gray-500 hover:border-gray-400" // Style change if preview exists
              }`}
              onClick={() => document.getElementById("image-input")?.click()} // Trigger hidden input
            >
              {imagePreview ? (
                <>
                  {/* Show image preview */}
                  <Image src={imagePreview} alt="Förhandsgranskning" className="mb-2 max-h-24 w-auto rounded object-contain" width={200} height={150} />
                  <span className="block max-w-full truncate p-1 text-xs text-gray-700 dark:text-gray-300">{imageName || "Bild"}</span>
                  {/* Add a button to remove the image */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the file input click
                      validateAndSetFile(null); // Use the validation function to clear
                    }}
                    className="mt-1 rounded bg-red-500 px-2 py-0.5 text-xs text-white hover:bg-red-600"
                  >
                    Ta bort bild
                  </button>
                </>
              ) : (
                <span>Klicka här eller dra och släpp en bild för att ladda upp</span>
              )}
            </button>
            {/* Display validation errors */}
            {errors.image?.message && <FormErrorParagraph content={typeof errors.image.message === "string" ? errors.image.message : "Ogiltig fil"} />}
          </div>

          {/* Category */}
          <div className="flex w-full flex-col">
            <div className="flex justify-between">
              <h2 className="text-sm font-medium md:text-base">Kategori</h2>
              <FormHint content="Välj den kategori som bäst överensstämmer med produkten" />
            </div>
            <Controller
              name="categoryPicker"
              control={control}
              // defaultValue is handled by useForm
              rules={{ required: "Kategori ej vald" }}
              render={({ field: { onChange, value } }) => <CategoryPicker currentCategory={value} setCurrentCategory={onChange} Itemslist={categoryList} />}
            />
            {errors.categoryPicker?.message && <FormErrorParagraph content={errors.categoryPicker.message} />}
          </div>

          {/* Municipality / Date */}
          <div className="flex flex-wrap justify-between gap-y-4">
            {" "}
            {/* Added flex-wrap and gap-y */}
            {/* Municipality */}
            <div className="flex w-full flex-col md:w-auto md:flex-1 md:pr-2">
              {" "}
              {/* Adjusted width */}
              <div className="flex justify-between">
                <h2 className="text-sm font-medium md:text-base">Kommun</h2>
                <FormHint content="Välj den kommun där produkten kan hämtas/överlämnas" />
              </div>
              <Controller
                name="municipalityPicker"
                control={control}
                // defaultValue is handled by useForm
                rules={{ required: "Kommun ej vald" }}
                render={({ field: { onChange, value } }) => <MunicipalityPicker currentMunicipality={value} setCurrentMunicipality={onChange} itemsList={municipalities} />}
              />
              {errors.municipalityPicker?.message && <FormErrorParagraph content={errors.municipalityPicker.message} />}
            </div>
            {/* Date Picker */}
            <div className="flex w-full flex-col md:w-auto md:flex-1 md:pl-2">
              {" "}
              {/* Adjusted width */}
              <div className="flex justify-between">
                <h2 className="text-sm font-medium md:text-base">Slutdatum (frivilligt)</h2>
                <FormHint content="Ange sista datum då annonsen är aktuell. Om ej ifylld får du en påminnelse efter sex månader." />
              </div>
              <Controller name="datePicker" control={control} render={({ field: { onChange, value } }) => <DatePicker date={value} setDate={onChange} />} />
              {/* No error display needed for optional date? */}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-5 flex flex-col items-center gap-y-4 md:flex-row md:justify-between">
            <div className="md:hidden">
              {" "}
              {/* Show only on mobile */}
              <PostPreviewForMobile postData={postData} email={email} fullName={fullName} />
            </div>
            <div className="flex w-full justify-center gap-x-2 md:w-auto md:justify-end md:gap-x-5">
              <CancelFormAlertDialog />
              <CreatePostAlertDialog isSubmitting={isSubmitting} update={update} />
            </div>
          </div>
        </form>
      </div>

      {/* Preview Area (Desktop) */}
      <div className="hidden w-[600px] md:block">
        <PostComponent postData={postData} email={email} fullName={fullName} isPreview={true} />
      </div>
    </div>
  );
}
