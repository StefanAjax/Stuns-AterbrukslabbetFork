"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import FormHint from "./form-hint";
import FormErrorParagraph from "./form-error-paragraph";
import { FormInputs, useImageUpload, validateImage } from "../_utils/form";

interface ImageUploadSectionProps {
  setImagePreview: (image: string | null) => void;
  setImageName: (name: string | undefined) => void;
  imagePreview?: string | null;
  imageName?: string;
  imageUrl?: string;
  imageNameParameter?: string;
}

export default function ImageUploadSection({ setImagePreview, setImageName, imagePreview, imageName, imageUrl, imageNameParameter }: ImageUploadSectionProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormInputs>();

  const { isDraggingOver, handleImageFileChange, handleDragOver, handleDragEnter, handleDragLeave, handleDrop, handleImageUpload, handleRemoveImage } = useImageUpload(
    setImagePreview,
    setImageName,
    imageUrl,
    imageNameParameter,
    imagePreview,
    imageName,
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
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/25 backdrop-blur-sm" role="alert" aria-live="assertive">
          <p className="text-2xl font-bold text-white">Släpp bilden här för att ladda upp</p>
        </div>
      )}

      {/* Image upload section */}
      <section aria-labelledby="image-upload-section" className="w-full">
        <div className="sr-only" id="image-upload-section">
          Bilduppladdning
        </div>
        <div className="flex w-full flex-col space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="image-input">Bild (frivilligt)</Label>
            <FormHint content="Ladda upp en bild på produkten (jpg, png, max 5MB). Vänligen säkerställ att ingen känslig information kan hittas i bilden." />
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            id="image-input"
            {...register("image", { validate: validateImage })}
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={handleImageUpload}
            aria-describedby="image-upload-hint"
          />

          {/* Clickable area / Drop Zone */}
          <div
            className={`mt-2 flex h-full min-h-32 w-full flex-col items-center justify-center rounded-md border border-input bg-white bg-opacity-40 p-4 ${
              imagePreview ? "border-solid" : "border-dashed"
            }`}
            role="button"
            tabIndex={0}
            aria-label="Klicka för att ladda upp en bild eller dra och släpp en bild här"
            onClick={() => document.getElementById("image-input")?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                document.getElementById("image-input")?.click();
              }
            }}
          >
            {imagePreview ? (
              <>
                {/* Show image preview */}
                <Image src={imagePreview} alt="Förhandsgranskning av uppladdad bild" className="mb-2 max-h-24 w-auto rounded object-contain" width={200} height={150} />
                <span className="block max-w-full truncate p-1 text-xs text-neutral-500">{imageName || "Bild"}</span>
              </>
            ) : (
              <span className="whitespace-normal text-center text-neutral-500">Klicka här eller dra och släpp en bild för att ladda upp</span>
            )}
          </div>

          {/* Remove image button */}
          {imagePreview && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
              aria-label="Ta bort bild"
            >
              Ta bort bild
            </Button>
          )}

          {/* Display validation errors */}
          {errors.image?.message && <FormErrorParagraph content={typeof errors.image.message === "string" ? errors.image.message : "Ogiltig fil"} />}
        </div>
      </section>
    </>
  );
}
