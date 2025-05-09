import { Inter, Prompt, Source_Sans_3, Jura } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
});

export const prompt = Prompt({
  subsets: ["latin"],
  weight: ["500"],
});

export const source_sans_3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const jura = Jura({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
