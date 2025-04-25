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
  imageUrl?: string; // Changed from image: File to imageUrl: string
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
  imageUrl, // Use the updated prop name
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
      image: undefined, // Start with no file selected in the form state
    },
  });

  // Watches the form inputs so that they can be used on the post preview
  const formData = useWatch({ control });

  // --- State Initialization ---
  // Initialize preview state with the imageUrl prop if it exists
  const [imagePreview, setImagePreview] = useState<string | null>(imageUrl || null);
  // Initialize name state based on the imageUrl prop

  const [imageName, setImageName] = useState<string | undefined>(imageNameParameter);

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
    // Use imagePreview for the display data, it holds initial URL or new data URL
    imageThumbUrl: imagePreview,
    imageFullUrl: imagePreview,
    createdAt: new Date(), // Should likely be set on the server or use existing if updating
    expiresAt: formData.datePicker || date || new Date(), // Use the date from the form or fallback to prop
    hasCustomExpirationDate: !!formData.datePicker || customExpirationDate || false, // Simplified logic
    imageName: imageName || null, // Use the name from the URL or default
  };

  const router = useRouter();
  const fullName = firstName + " " + lastName;
  const categoryList = ["förbrukningsvara", "instrument/maskin", "inventarie"];

  // Watch the 'image' field in the form (for NEW uploads)
  const imageFile = watch("image");

  // Effect to update preview when a NEW file is selected/dropped
  useEffect(() => {
    let fileToRead: File | null = null;

    if (imageFile instanceof FileList && imageFile.length > 0) {
      fileToRead = imageFile[0];
      // Update the form state to store only the File object, not the FileList
      // This prevents the FileList issue if watch somehow picks it up again
      setValue("image", fileToRead, { shouldDirty: true });
    } else if (imageFile instanceof File) {
      fileToRead = imageFile;
    }

    if (fileToRead) {
      // A new file has been selected/dropped, update preview and name
      setImageName(fileToRead.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Overwrite preview with data URL
      };
      reader.onerror = () => {
        console.error("Error reading file:", reader.error);
        // Optionally reset to initial URL if reading fails? Or just show error?
        // Resetting might be confusing. Let's clear preview on error.
        setImagePreview(null);
        setImageName(undefined);
        setValue("image", null); // Clear invalid file from form state
        toast.error("Kunde inte läsa bildfilen.");
      };
      reader.readAsDataURL(fileToRead);
    } else if (!imageUrl) {
      // Only clear preview if there was no initial imageUrl either
      // Otherwise, keep showing the initial imageUrl
      // This handles the case where the user *removes* a selected file
      // We might need a dedicated "remove image" button for better UX
      // For now, if imageFile becomes null/undefined, and there's no initial URL, clear preview.
      setImagePreview(null);
      setImageName(undefined);
    } else if (imageFile === null || imageFile === undefined) {
      // If imageFile was explicitly cleared (e.g., by a future "remove" button using setValue('image', null))
      // And there *was* an initial image, revert preview back to the initial image.
      setImagePreview(imageUrl);
      setImageName(imageNameParameter);
    }
  }, [imageFile, imageUrl, setValue]); // Add imageUrl and setValue as dependencies

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
    // Check if the leave event is truly leaving the window
    const target = event.relatedTarget;
    if (target === null || (target instanceof Node && !document.documentElement.contains(target))) {
      setIsDraggingOver(false);
    }
  }, []);

  const validateAndSetFile = useCallback(
    async (file: File | null) => {
      if (!file) {
        setValue("image", null); // Clear the file
        // The useEffect will handle resetting the preview based on imageUrl
        await trigger("image"); // Re-validate (might not be necessary for null)
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        toast.error("Endast jpg eller png accepteras");
        setValue("image", null); // Clear invalid file
        return;
      }
      if (file.size > maxSize) {
        toast.error("Max filstorlek 5MB");
        setValue("image", null); // Clear invalid file
        return;
      }

      // File is valid, update the form state
      setValue("image", file, { shouldValidate: true, shouldDirty: true }); // Set and trigger validation
      // No need to call trigger separately if using shouldValidate: true
    },
    [setValue, trigger],
  ); // Removed 'trigger' from deps as it's stable

  const imageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length === 1) {
        await validateAndSetFile(files[0]);
      } else if (files && files.length > 1) {
        toast.error("Endast en bild kan väljas åt gången");
        await validateAndSetFile(null); // Clear selection
      } else {
        // No file selected, maybe user cancelled - ensure state is cleared
        await validateAndSetFile(null);
      }
      // Clear the input value so the same file can be selected again if removed
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
        await validateAndSetFile(null); // Clear selection
      } else {
        // No valid file dropped
        await validateAndSetFile(null);
      }
      event.dataTransfer?.clearData();
    },
    [validateAndSetFile, setIsDraggingOver], // Added setIsDraggingOver
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
    // Adjust date (logic seems okay, but ensure timezone handling is correct for your needs)
    if (data.datePicker instanceof Date) {
      // Example: Convert to UTC midnight for consistency if needed, or keep local time with ISO string
      // Adjusting to 10:00 UTC like before:
      data.datePicker = new Date(data.datePicker.getTime() - data.datePicker.getTimezoneOffset() * 60 * 1000 + 10 * 60 * 60 * 1000).toISOString();
    } else {
      data.datePicker = null; // Ensure null if no date is picked
    }

    console.log("Initial data:", data);
    console.log("Existing imageUrl:", `${process.env.NEXT_PUBLIC_SITE_URL}${imageUrl}`);

    // If updating, no new image selected, BUT an existing image URL exists...
    if (update && (data.image === null || (data.image instanceof FileList && data.image.length === 0)) && imageUrl) {
      console.log("Attempting to convert URL to File...");
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}${imageUrl}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        const blob = await response.blob();
        // Try to get a filename, fallback to a generic name based on type
        let filename = imageName;
        if (!filename || filename === "Bild") {
          // If extraction failed or gave default
          const extension = blob.type.split("/")[1] || "jpg"; // Default to jpg if type is weird
          filename = `existing-image.${extension}`;
        }

        // Create the File object
        data.image = new File([blob], filename, { type: blob.type });
        console.log("Successfully converted URL to File:", data.image);
      } catch (error) {
        console.error("Error converting image URL to File:", error);
        toast.error("Kunde inte ladda om den befintliga bilden. Försök igen.");
        setIsSubmitting(false); // Stop submission if conversion fails
        return; // Exit onSubmit
      }
    } else if (data.image === null || data.image === undefined) {
      console.log("No image selected or provided for update/create.");
      // Ensure data.image is explicitly null if it wasn't set or converted
      data.image = null;
    }

    setIsSubmitting(true);

    console.log(data);

    try {
      let result;
      if (update && postId) {
        // Ensure postId exists for update
        result = await updatePost({ data: data, postId }); // Pass the File object within data
      } else {
        result = await createPost({ data: data }); // Pass the File object within data
      }

      if (result && result.error) {
        toast.error(result.error);
        setIsSubmitting(false);
      } else if (result && result.data) {
        toast.success(result.data);
        router.push("/");
        router.refresh();
        // Navigation happens, no need to setIsSubmitting(false)
      } else {
        // Handle cases where result is undefined or lacks data/error
        toast.error("Något gick fel (okänt svar)");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Ett oväntat fel inträffade.");
      setIsSubmitting(false);
    }
  };

  // Validation function remains the same
  const validateImage = (file: File | FileList | undefined | null): boolean | string => {
    if (!file) return true; // No file selected, valid case
    if (file instanceof FileList) {
      if (file.length === 0)
        return true; // No file selected, valid case
      else return false; // FileList with files is invalid
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
          {/* ... (rest of the form fields - no changes needed here) ... */}
          <h1 className="text-center text-xl md:text-3xl">{update ? "Uppdatera annons" : "Skapa ny annons"}</h1>
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
              <FormHint content="Ladda upp en bild på produkten (jpg, png, max 5MB)" />
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
          {/* --- END Image upload section --- */}

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
