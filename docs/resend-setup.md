# Resend Setup

1.  Set up a domain and verify it. For help check out the [documentation](https://resend.com/docs/dashboard/domains/introduction).

1.  Navigate to `API Keys`.

1.  Press `Create API Key`.

1.  Under `Name` fill in `RESEND_API_KEY`.

1.  Press `Add`.

1.  Make sure to copy the API key.

1.  In your `.env` file add a new field with the value of your api key

    ```sh
    RESEND_API_KEY=API key
    ```

1.  Add another field to your `.env` file where the value is the E-mail address that you want to use when the program sends out E-mails. _**Note that it has to end in the domain you verified earlier.**_ E.g. `notifications@aterbrukslabbet.nu`.

    ```sh
    RESEND_SENDING_MAIL=Your email address
    ```

---

[Back to Setup](./setup.md)
