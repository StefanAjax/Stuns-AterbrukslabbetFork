"use client";

import { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

import PostComponent from "../../post/_components/post-component";
import UserInfoSection from "./user-info-section";
import PostTypeSection from "./post-type-section";
import TitleSection from "./title-section";
import DescriptionSection from "./description-section";
import ImageUploadSection from "./image-upload-section";
import CategorySection from "./category-section";
import LocationDateSection from "./location-date-section";
import ActionButtons from "./action-buttons";
import { FormInputs, usePostFormSubmit, useImageUpload } from "../_utils/form";

export interface CreatePostComponentProps {
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

export default function CreatePostComponent(props: CreatePostComponentProps) {
  const { firstName, lastName, email, userId, title, description, postType, category, municipality, date, customExpirationDate, update, postId, imageUrl, imageNameParameter } = props;

  const fullName = `${firstName} ${lastName}`;

  // Initialize form with default values
  const methods = useForm<FormInputs>({
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

  // Get form submission handler
  const { handleFormSubmit, isSubmitting } = usePostFormSubmit(update, postId);

  // Watch form data for preview
  const formData = useWatch({ control: methods.control });

  // Access image information for preview
  const { imagePreview, imageName } = useImageUpload(imageUrl, imageNameParameter);

  // Create post data for preview
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

  return (
    <div className="relative mx-auto mt-10 flex max-w-screen-xl flex-wrap justify-center gap-x-20 gap-y-3 md:gap-y-6">
      {/* Form Area */}
      <div className="h-fit w-[360px] rounded-2xl border border-border bg-card p-3 md:w-[600px] md:p-6">
        <FormProvider {...methods}>
          <form id="create-post-form" className="flex flex-col gap-y-5" onSubmit={methods.handleSubmit(handleFormSubmit)} noValidate>
            <h1 className="text-center text-xl md:text-3xl">{update ? "Uppdatera annons" : "Skapa ny annons"}</h1>

            <PostTypeSection />
            <UserInfoSection />
            <TitleSection />
            <DescriptionSection />
            <ImageUploadSection imageUrl={imageUrl} imageNameParameter={imageNameParameter} />
            <CategorySection />
            <LocationDateSection />
            <ActionButtons isSubmitting={isSubmitting} update={update} postData={postData} email={email} fullName={fullName} />
          </form>
        </FormProvider>
      </div>

      {/* Preview Area (Desktop) */}
      <div className="hidden w-[600px] md:block">
        <PostComponent postData={postData} email={email} fullName={fullName} isPreview={true} />
      </div>
    </div>
  );
}
