import { redirect } from "next/navigation";

import { checkRole } from "@/utils/check-role";
import Pagination from "@/components/pagination";
import SearchBar from "@/components/search-bar";

import getUserData from "./_utils/get-user-data";
import UserCard from "./_components/user-card";

interface UsersDashboardProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function UsersDashboard({ searchParams }: UsersDashboardProps) {
  if (!(await checkRole("admin")) && !(await checkRole("moderator"))) {
    redirect("/");
  }

  const { search, page } = await searchParams;

  const query = search;
  const currentPage = page;
  const usersPerPage = 10;

  const { usersList, queriedUserCount, totalUserCount } = await getUserData({
    currentPage,
    query,
    usersPerPage,
  });

  const labelText = `Sök bland ${totalUserCount} användare`;

  return (
    <div className="mx-auto mt-10 max-w-screen-md p-4">
      <h1 className="mb-6 text-2xl font-semibold">Användare</h1>
      <SearchBar labelText={labelText} itemsFoundCount={queriedUserCount} />
      <div className="mx-auto flex flex-col items-center gap-y-3 mt-6">
        {usersList.data.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
      <Pagination itemCount={queriedUserCount} itemsPerPage={usersPerPage} />
    </div>
  );
}
