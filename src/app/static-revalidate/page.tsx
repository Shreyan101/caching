import React from "react";

export const metadata = {
  titile: "Static Revalidate page",
  description: "This is a Static Revalidate page",
};

export const revalidate = 5;

const fetchUsers = async () => {
  const res = await fetch("https://randomuser.me/api/?results=10");
  const data = await res.json();
  return data?.results;
};

const StaticRevalidate = async () => {
  const users = await fetchUsers();
  return (
    <div className="flex w-full justify-center items-center h-screen">
      Static Revalidate Site Generation : {Date.now()}
      <div className="w-full flex flex-col gap-5">
        {users.map((user: { email: string }) => (
          <div key={user.email}>{user?.email}</div>
        ))}
      </div>
    </div>
  );
};

export default StaticRevalidate;
