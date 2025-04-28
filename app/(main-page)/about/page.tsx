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
      <div className="flex flex-col gap-y-3">
        <h2 className="text-xl font-semibold">Utvecklare våren 2024:</h2>
        <div>
          <span className="font-semibold">Simon Clavensjö</span>,{" "}
          <a className="text-blue-600 hover:underline" href="https://www.linkedin.com/in/simon-clavensj%C3%B6-a6059021b/">
            LinkedIn
          </a>
          ,{" "}
          <a className="text-blue-600 hover:underline" href="https://github.com/SimonClavensjo">
            Github
          </a>
          ,{" "}
          <a className="text-blue-600 hover:underline" href="https://simon.clavensjo.se/">
            portfolio
          </a>
        </div>
        <div>
          <span className="font-semibold">Lukas Gustafsson</span>,{" "}
          <a className="text-blue-600 hover:underline" href="https://www.linkedin.com/in/lukas-gustafsson-b4296b293/">
            LinkedIn
          </a>
          ,{" "}
          <a className="text-blue-600 hover:underline" href="https://github.com/lukasgurra">
            Github
          </a>
          ,{" "}
          <a className="text-blue-600 hover:underline" href="https://lukasgurra.github.io/">
            portfolio
          </a>
          <p>Planerar att utbilda sig till danslärare eller teknik- och mattelärare. Intresserad av frontend-utveckling och design av spel och hemsidor.</p>
        </div>
        <div>
          <span className="font-semibold">Mohamad Hamdan</span>,{" "}
          <a className="text-blue-600 hover:underline" href="https://www.linkedin.com/in/mohamad-hamdan-874670297/">
            LinkedIn
          </a>
          ,{" "}
          <a className="text-blue-600 hover:underline" href="https://mohamadhamdan13.github.io/">
            portfolio
          </a>
          <p>Jobbar på Nordic Wellness och inleder studier inom systemvetenskap hösten 2025.</p>
        </div>
        <div>
          <span className="font-semibold">Ambjörn Hogmark</span>,{" "}
          <a className="text-blue-600 hover:underline" href="https://www.linkedin.com/in/ambj%C3%B6rn-hogmark-a86801293/">
            LinkedIn
          </a>
          ,{" "}
          <a className="text-blue-600 hover:underline" href="https://ambjorn-hogmark.github.io/">
            portfolio
          </a>
          <p>Studerar till civilingenjör på KTH.</p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-y-3">
        <h2 className="text-xl font-semibold">Utvecklare våren 2025:</h2>
        <div>
          <span className="font-semibold">David Cavalli-Björkman</span>,{" "}
          <a className="text-blue-600 hover:underline" href="https://www.linkedin.com/in/david-cavalli-bj%C3%B6rkman/">
            LinkedIn
          </a>
          ,{" "}
          <a className="text-blue-600 hover:underline" href="https://davidcavallib.github.io/">
            portfolio
          </a>
        </div>
        <div>
          <span className="font-semibold">Tim Kelso</span>,{" "}
          <a className="text-blue-600 hover:underline" href="https://linkedin.com/in/kelsotim/">
            LinkedIn
          </a>
          ,{" "}
          <a className="text-blue-600 hover:underline" href="https://github.com/TimKelso">
            Github
          </a>
          ,{" "}
          <a className="text-blue-600 hover:underline" href="https://timkelso.github.io/">
            portfolio
          </a>
        </div>
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
