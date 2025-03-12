"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import deleteUser from "@/utils/delete-user";

interface DeleteUserButtonProps {
  id: string;
  email: string;
  redirectPath?: string;
}

export default function DeleteUserButton({ id, email, redirectPath }: DeleteUserButtonProps) {
  const router = useRouter();
  const [comment, setComment] = useState("");

  const onDelete = async () => {
    const result = await deleteUser({ id, comment });
    setComment("");
    if (result && result.error) {
      toast.error(result.error);
    } else if (result && result.data) {
      redirectPath && router.push(redirectPath);
      router.refresh();
      toast.success(result.data + " Borttagen");
    } else {
      toast.error("Något gick fel");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="font-semibold text-destructive hover:opacity-80">Ta bort konto</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Är du säker?</AlertDialogTitle>
          <AlertDialogDescription>
            Detta kommer
            <span className="font-bold"> permanent</span> ta bort användaren
            <span className="break-all font-semibold"> {email} </span>
            och
            <span className="font-bold"> alla</span> deras annonser.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <input
            className="hidden w-full rounded-md p-2 sm:block"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onSubmit={(e) => e.preventDefault()}
            placeholder="Kommentar (frivilligt)"
          />
          <AlertDialogCancel>Avbryt</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onDelete}>
            Ta bort
          </AlertDialogAction>
          <input
            className="mb-2 block w-full rounded-md p-2 sm:hidden"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onSubmit={(e) => e.preventDefault()}
            placeholder="Kommentar (frivilligt)"
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
