# Clerk Setup

## Configuring Clerk

1.  Create or login to a [clerk account](https://dashboard.clerk.com/).

1.  Click on `Create application`.

1.  Enter a name into the `Application name` field. E.g. `Återbrukslabbet`.

1.  Under `Sign in options` choose `Email` and `Google`.

1.  Go to the `Configure` tab in the top left.

1.  Go to the `Email, phone, username` tab in the sidebar.

1.  Under the `Personal information` field, enable `Name`.

1.  Go to the `Sessions` tab in the sidebar.

1.  Under the `Customize session token` press the `Edit` button and enter:

    ```json
    {
      "metadata": "{{user.public_metadata}}"
    }
    ```

1.  Press `Save`.

1.  Go to the `API keys` tab in the sidebar.

1.  If you are setting up Clerk for a production server, follow [Creating a Production Instance](#creating-a-production-instance) before continuing.

1.  Make sure that the correct instance is shown in the top bar. E.g if you are configuring a production instance it should say `Production` and vice versa.

1.  Enter the key under `Publishable key` into the `.env` file as `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and the key under `Secret keys` as `CLERK_SECRET_KEY`.

1.  The `.env` file should now contain two new entries, like this:

    ```sh
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<Publishable key>
    CLERK_SECRET_KEY=<Secret key>
    ```

## Creating a Production Instance

1.  Go to your [dashboard on clerk](https://dashboard.clerk.com/).

1.  In the top left press on `Development` and then `Create production instance`.

1.  Make sure `Clone development instance` is selected and then press `Continue`.

1.  Enter your url. E.g. `aterbrukslabbet.nu`.

1.  Press `Create instance`.

1.  Follow Clerk's documentation on [configuring Google for your production instance](https://clerk.com/docs/authentication/social-connections/google#configure-for-your-production-instance).

## Configuring Webhooks

_**Webhooks require a public IP address to work. This limits the projects functionality in development environments. [Read more here](./webhook-limitations.md).**_

1.  Go to your [dashboard on clerk](https://dashboard.clerk.com/).

1.  Go to the `Configure` tab in the top left.

1.  Go to the `Webhooks` tab in the sidebar.

1.  Press `Add Endpoint`.

1.  Under `Endpoint URL` enter your url + `/api/webhooks`. E.g. `https://aterbrukslabbet.nu/api/webhooks`.

1.  Under `Subscribe to events` select `session.created`, `user.created`, and `user.deleted`.

1.  Press `Create`.

1.  Copy the `Signing Secret` into the `.env` file as `WEBHOOK_SECRET`.

1.  The `.env` file should now contain a new entry, like this:

    ```sh
    WEBHOOK_SECRET=<Signing Secret>
    ```

---

[Back to Setup](./setup.md)
