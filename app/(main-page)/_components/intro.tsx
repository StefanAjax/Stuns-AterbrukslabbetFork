import Link from "next/link";
import { cn } from "@/lib/utils";
import { source_sans_3, prompt } from "@/app/fonts";
import LayeredWaves from "@/components/layered-waves";

export default function Intro() {
  const isStaging = process.env.ENVIRONMENT === "staging";

  return (
    <>
      <section className="bg-emerald-500 py-8 text-center text-white md:py-10">
        <div className={cn("text-2xl font-semibold md:text-4xl", source_sans_3.className)}>Välkommen till</div>

        {isStaging ? (
          <div className="mx-auto max-w-3xl space-y-3 md:space-y-5">
            <div className="mt-2 rounded-lg bg-primary/25 py-3 text-2xl font-medium md:py-6 md:text-5xl">Staging</div>
            <p className={cn("px-4 text-sm md:text-xl", source_sans_3.className)}>
              Det här är en testversion av Återbrukslabbet. Om du vill besöka den riktiga sidan, gå till{" "}
              <Link className="text-blue-500 hover:underline" href="https://aterbrukslabbet.nu">
                aterbrukslabbet.nu
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className={cn("mt-2 text-3xl font-medium md:text-5xl", prompt.className)}>Återbrukslabbet</div>
        )}

        <div className={cn("mx-auto mt-4 max-w-3xl px-6 md:mt-6", source_sans_3.className)}>
          <p className="text-balance text-base md:text-2xl">
            Återbrukslabbet ger avställd labbutrustning nytt liv i skolan. Modern utrustning ökar undervisningens relevans, avlastar skolbudgetar, sparar planetens resurser och gör lärandet roligare.
          </p>
          <p className="mt-2 text-base md:text-2xl">Företag kan donera, lärare kan efterfråga. Välkommen till Återbrukslabbet!</p>
        </div>
      </section>

      <LayeredWaves variant="emeraldLight" className="-mt-[1px] max-h-[30rem] min-h-56 w-full" />
    </>
  );
}
