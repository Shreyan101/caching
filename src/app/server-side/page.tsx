import React from "react";

export const metadata = {
  titile: "ServerSide page",
  description: "This is a ServerSide page",
};

const fetchUsers = async () => {
  const res = await fetch("https://randomuser.me/api/?results=10");
  const data = await res.json();
  return data?.results;
};

const ServerSide = async () => {
  const users = await fetchUsers();
  return (
    <div className="flex flex-col w-full justify-center items-center h-screen">
      Server Side Generation : {Date.now()}
      <div className="w-full flex flex-col gap-5">
        {users.map((user: { email: string }) => (
          <div key={user.email}>{user?.email}</div>
        ))}
      </div>
    </div>
  );
};

export default ServerSide;
