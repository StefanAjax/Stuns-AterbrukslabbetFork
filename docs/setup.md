# Setup

## Installing External Dependencies

1.  Download and install [Node.js](https://nodejs.org/en/download).
1.  Install pnpm by running the following in a terminal:

    ```bash
    npm i -g pnpm
    ```

## Project setup

1.  Clone the repository by running the following:

    ```bash
    git clone https://github.com/NTIG-Uppsala/Stuns-Aterbrukslabbet.git
    ```

1.  Navigate to the directory by running the following:

    ```bash
    cd Stuns-Aterbrukslabbet/
    ```

1.  Install dependencies by running the following:

    ```bash
    pnpm i
    ```

1.  Create a `.env` file in the root of the project and paste in the following:

```sh
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

## Configuring Dependencies

- [Clerk](./clerk-setup.md)
- [PostgreSQL](./postgresql-setup.md)
- [Resend](./resend-setup.md)
- [Next.js](./next-setup.md)
- [Testing & GitHub Actions](./tests-setup.md)

## Other Configurations

- [Automatic E-mails](./automatic-emails.md)

---

[Back to README](../README.md)
