# Webhook Limitations

Webhooks use an API-endpoint that Clerk calls from an external network, meaning that they are unreachable unless the machine has a public IP address. This is does not affect production-environments. Public IP addresses are fairly uncommon for personal computers, meaning that a few bugs exist in development environments.

Here is a full list of affected event and ensuing bugs in development environments:

| API Event         | Bugs                                                                                                                                                                                                                    |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user.created`    | Users are not given the `medlem` role as they should upon account creation. This does not appear to cause any bugs other than an inability to display their role, leading to the text `Okänd roll:` being used instead. |
| `user.deleted`    | Posts are not deleted when a user deletes their account. Trying to access a post belonging to a deleted account leads either to a post missing personal information or a server-error.                                  |
| `session.created` | Users with invalid roles do not get convert to `medlem`. This causes the same errors as the `user.created` event.                                                                                                       |

The events can be found [here](../app/api/webhooks/route.ts).

---

[Back to Clerk Setup](./clerk-setup.md)
