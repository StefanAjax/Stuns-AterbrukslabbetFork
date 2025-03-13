import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import deleteOwnPost from "@/utils/delete-own-post";
import type { Post } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import FormErrorParagraph from "../../create-post/_components/form-error-paragraph";

interface DeleteOwnPostButtonProps {
  postData: Post;
  redirectPath?: string;
}


export default function ReportPostButton({ postData, redirectPath }: DeleteOwnPostButtonProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();

  const onDelete = async (data: Inputs) => {
    const result = await deleteOwnPost({
      postData,
      deletionReason: data.reason,
    });
    if (result && result.error) {
      toast.error(result.error);
    } else if (result && result.data) {
      redirectPath && router.push(redirectPath);
      router.refresh();
      toast.success(postData.title + " " + result.data);
    } else {
      toast.error("Något gick fel");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-sm font-semibold text-destructive hover:opacity-80 md:text-base">Rapportera annons</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Är du säker?</AlertDialogTitle>
          <AlertDialogDescription>Ditt konto kommer att bli avstängt om du rapporterar en annons utan anledning.</AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onDelete)}>
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-base font-semibold">Anledning till rapportering</h2>
            <Controller
              name="reason"
              control={control}
              render={({ field: { onChange, value } }) => <TextField className="w-full" label="Anledning" value={value} onChange={onChange} placeholder="Anledning" />}
            />
            {errors.reason?.message && <FormErrorParagraph content={errors.reason.message} />}
          </div>
          <AlertDialogFooter className="pt-8">
            <AlertDialogCancel>Avbryt</AlertDialogCancel>
            <Button variant="destructive" type="submit">
              Rapportera
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}