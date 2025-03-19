import Image from "next/image";

import { cn } from "@/lib/utils";
import { source_sans_3, prompt } from "@/app/fonts";
import LayeredWaves from "./layered-waves";
import ThemedLogo from "./logo";

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
      <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3">
        <div className="flex flex-col items-center">
          <ThemedLogo variant="default" />
          <p className="mt-2">Default</p>
        </div>
        <div className="flex flex-col items-center rounded bg-gray-800 p-4">
          <ThemedLogo variant="light" />
          <p className="mt-2 text-white">Light</p>
        </div>
        <div className="flex flex-col items-center rounded bg-gray-100 p-4">
          <ThemedLogo variant="dark" />
          <p className="mt-2">Dark</p>
        </div>
        <div className="flex flex-col items-center rounded p-4">
          <ThemedLogo variant="emerald" />
          <p className="mt-2">Emerald</p>
        </div>
        <div className="flex flex-col items-center rounded p-4">
          <ThemedLogo variant="azure" />
          <p className="mt-2">Azure</p>
        </div>
        <div className="flex flex-col items-center rounded p-4">
          <ThemedLogo variant="salmon" />
          <p className="mt-2">Salmon</p>
        </div>
        <div className="flex flex-col items-center rounded p-4">
          <ThemedLogo variant="custom" customColor="#d911b1" />
          <p className="mt-2">Custom</p>
        </div>
      </div>
    </>
  );
}
