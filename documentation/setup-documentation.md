# Setup

## Clone Github Repository

Run the following command in the CLI to clone down the repository

```bash
git clone https://github.com/NTIG-Uppsala/Stuns-Aterbrukslabbet.git
```

## Download Node.js and necessary packages

Download Node.js at this [link](https://nodejs.org/en/download)

For this project we use Node.js version 20.11.0

Run the following command in the CLI to get the necessary packages from the node package manager.

```bash
npm install
```

## Set up Clerk authentication

### Creating a clerk application

- Go to the [clerk website]("https://clerk.com/") and create an account and a clerk application if you do not already have one you wish to use.

- When creating a clerk application you will need to choose which sign in options that can be used to access your application. This project uses Google, Linkedin and email. Other connections won't be tested and aren't guaranteed to work. This option can be changed later in the User & Authentication tab in the clerk dashboard.

![Image of social connections in clerk](images/clerk-social-connections.png)

- In the clerk dashboard you will also have to enable users to set their first and last name. This option is under Email, Phone, Username in the User & Authentication tab in the clerk dashboard. Make sure to set the first and last name to be required by users to sign up for the website.

![Image of name settings in clerk](images/clerk-name-settings.png)


- Under Session management, customize the session token så that it includes the following:
{
	"metadata": "{{user.public_metadata}}"
}

### Setting up the .env file

- First, go to the API Keys tab in the clerk dashboard to find your NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY and copy them.

- Then, create a `.env` file in the root folder of your project and paste the copied keys followed by the code below into your newly created `.env` file.

```
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

Your `.env` file should now look like this.

![Image of environment file](images/environment-file.png)

### How to create an admin account

On the website there exists an admin dashboard that is only accessible to users with the admin or moderator role. Admins can, through the admin dashboard, delete and change the roles of non admin users. Moderators do not have the ability to effect the roles of other users but are able to delete accounts belonging to users who don't have the admin or the moderator role. Admins and moderators are also able to delete posts on the website and export archived posts to an excel file.

- Go to the users tab in the clerk dashboard and click on the user you would like to set as admin.

- Scroll down to the metadata settings and edit the public metadata of the user you want to set as admin.

![Metadata settings](images/metadata-settings.png)

- Give the user the role admin as seen in the image below and click on save. That user should now be able to access the admin dashboard on the website.

![Public metadata](images/public-metadata.png)

## Set up database with prisma

- Create a PostgreSQL database of your choosing and get the database url and the direct url from that database.
  [Documentation on database connection strings](https://www.prisma.io/docs/orm/overview/databases/postgresql#connection-details)

> If you use Supabase as your database the transaction url is equivalent to the database url and the session url is equivalent to the direct url.

- Paste the database url and the direct url into the `.env` file in the root of your project. You will also need `?pgbouncer=true&connection_limit=1` at the end of the DATABASE_URL. Your `.env` file should now look like this.

![Image of environment file with database and direct url](images/database-environment-file.png)

- Run this command to generate the database in prisma

```bash
npx prisma generate
```

- Finally, run this command to push the local database you generated in prisma to your new PostgreSQL database. This is not necessary if you already have a setup database.

```bash
npx prisma migrate dev
```

For documentation on how to edit and deploy the database to production, refer to https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production

## Set up webhooks

This application uses webhooks to assign the member role on account creation and to delete posts on account deletion.

### Set up endpoint

- Go to webhooks on your clerk dashboard, then press add Endpoint.

- The endpoint URL should be your websites url + /api/webhooks for example https://YOUR_URL/api/webhooks

- On filter events, user.created, user.deleted and session.created should be picked.

### Set up .env file

- From your clerk endpoint copy the signing secret

- In your `.env` file create a variable named WEBHOOK_SECRET and paste the signing secret as its value

```bash
WEBHOOK_SECRET=YOUR KEY HERE
```

## Set up emails

This application uses resend to send emails.

### Set up Resend

- Set up a domain and verify it. For help check out the docs https://resend.com/docs/dashboard/domains/introduction

- Create a api key. Make sure to save the key as it will only be visible once.

### Set up .env file

- In your `.env` file create a variable named RESEND_API_KEY and write the api key as its value

- Then add another variable named RESEND_SENDING_MAIL and write down the mail you want your mails to be sent from. Remember that this mail is a noreply email.

- Also add a variable named NEXT_PUBLIC_SITE_URL and put the home page url as its value.

- It should look like this. Note that the "example" in RESEND_SENDING_MAIL can be anything you want. The "yourdomain.com" should be the domain you verified with Resend.

```bash
NEXT_PUBLIC_SITE_URL=YOUR URL HERE
RESEND_API_KEY=YOUR API KEY HERE
RESEND_SENDING_MAIL=example@yourdomain.com
```

### Set up automatic emails for expiring posts

**This is a linux solution. It may work on mac but is not tested. If you wish to automate it on windows you'd have to make a script that sends a post request to the api endpoint "http://YOUR_URL/api/send-mail-to-expiring-posts" with a secret in the header**

- In your `.env` file create a new variable named MAIL_AUTOMATION_SECRET. Come up with a secret and set it as the value of MAIL_AUTOMATION_SECRET.

- Copy the expiring-post-mail-automation directory to your home directory using the command below. Note that if you wish to not use the home directory you'll have to exchange the path so it aligns with your path.

```bash
cp -r expiring-post-mail-automation ~/
```

- Open the newly made copy of expiring-post-mail-automation.sh file and exchange "YOUR SECRET KEY HERE" to the MAIL_AUTOMATION_SECRET in your `.env` file. If you dont use the home directory you will have to edit the path of the output of the file to align with your path. **Note that the format of the script has to be kept the same or it will not work, after execution see result file for error**. There may be an easy fix in removing the backslash after the url but there was no time to look deeper in to it.

- Exit the file and enter these two commands, make sure to exchange "YOUR_USERNAME" to your profile name.

```bash
chmod +x expiring-post-mail-automation.sh
chown YOUR_USERNAME: expiring-post-mail-automation.sh
```

- Open crontab by entering this command

```bash
crontab -e
```

- At the bottom of the file paste this cronjob

```bash
0 12 * * * /bin/bash ~/expiring-post-mail-automation/expiring-post-mail-automation.sh
```

- This will execute the expiring-post-mail-automation.sh script everyday at 12 pm as long as the server is running. The results of the script will be printed to a file named "results" in the directory of the script. Note that if you dont use your home directory you will have to change the path to align with your directory.

- If you want you can change the time the emails are sent from 12 pm to your desired time however the cron job should be set to run **only once a day**.

Now users will receive an email if one of their posts is within a week of it's expiration date. The email will let users extend the expiration date or delete the post immediately. If the post reaches it's expiration date it will be deleted.
