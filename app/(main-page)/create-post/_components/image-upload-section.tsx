"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";

import FormLabel from "./form-label";
import FormHint from "./form-hint";
import FormErrorParagraph from "./form-error-paragraph";
import { FormInputs, useImageUpload, validateImage } from "../_utils/form";

interface ImageUploadSectionProps {
  imageUrl?: string;
  imageNameParameter?: string;
}

export default function ImageUploadSection({ imageUrl, imageNameParameter }: ImageUploadSectionProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormInputs>();

  const { imagePreview, imageName, isDraggingOver, handleImageFileChange, handleDragOver, handleDragEnter, handleDragLeave, handleDrop, handleImageUpload, handleRemoveImage } = useImageUpload(
    imageUrl,
    imageNameParameter,
  );

  // Setup event listeners for drag and drop
  useEffect(() => {
    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    // Call the effect once to initialize the preview if there's an image
    handleImageFileChange();

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, [handleDragEnter, handleDragOver, handleDragLeave, handleDrop, handleImageFileChange]);

  return (
    <>
      {/* Drag Overlay - Outside the section but controlled by this component */}
      {isDraggingOver && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <p className="text-2xl font-bold text-white">Släpp bilden här för att ladda upp</p>
        </div>
      )}

      {/* Image upload section */}
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between">
          <FormLabel htmlFor="image-upload-button" labelText="Bild (frivilligt)" />
          <FormHint content="Ladda upp en bild på produkten (jpg, png, max 5MB). Vänligen säkerställ att ingen känslig information kan hittas i bilden." />
        </div>

        {/* Hidden file input */}
        <input type="file" id="image-input" {...register("image", { validate: validateImage })} accept="image/png, image/jpeg" className="hidden" onChange={handleImageUpload} />

        {/* Clickable area / Drop Zone */}
        <Button
          type="button"
          id="image-upload-button"
          className={`mt-2 flex h-full min-h-[8rem] w-full flex-col items-center justify-center rounded-sm border-2 border-dashed bg-primary bg-opacity-40 px-2 py-1 text-center text-sm text-gray-400 md:text-base ${
            imagePreview ? "border-transparent" : "border-gray-500 hover:border-gray-400"
          }`}
          onClick={() => document.getElementById("image-input")?.click()}
        >
          {imagePreview ? (
            <>
              {/* Show image preview */}
              <Image src={imagePreview} alt="Förhandsgranskning" className="mb-2 max-h-24 w-auto rounded object-contain" width={200} height={150} />
              <span className="block max-w-full truncate p-1 text-xs text-gray-700 dark:text-gray-300">{imageName || "Bild"}</span>
            </>
          ) : (
            <span className="whitespace-normal">Klicka här eller dra och släpp en bild för att ladda upp</span>
          )}
        </Button>

        {/* Remove image button */}
        {imagePreview && (
          <Button
            type="button"
            id="remove-image-button"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveImage();
            }}
            className="mt-1 rounded bg-red-500 px-2 py-0.5 text-xs text-white hover:bg-red-600"
          >
            Ta bort bild
          </Button>
        )}

        {/* Display validation errors */}
        {errors.image?.message && <FormErrorParagraph content={typeof errors.image.message === "string" ? errors.image.message : "Ogiltig fil"} />}
      </div>
    </>
  );
}
