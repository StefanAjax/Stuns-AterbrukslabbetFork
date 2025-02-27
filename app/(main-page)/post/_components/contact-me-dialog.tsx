"use client";

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";

interface ContactMeDialogProps {
  fullName: string;
  email: string;
  disabled?: boolean;
}

export default function ContactMeDialog({ fullName, email, disabled }: ContactMeDialogProps) {
  return (
    <Dialog>
      <DialogTrigger disabled={disabled}>
        <div className="flex h-8 w-32 items-center justify-center rounded-lg bg-primary text-base md:h-10 md:w-40 md:text-xl">Kontakta mig</div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <h1 className="text-pretty text-center text-sm md:text-lg">När du skänker eller tar emot begagnad utrustning, tänk på följande</h1>
          <div className="flex list-disc flex-col items-center gap-y-2 text-balance text-center text-xs md:px-5 md:text-sm">
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
          </div>
          <p className="line-clamp-1 break-all pt-2 text-center text-lg md:pt-6">{fullName}</p>
          <a className="mx-auto line-clamp-2 w-fit break-all text-center text-blue-600 hover:underline" href={`mailto:${email}`}>
            {email}
          </a>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
