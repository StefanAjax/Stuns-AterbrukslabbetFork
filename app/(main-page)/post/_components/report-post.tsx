"use client";

import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Post } from "@prisma/client";
import { useUser } from "@clerk/nextjs";

import FormErrorParagraph from "../../create-post/_components/form-error-paragraph";
import reportPost from "@/utils/report-post";

interface ReportPostButtonProps {
  postData: Post;
}

type Inputs = {
  reason: string;
};

export default function ReportPostButton({ postData }: ReportPostButtonProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const { user } = useUser();

  const onReport = async (data: Inputs) => {
    if (!user) {
      return {
        error: "Något gick fel",
      };
    }

    const result = await reportPost({
      postData,
      reportReason: data.reason || undefined,
      userId: user.id,
    });
    router.refresh();
    if (result && result.error) {
      toast.error(result.error);
    } else if (result && result.data) {
      toast.success(result.data);
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
        <form onSubmit={handleSubmit(onReport)}>
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-base font-semibold">Anledning till rapporteringen</h2>
            <Controller name="reason" control={control} render={({ field: { onChange, value } }) => <Textarea className="w-full" value={value} onChange={onChange} placeholder="Anledning" />} />
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
