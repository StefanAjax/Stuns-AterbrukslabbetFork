"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, DragEvent } from "react"; // Import useEffect, useCallback, DragEvent
import React from "react";

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
  image?: FileList;
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
    setValue,
    watch,
    trigger, // Import trigger for validation
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

  // Watches the form inputs so that they can be used on the post preview
  const formData = useWatch({ control });

  // Image preview state
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [imageName, setImageName] = useState<string | null>(null); // State to track the image name
  // State to track drag-over events on the window
  const [isDraggingOver, setIsDraggingOver] = useState(false); // New state for drag overlay

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
    hasCustomExpirationDate: customExpirationDate || formData.datePicker != undefined,
  };

  const router = useRouter();

  const fullName = firstName + " " + lastName;

  const categoryList = ["förbrukningsvara", "instrument/maskin", "inventarie"];

  // UseState to prevent multiple successful submissions of the form
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Watch for file changes and set preview
  const imageFiles = watch("image");
  // Show image preview when file is selected
  // Only the first image is handled in this example
  React.useEffect(() => {
    if (imageFiles && imageFiles.length > 0) {
      const file = imageFiles[0];

      // Set the image name for display or further processing
      setImageName(file.name);

      // Validation moved to drop handler and input validation, but keep preview logic
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [imageFiles]);

  // --- Drag and Drop Handlers ---
  const handleDragOver = useCallback((event: globalThis.DragEvent) => {
    event.preventDefault(); // Necessary to allow dropping
    setIsDraggingOver(true);
  }, []);

  const handleDragEnter = useCallback((event: globalThis.DragEvent) => {
    event.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((event: globalThis.DragEvent) => {
    event.preventDefault();
    // Check if the leave event is truly leaving the window, not just moving over child elements
    if (event.relatedTarget === null || (event.relatedTarget instanceof Node && !document.documentElement.contains(event.relatedTarget))) {
      setIsDraggingOver(false);
    }
  }, []);

  const imageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        // Validate the first selected file
        const file = files[0];
        const allowedTypes = ["image/jpeg", "image/png"];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
          toast.error("Endast jpg eller png accepteras");
          return;
        }
        if (file.size > maxSize) {
          toast.error("Max filstorlek 5MB");
          return;
        }

        // Use setValue to update the form state with the selected file(s)
        setValue("image", files);
        // Manually trigger validation for the image field after selection
        await trigger("image");
      }
    },
    [setValue, trigger], // Add dependencies
  );

  const handleDrop = useCallback(
    async (event: globalThis.DragEvent) => {
      event.preventDefault();
      setIsDraggingOver(false);

      if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        const files = event.dataTransfer.files;
        // Validate the first dropped file
        const file = files[0];
        const allowedTypes = ["image/jpeg", "image/png"];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
          toast.error("Endast jpg eller png accepteras");
          return;
        }
        if (file.size > maxSize) {
          toast.error("Max filstorlek 5MB");
          return;
        }

        // Use setValue to update the form state with the dropped file(s)
        setValue("image", files);
        // Manually trigger validation for the image field after dropping
        await trigger("image");
        // Clean up the data transfer object
        event.dataTransfer.clearData();
      }
    },
    [setValue, trigger], // Add dependencies
  );

  // --- Add and Remove Global Event Listeners ---
  useEffect(() => {
    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    // Cleanup function to remove listeners when the component unmounts
    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, [handleDragEnter, handleDragOver, handleDragLeave, handleDrop]); // Add handlers as dependencies

  const onSubmit = async (data: FormInputs) => {
    // Adjust the date created by the datePicker component to 10:00 UTC
    if (data.datePicker) {
      data.datePicker = new Date(data.datePicker.getTime() - data.datePicker.getTimezoneOffset() * 60 * 1000 + 10 * 60 * 60 * 1000);

      // Make the date into an ISOString to remove unnecessary information regarding timezone from the object
      data.datePicker = data.datePicker.toISOString();
    }
    setIsSubmitting(true);

    // Handle image upload: You'd need to replace below with your backend/image upload logic
    let imageUrl = null;
    if (data.image && data.image.length > 0) {
      // Example: upload image to server and get URL
      // const uploadResult = await uploadImage(data.image[0]);
      // imageUrl = uploadResult.url;
      // For now, just using the preview as a placeholder
      // Ensure imagePreview state is up-to-date before submitting if relying on it
      // It might be safer to generate a temporary URL or handle upload directly here
      if (imagePreview) {
        // Use the state which should be updated by the useEffect
        imageUrl = imagePreview;
      } else {
        // Fallback or error handling if preview didn't load in time
        console.warn("Image preview was not ready for submission.");
        // Potentially read the file again if needed, or rely on backend upload
      }
    }

    // Pass the image URL to your post creation logic if needed
    let result;
    if (update) {
      result = await updatePost({ data: { ...data, imageUrl }, postId });
    } else {
      result = await createPost({ data: { ...data, imageUrl } });
    }
    if (result && result.error) {
      toast.error(result.error);
      setIsSubmitting(false); // Ensure submitting state is reset on error
    } else if (result && result.data) {
      router.push("/");
      router.refresh();
      toast.success(result.data);
      // No need to reset isSubmitting here as we are navigating away
    } else {
      toast.error("Något gick fel");
      setIsSubmitting(false); // Ensure submitting state is reset on unknown error
    }
    // Removed setIsSubmitting(false) from here as it's handled in error/success paths
  };

  // --- Validation function for react-hook-form ---
  const validateImage = (files: FileList | undefined | null) => {
    if (!files || files.length === 0) return true; // No file is valid (optional)
    const file = files[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) return "Endast jpg eller png accepteras";
    if (file.size > maxSize) return "Max filstorlek 5MB";
    return true;
  };

  return (
    // Add relative positioning to the main container if the overlay uses absolute positioning
    <div className="relative mx-auto mt-10 flex max-w-screen-xl flex-wrap justify-center gap-x-20 gap-y-3 md:gap-y-6">
      {/* --- Drag and Drop Overlay --- */}
      {isDraggingOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <p className="text-2xl font-bold text-white">Släpp bilden här för att ladda upp</p>
        </div>
      )}
      {/* --- End Drag and Drop Overlay --- */}

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
                // Removed default value here, handled by useForm defaultValues
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
                // Removed default value here, handled by useForm defaultValues
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

          {/* --- Image upload section (Below description) --- */}
          <div className="flex w-full flex-col">
            <div className="flex items-center justify-between">
              <FormLabel htmlFor="image" labelText="Bild (frivilligt)" />
              <FormHint content="Ladda upp en bild på produkten (jpg, png, max 5MB)" />
            </div>
            {/* Hidden file input */}
            <input
              type="file"
              id="image"
              {...register("image", {
                validate: validateImage, // Use the validation function
              })}
              accept="image/png, image/jpeg"
              className="hidden" // Keep it hidden
              onChange={imageUpload}
            />
            {/* Clickable area for file selection / Drop Zone feedback */}
            {/* You might want to style this button differently when an image is previewed */}
            <button
              type="button"
              className={`mt-2 flex h-32 w-full items-center justify-center rounded-sm border-2 border-dashed bg-primary bg-opacity-40 px-2 py-1 text-center text-sm text-gray-400 md:text-base ${
                imagePreview ? "border-transparent" : "border-gray-500" // Style change if preview exists
              }`}
              onClick={() => document.getElementById("image")?.click()}
            >
              {imagePreview ? <span className="truncate p-2 text-gray-700 dark:text-gray-300">{imageName}</span> : "Klicka här eller dra och släpp en bild för att ladda upp"}
            </button>
            {errors.image?.message && <FormErrorParagraph content={typeof errors.image.message === "string" ? errors.image.message : "Ogiltig fil"} />} {/* Display validation errors */}
          </div>
          {/* --- END Image upload section --- */}

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
