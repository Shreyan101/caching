import React from "react";

export const metadata = {
  titile: "Static Revalidate page",
  description: "This is a Static Revalidate page",
};

export const revalidate = 5;

const StaticRevalidate = () => {
  return <div className="flex w-full justify-center items-center h-screen">Static Revalidate Site Generation : {Date.now()}</div>;
};

export default StaticRevalidate;
