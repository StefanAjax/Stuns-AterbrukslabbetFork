import { cn } from "@/lib/utils";
import { source_sans_3, prompt } from "@/app/fonts";
import LayeredWaves from "../../../components/layered-waves";
import Logo from "../../../components/logo";
export default function Intro() {
  return (
    <>
      <div className="flex flex-col bg-emerald-500 py-10 text-center text-white">
        <div className={cn("text-3xl font-semibold md:text-5xl", source_sans_3.className)}>Välkommen till</div>
        <div className={cn("text-4xl font-medium md:text-6xl", prompt.className)}>Återbrukslabbet</div>
        <div className={cn("mt-2 text-balance px-20 py-3 md:mt-5 md:text-3xl", source_sans_3.className)}>
          <p>
            Återbrukslabbet ger avställd labbutrustning nytt liv i skolan. Modern utrustning ökar undervisningens relevans, avlastar skolbudgetar, sparar planetens resurser och gör lärandet roligare.
          </p>
          <p>Företag kan donera, lärare kan efterfråga. Välkommen till Återbrukslabbet!</p>
        </div>
      </div>
      <LayeredWaves variant="emeraldLight" className="max-h-[30rem] min-h-56 w-full" />
      <div>
        <Logo variant="azure" />

        <Logo layout="row" showSlogan variant="dark" />

        <Logo showSlogan />

        <Logo showSlogan layout="row" variant="salmon" />
      </div>
    </>
  );
}
