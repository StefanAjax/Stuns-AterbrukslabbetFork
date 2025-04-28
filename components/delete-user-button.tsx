"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import deleteUser from "@/utils/delete-user";
import { useDeleteHandler } from "@/hooks/useDeleteHandler";

interface DeleteUserButtonProps {
  id: string;
  email: string;
  redirectPath?: string;
}

export default function DeleteUserButton({ id, email, redirectPath }: DeleteUserButtonProps) {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  const { handleDelete, isLoading } = useDeleteHandler(
    async () => {
      const result = await deleteUser({ id, comment });
      if (result?.error) throw { message: result.error };
      return result;
    },
    () => {
      setOpen(false);
      setComment("");
      redirectPath && router.push(redirectPath);
      router.refresh();
      toast.success(`Användare borttagen`);
    },
    (error) => toast.error(error.message || "Något gick fel"),
  );

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
          Ta bort konto
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Är du säker?</AlertDialogTitle>
          <AlertDialogDescription>
            Detta kommer <span className="font-bold">permanent</span> ta bort användaren
            <span className="break-all font-semibold"> {email} </span>
            och <span className="font-bold">alla</span> deras annonser.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-2 py-4">
          <Label htmlFor="comment">Kommentar (frivilligt)</Label>
          <Input id="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Anledning till borttagning..." />
        </div>

        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
            Avbryt
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Tar bort..." : "Ta bort"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
