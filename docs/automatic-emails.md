# Automatic E-mail Configuration

_**This is a linux solution. It may work on mac but is not tested. If you wish to automate it on windows you'd have to make a script that sends a post request to the api endpoint `http://YOUR_URL/api/send-mail-to-expiring-posts` with a secret in the header**_

1.  In your `.env` file, come up with a secret and set it as the value of `MAIL_AUTOMATION_SECRET`.

    ```sh
    MAIL_AUTOMATION_SECRET
    ```

1.  Copy the expiring-post-mail-automation directory to your home directory using the command below. Note that if you wish to not use the home directory you'll have to exchange the path so it aligns with your path.

    ```bash
    cp -r expiring-post-mail-automation ~/
    ```

1.  Open the newly made copy of expiring-post-mail-automation.sh file and exchange `YOUR SECRET KEY HERE` to the `MAIL_AUTOMATION_SECRET` in your `.env` file. If you don't use the home directory you will have to edit the path of the output of the file to align with your path. _**Note that the format of the script has to be kept the same or it will not work. See the result file for error after execution.**_

1.  Exit the file and enter these two commands, make sure to exchange `YOUR_USERNAME` to your profile name.

    ```bash
    chmod +x expiring-post-mail-automation.sh
    chown YOUR_USERNAME: expiring-post-mail-automation.sh
    ```

1.  Open crontab by entering this command

    ```bash
    crontab -e
    ```

1.  At the bottom of the file paste this cronjob

    ```bash
    0 12 * * * /bin/bash ~/expiring-post-mail-automation/expiring-post-mail-automation.sh
    ```

1.  This will execute the `expiring-post-mail-automation.sh` script everyday at 12 pm as long as the server is running. The results of the script will be printed to a file named `results` in the directory of the script. Note that if you dont use your home directory you will have to change the path to align with your directory.

1.  If you want you can change the time the emails are sent from 12 pm to your desired time however the cron job should be set to run **only once a day**.

Now users will receive an email if one of their posts is within a week of it's expiration date. The email will let users extend the expiration date or delete the post immediately. If the post reaches it's expiration date it will be deleted.

---

[Back to Setup](./setup.md)
