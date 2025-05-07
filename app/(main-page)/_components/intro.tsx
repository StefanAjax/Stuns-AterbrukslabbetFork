import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { source_sans_3, prompt } from "@/app/fonts";
import LayeredWaves from "../../../components/layered-waves";
import Logo from "../../../components/logo";
export default function Intro() {
  return (
    <>
      <div className="flex flex-col bg-emerald-500 py-10 text-center text-white">
        <div className={cn("text-3xl font-semibold md:text-5xl", source_sans_3.className)}>Välkommen till</div>
        {process.env.ENVIRONMENT === "staging" ? (
          // Displays a message indicating that the user is on the staging website, and provides a link to the production website.
          <>
            <div className="rounded-lg bg-primary bg-opacity-25 px-6 py-4 text-3xl font-medium md:px-12 md:py-8 md:text-6xl">Staging</div>
            <div className="text-balance px-4 pt-4 text-center text-sm font-light md:px-16 md:pt-8 md:text-3xl">
              Det här är en testversion av Återbrukslabbet. Om du vill besöka den riktiga sidan, gå till{" "}
              <Link className="text-blue-500" href="https://aterbrukslabbet.nu">
                aterbrukslabbet.nu
              </Link>
              .
            </div>
          </>
        ) : (
          <div className={cn("text-4xl font-medium md:text-6xl", prompt.className)}>Återbrukslabbet</div>
        )}
        <div className={cn("mt-2 text-balance px-20 py-3 md:mt-5 md:text-3xl", source_sans_3.className)}>
          <p>
            Återbrukslabbet ger avställd labbutrustning nytt liv i skolan. Modern utrustning ökar undervisningens relevans, avlastar skolbudgetar, sparar planetens resurser och gör lärandet roligare.
          </p>
          <p>Företag kan donera, lärare kan efterfråga. Välkommen till Återbrukslabbet!</p>
        </div>
      </div>
      <LayeredWaves variant="emeraldLight" className="-mt-[1px] max-h-[30rem] min-h-56 w-full" />
    </>
  );
}
