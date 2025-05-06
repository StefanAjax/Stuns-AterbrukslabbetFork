import DeveloperProfile from "./_components/developer-profile";

export default function AboutPage() {
  return (
    <div className="mx-auto mt-12 flex w-[85ch] max-w-full flex-col bg-secondary px-6 py-8 md:mt-16 md:rounded-md">
      <h1 className="mb-4 text-lg font-semibold md:text-2xl">Om Återbrukslabbet</h1>
      <p className="mb-6">
        Återbrukslabbet ger avställd labbutrustning nytt liv i skolan. Modern utrustning ökar undervisningens relevans, avlastar skolbudgetar, sparar planetens resurser och gör lärandet roligare.
        Företag har möjlighet att donera utrustning, inventarier och förbrukningsmaterial som de själva inte längre har nytta av. Lärare har möjlighet att efterfråga sådant som de behöver för att
        bedriva inspirerande och kvalitativ undervisning.
      </p>
      <p className="mb-6">
        Återbrukslabbet utvecklas i samarbete mellan STUNS (Stiftelsen för samverkan mellan universiteten i Uppsala, näringslivet och samhället) och elever som läser till gymnasieingenjör med
        inriktning mot mjukvarudesign på NTI Gymnasiet i Uppsala. All kodning utförs under 10 veckors praktikperiod varje vår.
      </p>
      <p className="mb-6">
        Den första etappen genomfördes 2024. Under våren 2025 utvecklar ett nytt team nya funktioner, samt genomför underhåll av de befintliga. Samtidigt testas Återbrukslabbet av skolor och företag i
        Uppsala med omnejd.
      </p>
      <div className="mb-8 flex flex-col gap-y-6">
        <h2 className="text-xl font-semibold">Utvecklare våren 2024:</h2>
        <DeveloperProfile
          name="Simon Clavensjö"
          linkedInUrl="https://www.linkedin.com/in/simon-clavensj%C3%B6-a6059021b/"
          githubUrl="https://github.com/SimonClavensjo"
          portfolioUrl="https://simon.clavensjo.se/"
        />
        <DeveloperProfile
          name="Lukas Gustafsson"
          linkedInUrl="https://www.linkedin.com/in/lukas-gustafsson-b4296b293/"
          githubUrl="https://github.com/lukasgurra"
          portfolioUrl="https://lukasgurra.github.io/"
          bio="Planerar att utbilda sig till danslärare eller teknik- och mattelärare. Intresserad av frontend-utveckling och design av spel och hemsidor."
        />
        <DeveloperProfile
          name="Mohamad Hamdan"
          linkedInUrl="https://www.linkedin.com/in/mohamad-hamdan-874670297/"
          portfolioUrl="https://mohamadhamdan13.github.io/"
          bio="Jobbar på Nordic Wellness och inleder studier inom systemvetenskap hösten 2025."
        />
        <DeveloperProfile
          name="Ambjörn Hogmark"
          linkedInUrl="https://www.linkedin.com/in/ambj%C3%B6rn-hogmark-a86801293/"
          portfolioUrl="https://ambjorn-hogmark.github.io/"
          bio="Studerar till civilingenjör på KTH."
        />
      </div>

      <div className="mb-8 flex flex-col gap-y-6">
        <h2 className="text-xl font-semibold">Utvecklare våren 2025:</h2>
        <DeveloperProfile name="David Cavalli-Björkman" linkedInUrl="https://www.linkedin.com/in/david-cavalli-bj%C3%B6rkman/" portfolioUrl="https://davidcavallib.github.io/" />
        <DeveloperProfile name="Tim Kelso" linkedInUrl="https://linkedin.com/in/kelsotim/" githubUrl="https://github.com/TimKelso" portfolioUrl="https://timkelso.github.io/" />
        <DeveloperProfile
          name="Axel Thornberg"
          linkedInUrl="https://www.linkedin.com/in/axel-thornberg-618a41332/"
          githubUrl="https://github.com/axelNTI"
          portfolioUrl="https://axel.thornberg.se/"
          bio="Kommer att studera datavetenskap på Uppsala Universitet från hösten 2025."
        />
        <DeveloperProfile
          name ="Eskil Tornberg"
          linkedInUrl="https://www.linkedin.com/in/eskil-tornberg-243977363/"
          githubUrl="https://github.com/EskilNTI"
          bio="Planerar att studera datavetenskap på Uppsala Universitet från hösten 2025."
        />
      </div>
      <p className="mt-6">
        Om du har frågor, eller vill ge feedback på verktyget, vänligen skriv en rad till{" "}
        <a className="text-blue-600 hover:underline" href="mailto:erik.allard@stuns.se">
          erik.allard@stuns.se
        </a>
      </p>
    </div>
  );
}
