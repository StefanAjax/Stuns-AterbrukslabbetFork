"use client";

import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import deleteOwnPost from "@/utils/delete-own-post";
import type { Post } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import FormErrorParagraph from "../../create-post/_components/form-error-paragraph";

interface DeleteOwnPostButtonProps {
  postData: Post;
  redirectPath?: string;
}

type Inputs = {
  reason: string;
};

export default function DeleteOwnPostButton({ postData, redirectPath }: DeleteOwnPostButtonProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async (data: Inputs) => {
    setIsDeleting(true);
    const result = await deleteOwnPost({
      postData,
      deletionReason: data.reason,
    });
    setIsDeleting(false);
    setOpen(false);
    reset();

    if (result && result.error) {
      toast.error(result.error);
    } else if (result && result.data) {
      redirectPath && router.push(redirectPath);
      router.refresh();
      toast.success(`${postData.title} ${result.data}`);
    } else {
      toast.error("Något gick fel");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Ta bort annons</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Är du säker?</AlertDialogTitle>
          <AlertDialogDescription>
            Detta kommer <span className="font-bold">permanent</span> ta bort annonsen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onDelete)}>
          <div className="space-y-2 py-4">
            <h2 className="text-sm font-medium">Resulterade annonsen i en donation?</h2>
            <Controller
              name="reason"
              control={control}
              rules={{ required: "Välj ett alternativ" }}
              render={({ field: { onChange, value } }) => (
                <RadioGroup className="flex flex-col" value={value} onValueChange={(value) => onChange(value)}>
                  <div className="flex items-center gap-x-2">
                    <RadioGroupItem value="Lyckad" />
                    <h3>Ja</h3>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <RadioGroupItem value="Olyckad" />
                    <h3>Nej</h3>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.reason?.message && <FormErrorParagraph content={errors.reason.message} />}
          </div>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                reset();
              }}
              disabled={isDeleting}
              type="button"
            >
              Avbryt
            </Button>
            <Button variant="destructive" type="submit" disabled={isDeleting}>
              {isDeleting ? "Tar bort..." : "Ta bort"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
