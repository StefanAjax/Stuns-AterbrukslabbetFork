# Återbrukslabbet

The webpage for Återbrukslabbet can be found at [aterbrukslabbet.nu](https://aterbrukslabbet.nu).

## Development Documents

- [Setup](docs/setup.md)
- [Development Environment](docs/environments-languages.md)
- [Licenses](docs/licenses.md)
- [Command List](docs/command-list.md)

## Running the project

### Running in development mode

Run the following in a terminal to run the project in development mode:

```bash
pnpm dev
```

This opens the following ports:

- [localhost:3000](http://localhost:3000) for accessing the web page.
- [localhost:4000](http://localhost:4000) for accessing Prisma Studio.
- [localhost:5000](http://localhost:5000) for accessing React Mail templates.

### Running in production mode

1.  Run the following in a terminal to create a production build of the project:

    ```bash
    pnpm build
    ```

1.  Run the following to start the production server:

    ```bash
    pnpm start
    ```

Alternatively, run the following to do both in a single command:

```bash
pnpm launch
```

## Backlog

A backlog of features can be found at [axelNTI/Projects/Återbrukslabbet](https://github.com/users/axelNTI/projects/2/views/1).

## Fonts

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load fonts from Google Fonts.

---

> Developed by Simon Clavensjö, Lukas Gustafsson, Mohamad Hamdan, Ambjörn Hogmark, Axel Thornberg, Tim Kelso, David Cavalli-Björkman, and Eskil Tornberg.
