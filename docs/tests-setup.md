# Testing & Github Actions setup

All testing for this project is recommended to be done through CI environments as it interacts with local databases. The repository already features the necessary Github Actions workflow to run the tests. All that needs to be done is to configure github's repository secrets.

1. Go to your repository on [github.com](https://github.com/).

1. Navigate to `Settings > Secrets and variables > Actions`.

## Testing

The following steps are required to configure repository secrets for testing:

1. Go to [dashboard.clerk.com](https://dashboard.clerk.com/).

1. Create a new application and configure it identically to your main one. Refer to [Clerk setup](./clerk-setup.md).

   - You can reuse the existing one but it is recommended to create a new one.

1. Navigate to `Configure > API Keys`.

1. Make sure `Next.js` is the chosen framework.

1. Note the public and secret keys.

1. On Github, enter the following two secrets into the repository:

   - The key `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` with the value of the public key you got from the previous step.
   - The key `CLERK_SECRET_KEY` with the value of the secret key you got from the previous step.

1. Create a user.

1. Press `Edit` under Public Metadata and enter the following:

   ```json
   {
     "role": "admin"
   }
   ```

1. On GitHub, enter the following two secrets into the repository:

   - The key `TESTING_ADMIN_EMAIL` with the value of the email for the account you created.
   - The key `TESTING_ADMIN_PASSWORD` with the value of the password for the account you created.

1. On Clerk, create a second user with the following Public Metadata:

   ```json
   {
     "role": "medlem"
   }
   ```

1. On GitHub, enter the following two secrets into the repository:

   - The key `TEST_REPORT_EMAIL` with the value of the email for the account you created.
   - The key `TEST_REPORT_PASSWORD` with the value of the password for the account you created.

1. Enter the following secret into the repository:

   - The key `DB_PASSWORD` with an arbitrarily decided value.

1. Follow the [Resend Setup Documentation](./resend-setup.md) and enter the following two secrets into the repository:

   - The key `RESEND_API_KEY` with the value of the API-key you got from the setup.
   - The key `RESEND_SENDING_MAIL` with the value of the E-mail address you chose during the setup.

## Automatic Development deployment

If you want to use the workflow to automatically deploy to a development/staging server the following secrets need to be entered into the repository: - The key `DEV_SERVER_HOST` with the value of the server's IP address. - The key `DEV_SERVER_PORT` with the value of the SSH port. - The key `DEV_SERVER_USERNAME` with the value of the username you login as when connecting to the server. - The key `DEV_SERVER_PASSWORD` with the value of the corresponding password for the username previously entered.
