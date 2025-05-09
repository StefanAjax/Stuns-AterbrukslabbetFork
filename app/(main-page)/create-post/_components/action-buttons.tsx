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
    <section aria-labelledby="action-buttons-section" className="flex flex-col items-center gap-y-4">
      <div className="sr-only" id="action-buttons-section">
        Formuläråtgärder
      </div>
      <div className="md:hidden">
        <PostPreviewForMobile postData={postData} email={email} fullName={fullName} />
      </div>
      <div className="flex w-full justify-center gap-x-4" role="group" aria-label="Formulärknappar">
        <CancelFormAlertDialog />
        <CreatePostAlertDialog isSubmitting={isSubmitting} update={update} />
      </div>
    </section>
  );
}
