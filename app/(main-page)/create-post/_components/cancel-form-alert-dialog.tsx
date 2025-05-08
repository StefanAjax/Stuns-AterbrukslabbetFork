"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function CancelFormAlertDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleCancel = () => {
    setIsNavigating(true);
    router.push("/");
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Avbryt</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Är du säker på att du vill avbryta?</AlertDialogTitle>
          <AlertDialogDescription>Om du avbryter nu kommer du att förlora alla ändringar.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isNavigating} type="button">
            Fortsätt redigera
          </Button>
          <Button variant="destructive" onClick={handleCancel} disabled={isNavigating}>
            {isNavigating ? "Avbryter..." : "Avbryt"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
