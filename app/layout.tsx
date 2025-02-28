import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { inter } from "@/app/fonts";
import { svSE } from "@clerk/localizations";

import "./globals.css";

const description: string =
  "Återbrukslabbet ger avställd labbutrustning nytt liv i skolan. Modern utrustning ökar undervisningens relevans, avlastar skolbudgetar, sparar planetens resurser och gör lärandet roligare. Företag har möjlighet att donera utrustning, inventarier och förbrukningsmaterial som de själva inte längre har nytta av. Lärare har möjlighet att efterfråga sådant som de behöver för att bedriva inspirerande och kvalitativ undervisning.";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://aterbrukslabbet.nu/",
  },
  authors: [
    {
      name: "Simon Clavensjö",
      url: "https://simon.clavensjo.se/",
    },
    {
      name: "Lukas Gustafsson",
      url: "https://lukasgurra.github.io/",
    },
    {
      name: "Mohamad Hamdan",
      url: "https://mohamadhamdan13.github.io/",
    },
    {
      name: "Ambjörn Hogmark",
      url: "https://ambjorn-hogmark.github.io/",
    },
    {
      name: "Axel Thornberg",
      url: "https://axel.thornberg.se/",
    },
    {
      name: "Eskil Tornberg",
      url: "https://github.com/EskilNTI",
    },
    {
      name: "Tim Kelso",
      url: "https://timkelso.github.io/",
    },
  ],
  creator: "STUNS Life science",
  description: description,
  generator: "Next.js",
  icons: {
    icon: [
      {
        url: "/favicons/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  },
  keywords: ["återbrukslabbet", "aterbrukslabbet", "återbrukslabb", "aterbrukslabb"],
  openGraph: {
    type: "website",
    title: "Återbrukslabbet",
    url: "https://aterbrukslabbet.nu/",
    images: [
      {
        url: "https://aterbrukslabbet.nu/favicons/favicon.ico",
      },
    ],
    description: description,
    determiner: "",
    locale: "sv_SE",
  },
  publisher: "STUNS Life science",
  title: "Återbrukslabbet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  svSE.footerPageLink__terms = "Genom att använda denna webbplats godkänner du våra användarvillkor och integritetspolicy.";
  return (
    <ClerkProvider localization={svSE}>
      <html lang="en">
        <body className={cn("bg-background", inter.className)}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
