import { useFormContext } from "react-hook-form";
import CancelFormAlertDialog from "./cancel-form-alert-dialog";
import CreatePostAlertDialog from "./create-post-alert-dialog";
import PostPreviewForMobile from "./post-preview-for-mobile";
import { FormInputs } from "../_utils/form";

interface ActionButtonsProps {
  isSubmitting: boolean;
  update: boolean;
  postData: any;
  email: string;
  fullName: string;
}

export default function ActionButtons({ isSubmitting, update, postData, email, fullName }: ActionButtonsProps) {
  const { getValues } = useFormContext<FormInputs>();

  return (
    <div className="mt-5 flex flex-col items-center gap-y-4 md:flex-row md:justify-between">
      <div className="md:hidden">
        {/* Show only on mobile */}
        <PostPreviewForMobile postData={postData} email={email} fullName={fullName} />
      </div>
      <div className="flex w-full justify-center gap-x-2 md:w-auto md:justify-end md:gap-x-5">
        <CancelFormAlertDialog />
        <CreatePostAlertDialog isSubmitting={isSubmitting} update={update} />
      </div>
    </div>
  );
}
