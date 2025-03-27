import React from "react";

export const metadata = {
  titile: "static page",
  description: "This is a static page",
};

const Static = () => {
  return <div className="flex w-full justify-center items-center h-screen">Static Site Generation : {Date.now()}</div>;
};

export default Static;
