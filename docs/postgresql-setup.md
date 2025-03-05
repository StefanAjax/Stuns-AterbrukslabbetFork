# PostgreSQL Setup

## Installing PostgreSQL Locally

> _**You can use another database provider if you so desire, but this documentation will cover a local database.**_

1.  Download [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).

1.  Run the installer.

1.  Press `Next >` on all prompts until you get to password.

1.  Enter your desired password but _**remember it**_.

1.  Continue pressing `Next > ` until the installation starts.

1.  Wait until the installation has completed.

1.  Uncheck the box for `Stack Builder` and press `Finnish >`

## Configuring Environment Variables

PostgreSQL requires two new variables for the `.env` file.

```sh
DATABASE_URL="postgres://USER:PASSWORD@HOST:PORT/DATABASE?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgres://USER:PASSWORD@HOST:PORT/DATABASE"
```

`USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` all have to be replaced by their respective value.

### Environment Variables Placeholder Values for Local Installation

> _**These instructions are only for local installations. You have to obtain the values yourself if you are using another database provider.**_

1. Replace `USER` with the value `postgres`.

1. Replace `PASSWORD` with the password you entered when you installed PostgreSQL earlier.

1. Replace `HOST` with `localhost`.

1. Replace `PORT` with `5432`.

1. Replace `DATABASE` with your desired name for the database. E.g. `aterbrukslabbet`.

---

[Back to Setup](./setup.md)
