const staticRoutes = ["/", "/faq", "/about", "/terms-of-service"];

/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.SITE_URL || "https://aterbrukslabbet.nu",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: staticRoutes,
      },
    ],
  },
  additionalPaths: async () => {
    return staticRoutes.map((route) => {
      return {
        loc: route,
        lastmod: new Date().toISOString(),
      };
    });
  },
};
