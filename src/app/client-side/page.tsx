"use client";

import React, { useEffect, useState } from "react";

const ClientSide = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((response) => response.json())
      .then((data) => setUsers(data?.results));
  }, []);

  if (users.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full justify-center items-center h-screen">
      Client Site Generation : {Date.now()}
      <div className="w-full flex flex-col gap-5">
        {users.map((user: { email: string }) => (
          <div key={user.email}>{user?.email}</div>
        ))}
      </div>
    </div>
  );
};

export default ClientSide;
