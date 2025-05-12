// Form types, utilities, and hooks for the create post component
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useFormContext } from "react-hook-form";

import createPost from "./create-post";
import updatePost from "./update-post";

// Form input types
export interface FormInputs {
  postTypePicker: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  description: string;
  categoryPicker: string;
  municipalityPicker: string;
  datePicker: any;
  image?: File | null;
}

// Post result type
export type PostResult = {
  data?: string;
  error?: string;
};

// Validate images for the upload
export const validateImage = (file: File | FileList | undefined | null): boolean | string => {
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

// Validate text to ensure no personal information
export const validatePersonalInfo = (value: string | undefined, type: "email" | "phone"): boolean | string => {
  if (!value) return true;

  if (type === "email") {
    return value.match(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g) == null || "Du får inte ha en mejladress i detta fält";
  }

  if (type === "phone") {
    return value.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/) == null || "Du får inte ha ett telefonnummer i detta fält";
  }

  return true;
};

// Hook for handling form submission
export function usePostFormSubmit(update: boolean, postId?: string) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (data: FormInputs) => {
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

  return { isSubmitting, handleFormSubmit };
}

// Hook for image upload functionality
export function useImageUpload(
  setImagePreview: (preview: string | null) => void,
  setImageName: (name: string | undefined) => void,
  imageUrl?: string,
  imageNameParameter?: string,
  imagePreview?: string | null,
  imageName?: string,
) {
  // Use optional chaining to safely access the form context
  // This prevents errors when the hook is used outside a FormProvider
  const formContext = useFormContext?.() || null;
  const setValue = formContext?.setValue;
  const trigger = formContext?.trigger;
  const watch = formContext?.watch;

  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Safely access imageFile - only call watch if it exists
  const imageFile = watch ? watch("image") : undefined;

  // Effect to handle image file changes
  const handleImageFileChange = useCallback(() => {
    if (imageFile === undefined) {
      if (imageUrl) {
        setImagePreview(imageUrl);
        setImageName(imageNameParameter);
      } else {
        setImagePreview(null);
        setImageName(undefined);
      }
      return;
    }

    let fileToRead: File | null = null;

    if (imageFile instanceof FileList && imageFile.length > 0) {
      fileToRead = imageFile[0];
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
        setValue?.("image", null);
        toast.error("Kunde inte läsa bildfilen.");
      };
      reader.readAsDataURL(fileToRead);
    }
  }, [imageFile, imageUrl, imageNameParameter, setValue, setImagePreview, setImageName]);

  // Validate and set image file
  const validateAndSetFile = useCallback(
    async (file: File | null) => {
      if (!file) {
        setValue?.("image", null);
        setImagePreview(null);
        setImageName(undefined);
        await trigger?.("image");
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        toast.error("Endast jpg eller png accepteras");
        setValue?.("image", null);
        return;
      }
      if (file.size > maxSize) {
        toast.error("Max filstorlek 5MB");
        setValue?.("image", null);
        return;
      }

      setValue?.("image", file, { shouldValidate: true, shouldDirty: true });
    },
    [setValue, trigger, setImagePreview, setImageName],
  );

  // Handle drag events
  const handleDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragEnter = useCallback((event: DragEvent) => {
    event.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((event: DragEvent) => {
    event.preventDefault();
    const target = event.relatedTarget;
    if (target === null || (target instanceof Node && !document.documentElement.contains(target))) {
      setIsDraggingOver(false);
    }
  }, []);

  // Handle dropping a file
  const handleDrop = useCallback(
    async (event: DragEvent) => {
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
    [validateAndSetFile],
  );

  // Image upload handler
  const handleImageUpload = useCallback(
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

  // Remove image handler
  const handleRemoveImage = useCallback(() => {
    validateAndSetFile(null);
  }, [validateAndSetFile]);

  return {
    isDraggingOver,
    handleImageFileChange,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleImageUpload,
    handleRemoveImage,
    validateAndSetFile,
  };
}

// Create post data object for preview
export function usePostPreviewData(formData: any, props: any, imagePreview: string | null, imageName: string | undefined) {
  return {
    id: 0,
    postId: props.postId || undefined,
    userId: props.userId,
    title: formData.title || props.title || "Titel",
    description: formData.description || props.description || "Beskrivning",
    postType: formData.postTypePicker || props.postType || "Erbjuds",
    category: formData.categoryPicker || props.category || "",
    location: formData.municipalityPicker || props.municipality || "",
    imageThumbUrl: imagePreview,
    imageFullUrl: imagePreview,
    createdAt: new Date(),
    expiresAt: formData.datePicker || props.date || new Date(),
    hasCustomExpirationDate: !!formData.datePicker || props.customExpirationDate || false,
    imageName: imageName || null,
  };
}
