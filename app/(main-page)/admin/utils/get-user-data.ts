import { clerkClient } from "@clerk/nextjs/server";

interface GetUserDataParams {
  currentPage?: string;
  query?: string;
  usersPerPage: number;
}

export default async function getUserData({
  currentPage,
  query,
  usersPerPage,
}: GetUserDataParams) {
  const client = await clerkClient();

  const totalUserCount = await client.users.getCount();

  const queriedUserCount = query
    ? await client.users.getCount({ query })
    : totalUserCount;

  const usersList = query
    ? await client.users.getUserList({
        query,
        limit: usersPerPage,
        offset: (Number(currentPage) - 1) * usersPerPage,
      })
    : await client.users.getUserList({
        limit: usersPerPage,
        offset: (Number(currentPage) - 1) * usersPerPage,
      });

  return {
    usersList,
    queriedUserCount,
    totalUserCount,
  };
}
