/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.SITE_URL || "https://aterbrukslabbet.nu",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  additionalPaths: async () => {
    const staticRoutes = ["/", "/faq", "/about", "/terms-of-service"];

    return staticRoutes.map((route) => {
      return {
        loc: route,
        lastmod: new Date().toISOString(),
      };
    });
  },
};
