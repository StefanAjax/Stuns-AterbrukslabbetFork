# Command List

Here is a full list of commands and what they do:

| Command          | Explanation                                                                                                                                                                                              | When to Use                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `dev`            | Runs multiple development processes concurrently: watches Prisma schema changes, starts Prisma Studio, launches Next.js in dev mode, and runs the email dev server.                                      | Use this command during development when you need to run all related services at the same time.                      |
| `build`          | Performs a series of tasks: installs production dependencies, cleans old build files, builds the Next.js application, generates the Prisma client, deploys database migrations, and generates a sitemap. | Use when preparing your application for production deployment to ensure a complete and optimized build process.      |
| `start`          | Starts the Next.js production server.                                                                                                                                                                    | Use this command to run your already built production application.                                                   |
| `launch`         | Combines the build and start processes: first builds the project and then starts the production server.                                                                                                  | Use for a one-command deployment of your production application.                                                     |
| `format:write`   | Automatically formats your code using Prettier, fixes linting issues with Next.js linting, and formats your Prisma schema.                                                                               | Use this command to auto-correct and format your code before commits.                                                |
| `format:check`   | Checks if your code adheres to formatting standards defined by Prettier, Next.js linting, and Prisma formatting.                                                                                         | Use to verify that your code meets the project's formatting standards before committing changes or during CI checks. |
| `db:migrate:dev` | Creates and applies migrations based on your Prisma schema.                                                                                                                                              | Use this after making changes to the schematic.                                                                      |
| `postinstall`    | Automatically generates the Prisma client after package installation.                                                                                                                                    | _**There is no need to run this.**_ <br/><br/> This runs automatically after installing dependencies.                |

---

[Back to README](../README.md)
