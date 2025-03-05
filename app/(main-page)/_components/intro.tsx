import Image from "next/image";

import { cn } from "@/lib/utils";
import { source_sans_3, prompt } from "@/app/fonts";
import layeredWaves from "@/public/images/layered-waves/emerald-light.svg";

export default function Intro() {
  return (
    <>
      <div className="flex flex-col items-center bg-emerald-500 py-10 text-white">
        <div className={cn("text-3xl font-semibold md:text-5xl", source_sans_3.className)}>Välkommen till</div>
        <div className={cn("text-4xl font-medium md:text-6xl", prompt.className)}>Återbrukslabbet</div>
        <div className={cn("text-balance py-3 px-20 text-center md:text-3xl mt-2 md:mt-5", source_sans_3.className)}>
          <p>
            Återbrukslabbet ger avställd labbutrustning nytt liv i skolan. Modern utrustning ökar undervisningens relevans, avlastar skolbudgetar, sparar planetens resurser och gör lärandet roligare.
          </p>
          <p>Företag kan donera, lärare kan efterfråga. Välkommen till Återbrukslabbet!</p>
        </div>
      </div>
      <Image src={layeredWaves} alt="" draggable="false" className="w-full" />
    </>
  );
}
