"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface CreatePostAlertDialogProps {
  isSubmitting?: boolean;
  update: boolean;
}

export default function CreatePostAlertDialog({ isSubmitting, update }: CreatePostAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="rounded-sm bg-primary px-3 py-1 text-sm md:px-4 md:text-base">{update ? "Uppdatera" : "Skapa"}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-center">{update ? "Uppdatera annons?" : "Skapa annons?"}</AlertDialogTitle>
          <h1 className="text-pretty text-center text-sm md:text-base">När du skänker eller tar emot begagnad utrustning, tänk på följande</h1>
          <div className="flex list-disc flex-col items-center gap-y-2 text-pretty text-center text-xs md:px-5 md:text-sm">
            <hr />
            <p>Säkerställ så att utrustningen är i gott skick och fungerar korrekt. Defekt utrustning kan utgöra en säkerhetsrisk för användaren.</p>
            <hr className="w-4/5" />
            <p>Viss utrustning kan behöva regelbundet underhåll för att fortsätta fungera korrekt och säkert. Regelbundna kalibreringar kan vara nödvändiga.</p>
            <hr className="w-4/5" />
            <p>
              Säkerställ så att utrustning och material rengjorts från hälsovådliga ämnen, kemikalier och biologiskt material som utrustningen tidigare varit i kontakt med. Tänk särskilt på att
              utrustning som använts i forskning kan ha kontaminerats med ämnen vars hälsorisker ännu inte är kända.
            </p>
            <hr className="w-4/5" />
            <p>
              Vid nyttjande av begagnad utrustning är det användaren som bär ansvar för den egna säkerheten. Återbrukslabbet förmedlar endast kontakt mellan den som skänker, respektive tar emot
              utrustning och bär därför inget ansvar för utrustningens skick eller säkerhet.
            </p>
            <hr className="w-4/5" />
            <p>
              Säkerställ så att eventuella bilder inte innehåller känslig information eller uppgifter som kan identifiera enskilda personer. Om så är fallet, se till att sudda ut eller ta bort dessa
              uppgifter innan du publicerar annonsen.
            </p>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Fortsätt redigera</AlertDialogCancel>
          <AlertDialogAction disabled={isSubmitting} form="create-post-form" type="submit">
            {update ? "Uppdatera annons" : "Skapa annons"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
