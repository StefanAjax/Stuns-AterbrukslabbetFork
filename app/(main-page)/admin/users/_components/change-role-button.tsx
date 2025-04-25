"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { Roles } from "@/types/globals";

import changeRole from "../_utils/change-role";

interface ChangeRoleButtonProps {
  id: string;
  email: string;
  newRole: Roles;
  currentRole?: string;
}

export default function ChangeRoleButton({ id, email, newRole, currentRole }: ChangeRoleButtonProps) {
  const router = useRouter();
  const [isChanging, setIsChanging] = useState(false);
  const [open, setOpen] = useState(false);

  const onChangeRole = async () => {
    setIsChanging(true);
    const result = await changeRole({ id, newRole });
    setIsChanging(false);
    setOpen(false);

    if (result && result.error) {
      toast.error(result.error);
    } else if (result && result.data) {
      router.refresh();
      toast.success(`Roll ändrad för ${result.data}`);
    } else {
      toast.error("Något gick fel");
    }
  };

  const getButtonLabel = () => {
    if (newRole === "medlem") {
      return "Ta bort moderator";
    } else if (newRole === "moderator") {
      return "Gör till moderator";
    }
    return "Ändra roll";
  };

  const getDialogDescription = () => {
    if (newRole === "medlem") {
      return (
        <>
          Detta kommer ta bort moderator rollen från
          <span className="break-all font-semibold"> {email}</span>
        </>
      );
    } else if (newRole === "moderator") {
      return (
        <>
          Detta kommer att göra <span className="break-all font-semibold">{email}</span> till moderator.
          <br />
          Moderatorer har tillgång till fler funktioner så som att ta bort annonser och användare.
        </>
      );
    }
    return "Kunde inte generera beskrivning.";
  };

  if (currentRole === newRole) return null;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className={newRole === "medlem" ? "text-destructive hover:bg-destructive/10 hover:text-destructive" : "text-accent-foreground hover:bg-accent/10"}>
          {getButtonLabel()}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Är du säker?</AlertDialogTitle>
          <AlertDialogDescription>{getDialogDescription()}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isChanging}>
            Avbryt
          </Button>
          <Button variant={newRole === "medlem" ? "destructive" : "default"} onClick={onChangeRole} disabled={isChanging}>
            {isChanging ? "Ändrar..." : newRole === "medlem" ? "Ta bort moderator" : "Gör moderator"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
