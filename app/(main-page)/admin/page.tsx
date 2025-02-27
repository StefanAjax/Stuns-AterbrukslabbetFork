import { redirect } from "next/navigation";

import { checkRole } from "@/utils/check-role";
import Pagination from "@/components/pagination";
import SearchBar from "@/components/search-bar";

import ExportArchivesButton from "./_components/export-archives-button";
import getUserData from "./utils/get-user-data";
import UserCard from "./_components/user-card";

interface AdminDashboardProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function AdminDashboard({
  searchParams,
}: AdminDashboardProps) {
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
    <div className="max-w-screen-md mx-auto p-3 pt-10">
      <div className="flex flex-col text-center items-center mb-10 p-3 w-full bg-white rounded-md">
        <h2 className="text-xl pb-3">Exportera arkiverade annonser</h2>
        <ExportArchivesButton />
      </div>
      <SearchBar labelText={labelText} itemsFoundCount={queriedUserCount} />
      <div className="flex flex-col items-center mx-auto gap-y-3 pt-6">
        {usersList.data.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
      <Pagination itemCount={queriedUserCount} itemsPerPage={usersPerPage} />
    </div>
  );
}
